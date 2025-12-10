"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CreditCard, XCircle } from "lucide-react";
import PaymentButton from "@/components/payment-button";

export default function MySubscription() {
  const [sub, setSub] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch("/api/subscription");
        const data = await res.json();
        setSub(data.subscription || null);
      } catch (err) {
        console.error(err);
      }
      setLoading(false);
    };
    load();
  }, []);

  if (loading) return <p>Carregando...</p>;

  return (
    <>
      <h1 className="text-3xl font-bold mb-6">Minha Assinatura</h1>
      <div className="flex flex-col md:flex-row gap-10">
        <PlanCard sub={sub} />
        <ActionCard sub={sub} />
      </div>
    </>
  );
}

function PlanCard({ sub }: { sub: any }) {
  if (!sub) {
    return (
      <Card className="max-w-md w-full">
        <CardHeader>
          <CardTitle>Detalhes da Assinatura</CardTitle>
          <CardDescription>Você não possui assinatura ativa.</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card className="max-w-md w-full">
      <CardHeader>
        <CardTitle>Detalhes da Assinatura</CardTitle>
        <CardDescription>Informações do seu plano</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <Item label="Plano" value="Plano Pro" />

          <Item
            label="Status"
            value={statusLabel(sub.status)}
            color={sub.status === "active" ? "green" : "red"}
          />

          <Item
            label="Próxima cobrança"
            value={
              sub.current_period_end
                ? formatDate(sub.current_period_end)
                : "--"
            }
          />

          <Item label="Valor" value="R$ 29,00" />
          <Item label="Ciclo" value="Mensal" />
        </div>
      </CardContent>
    </Card>
  );
}

function ActionCard({ sub }: { sub: any }) {
  const isActive = sub && sub.status === "active";

  return (
    <Card className="w-full max-w-sm h-full">
      <CardHeader>
        <CardTitle>Ações</CardTitle>
        <CardDescription>Gerencie sua assinatura</CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        {sub && (
          <button
            onClick={async () => {
              try {
                const res = await fetch("/api/checkout/manage", {
                  method: "POST",
                });
                const data = await res.json();

                if (data.url) {
                  window.location.href = data.url;
                } else {
                  alert("Erro ao abrir portal de pagamento.");
                }
              } catch {
                alert("Erro no portal.");
              }
            }}
            className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            <CreditCard className="mr-2 h-5 w-5 text-gray-400" />
            Atualizar método de pagamento
          </button>
        )}

        {isActive && (
          <button
            onClick={async () => {
              try {
                const res = await fetch("/api/checkout/cancel", {
                  method: "POST",
                });
                const data = await res.json();

                if (data.success) {
                  alert("Assinatura cancelada!");
                  window.location.reload();
                } else {
                  alert("Erro ao cancelar.");
                }
              } catch {
                alert("Erro.");
              }
            }}
            className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700"
          >
            <XCircle className="mr-2 h-5 w-5" />
            Cancelar assinatura
          </button>
        )}

        {!isActive && <PaymentButton>Assinar / Renovar</PaymentButton>}
      </CardContent>
    </Card>
  );
}

function Item({ label, value, color }: any) {
  return (
    <div className="flex justify-between">
      <span className="text-gray-600">{label}:</span>
      <span className={color ? `text-${color}-600` : ""}>{value}</span>
    </div>
  );
}

function statusLabel(status: string) {
  const map: any = {
    active: "Ativa",
    trialing: "Em teste",
    canceled: "Cancelada",
    unpaid: "Pagamento pendente",
    incomplete: "Pagamento incompleto",
    incomplete_expired: "Pagamento expirado",
    past_due: "Atrasada",
  };
  return map[status] || status;
}

function formatDate(unix: number) {
  return new Date(unix * 1000).toLocaleDateString("pt-BR");
}
