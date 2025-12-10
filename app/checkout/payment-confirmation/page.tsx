import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ShoppingBag } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/app/api/lib/utils";

export default function CheckoutReturnPage() {
  return (
    <Card className="max-w-lg mt-10 text-center mx-auto">
      <CardContent>
        <CardHeader>
          <ShoppingBag className="text-green-500 mx-auto mb-4 w-12 h-12" />
          <CardTitle>Assinatura Confirmada</CardTitle>
          <CardDescription>
            Obrigado por se juntar à nossa comunidade LivroSaaS
          </CardDescription>
        </CardHeader>

        <div className="text-gray-700 text-sm mt-4 space-y-2">
          <p>Sua assinatura foi processada com sucesso e sua conta está ativa.</p>
          <p>Agora é só aproveitar nosso conteúdo.</p>
        </div>

        <Link
          href="/dashboard"
          className={cn(buttonVariants(), "mt-6 inline-block")}
        >
          Ir para Dashboard
        </Link>
      </CardContent>
    </Card>
  );
}
