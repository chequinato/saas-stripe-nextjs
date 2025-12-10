import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/app/api/lib/utils';
import { Download } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import bookImg from './book.png';
import { auth } from '@/auth';
import BannerWarning from '@/components/banner-warning';
import PricingCard from '@/components/pricing-card'; // ajusta o nome conforme teu arquivo
import { fetchSubscriptionByEmail } from '../api/lib/stripe';

export default async function MonthlyBook() {
  const session = await auth();
  const userEmail = session?.user?.email as string;

  const subscripition = await fetchSubscriptionByEmail(userEmail);

  return (
    <>
      <h1 className="text-3xl font-bold mb-6">Livro do Mês</h1>

      {subscripition && (
        <>
          <Image src={bookImg} alt="Livro do mês" />

          <Link
            className={cn(
              'flex items-center justify-center gap-4 mt-10',
              buttonVariants()
            )}
            href="/livro.pdf"
            target="_blank"
          >
            <Download className="h-4 w-4" /> Download do Pdf
          </Link>
        </>
      )}

      {!subscripition && (
        <>
          <BannerWarning text="Para acessar o livro do mês, você precisa de uma assinatura ativa. Que tal assinar agora?" />
          <PricingCard />
        </>
      )}
    </>
  );
}
