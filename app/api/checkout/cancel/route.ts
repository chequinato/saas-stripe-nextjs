import { auth } from "@/auth";
import { stripe } from "../../lib/stripe";
import { NextResponse } from "next/server";

export async function POST() {
  const session = await auth();

  if (!session?.user?.email) {
    console.log("SEM SESSION NA ROTA CANCEL");
    return NextResponse.json({ error: "not_authenticated" }, { status: 400 });
  }

  try {
    const customerList = await stripe.customers.list({
      email: session.user.email,
      limit: 1,
    });

    const customer = customerList.data[0];

    if (!customer) {
      console.log("CUSTOMER NÃO ENCONTRADO");
      return NextResponse.json({ error: "customer_not_found" }, { status: 400 });
    }

    // pega as assinaturas do cliente
    const subscriptions = await stripe.subscriptions.list({
      customer: customer.id,
      limit: 1,
    });

    const subscription = subscriptions.data[0];

    if (!subscription) {
      console.log("ASSINATURA NÃO ENCONTRADA");
      return NextResponse.json({ error: "subscription_not_found" }, { status: 400 });
    }

    await stripe.subscriptions.update(subscription.id, {
      cancel_at_period_end: true,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("ERRO NO /CANCEL", err);
    return NextResponse.json({ error: "internal_error" }, { status: 500 });
  }
}
