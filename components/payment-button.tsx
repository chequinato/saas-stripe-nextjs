"use client";

import { Button } from "./ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";

type PaymentButtonProps = {
  children: React.ReactNode;
};

export default function PaymentButton({ children }: PaymentButtonProps) {
  const handleCheckout = async () => {
    try {
      const res = await fetch("/api/checkout", { method: "POST" });
      const data = await res.json();

      if (!data.url) throw new Error("URL da sessão não retornou");

      // Redireciona direto para o Stripe Checkout
      window.location.href = data.url;
    } catch (err) {
      console.error(err);
      alert("Erro ao iniciar checkout.");
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full">{children}</Button>
      </DialogTrigger>

      <DialogContent className="p-6 max-w-md">
        <DialogTitle>Checkout</DialogTitle>
        <p className="mb-4 text-center">
          Clique no botão abaixo para assinar o Plano Pro Premium VIP.
        </p>
        <Button onClick={handleCheckout} className="w-full">
          Ir para o Checkout
        </Button>
      </DialogContent>
    </Dialog>
  );
}
