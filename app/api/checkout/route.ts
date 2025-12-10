import { NextResponse } from "next/server";
import Stripe from "stripe";
import { auth } from '@/auth';

export async function POST(request: Request) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? "", {
    apiVersion: "2025-02-24.acacia", // versão compatível com sua lib
  });

  try {
    // tenta recuperar a sessão do usuário no servidor para associar o e-mail
    const userSession = await auth();
    const userEmail = userSession?.user?.email as string | undefined;

    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price: process.env.STRIPE_PRICE_ID,
          quantity: 1,
        },
      ],
      mode: "subscription",
      payment_method_types: ["card"],
      // se temos o e-mail do usuário, força o checkout a criar/usar customer com esse e-mail
      ...(userEmail ? { customer_email: userEmail } : {}),
      success_url: `${request.headers.get("origin")}/checkout/payment-confirmation`,
      cancel_url: `${request.headers.get("origin")}/dashboard`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Erro ao criar sessão de checkout" },
      { status: 400 }
    );
  }
}
