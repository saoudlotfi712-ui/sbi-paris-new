"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { supabase } from "@/lib/supabase";

type Props = {
  orderId: string;
  currentStatus: string;
};

export default function OrderStatus({
  orderId,
  currentStatus,
}: Props) {
  const router = useRouter();
  const [status, setStatus] = useState(currentStatus);
  const [loading, setLoading] = useState(false);

  async function updateStatus(newStatus: string) {
    setLoading(true);

    const { error } = await supabase
      .from("orders")
      .update({
        status: newStatus,
      })
      .eq("id", orderId);

    if (error) {
      window.alert(
        `Erreur : ${error.message}`,
      );
      setLoading(false);
      return;
    }

    setStatus(newStatus);
    setLoading(false);
    router.refresh();
  }

  return (
    <select
      value={status}
      disabled={loading}
      onChange={(event) =>
        updateStatus(event.target.value)
      }
      style={{
        padding: "8px 10px",
        borderRadius: 8,
        border: "1px solid #cbd5e1",
        background: "#ffffff",
        cursor: loading ? "wait" : "pointer",
      }}
    >
      <option value="pending">En attente</option>
      <option value="confirmed">Confirmée</option>
      <option value="shipped">Expédiée</option>
      <option value="delivered">Livrée</option>
      <option value="cancelled">Annulée</option>
    </select>
  );
}