import { auth } from "@/auth";
import { stripe } from "../lib/stripe";
import { NextResponse } from "next/server";
import { prisma } from "@/app/api/lib/prisma";

// Status que contam como assinatura com acesso
const validStripeStatuses = ["active", "trialing", "past_due", "unpaid"];

export async function GET() {
  try {
    // 1️⃣ Pega sessão do usuário
    const session = await auth();

    if (!session?.user?.email) {
      return NextResponse.json({ subscription: null });
    }

    const email = session.user.email;

    // 2️⃣ Busca no banco de dados primeiro (cache)
    const user = await prisma.user.findUnique({
      where: { email },
      include: { subscription: true },
    });

    if (user?.subscription) {
      return NextResponse.json({
        subscription: {
          id: user.subscription.stripeSubId, // corrigido
          status: user.subscription.status,
          current_period_end: user.subscription.currentPeriodEnd,
        },
      });
    }

    // 3️⃣ Se não tiver no DB, busca no Stripe
    const customers = await stripe.customers.list({
      email,
      limit: 1,
      expand: ["data.subscriptions"],
    });

    const customer = customers.data[0];

    if (!customer) {
      return NextResponse.json({ subscription: null });
    }

    const subs = customer.subscriptions?.data || [];

    const activeSub = subs.find((s) => validStripeStatuses.includes(s.status));

    if (!activeSub) {
      return NextResponse.json({ subscription: null });
    }

    // 4️⃣ Salva no banco como cache (upsert)
    await prisma.subscription.upsert({
      where: {
        stripeSubId: activeSub.id, // corrigido
      },
      create: {
        stripeSubId: activeSub.id, // corrigido
        status: activeSub.status,
        currentPeriodEnd: activeSub.current_period_end,
        user: {
          connect: { email },
        },
      },
      update: {
        status: activeSub.status,
        currentPeriodEnd: activeSub.current_period_end,
      },
    });

    // 5️⃣ Retorna os dados
    return NextResponse.json({
      subscription: {
        id: activeSub.id,
        status: activeSub.status,
        current_period_end: activeSub.current_period_end,
      },
    });
  } catch (err) {
    console.error("ERRO NO /api/subscription:", err);
    return NextResponse.json({ subscription: null });
  }
}
