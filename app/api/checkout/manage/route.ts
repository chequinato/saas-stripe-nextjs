import { auth } from "@/auth";
import { stripe } from "../../lib/stripe";
import { NextResponse } from "next/server";

export async function POST() {
  const session = await auth();

  if (!session?.user?.email) {
    console.log("SEM SESSION NA ROTA MANAGE");
    return NextResponse.json({ error: "not_authenticated" }, { status: 400 });
  }

  try {
    // pega o cliente já com as subscriptions expandidas
    const customerList = await stripe.customers.list({
      email: session.user.email,
      limit: 1,
      expand: ["data.subscriptions"],
    });

    const customer = customerList.data[0];

    if (!customer) {
      console.log("CUSTOMER NÃO ENCONTRADO");
      return NextResponse.json({ error: "customer_not_found" }, { status: 400 });
    }

    // ❗ checa se o cliente tem subscriptions + se há alguma ativa
    const subs = customer.subscriptions?.data ?? [];
    const hasActive = subs.some(sub => sub.status === "active" || sub.status === "trialing");

    if (!hasActive) {
      console.log("CUSTOMER SEM ASSINATURA ATIVA");
      return NextResponse.json({ error: "no_subscription" }, { status: 400 });
    }

    const portalSession = await stripe.billingPortal.sessions.create({
      customer: customer.id,
      return_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/minha-assinatura`,
    });

    return NextResponse.json({ url: portalSession.url });
  } catch (err) {
    console.error("ERRO NO /MANAGE", err);
    return NextResponse.json({ error: "internal_error" }, { status: 500 });
  }
}
