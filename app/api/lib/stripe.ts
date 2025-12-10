import Stripe from 'stripe';

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? "", {
  apiVersion: '2025-02-24.acacia',
});

export async function fetchSubscriptionByEmail(email: string) {
  const customers = await stripe.customers.list({
    limit: 1,
    email: email,
    expand: ['data.subscriptions'],
  });

  if (customers.data.length === 0) return null;

  const customer = customers.data[0];

  // Considera assinaturas com status que permitem acesso (por ex. active ou trialing)
  const validStatuses = ['active', 'trialing'];

  const activeSubs = customer.subscriptions?.data.filter((sub) =>
    validStatuses.includes(sub.status)
  );

  return activeSubs && activeSubs.length > 0 ? activeSubs[0] : null;
}
