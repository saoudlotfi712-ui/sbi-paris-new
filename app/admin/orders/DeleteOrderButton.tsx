"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { supabase } from "@/lib/supabase";

type Props = {
  orderId: string;
};

export default function DeleteOrderButton({
  orderId,
}: Props) {
  const router = useRouter();
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    const confirmed = window.confirm(
      "Voulez-vous vraiment supprimer cette commande ?",
    );

    if (!confirmed) return;

    setDeleting(true);

    const { error } = await supabase
      .from("orders")
      .delete()
      .eq("id", orderId);

    if (error) {
      alert(`Erreur : ${error.message}`);
      setDeleting(false);
      return;
    }

    router.refresh();
    window.location.reload();
  };

  return (
    <button
      type="button"
      onClick={handleDelete}
      disabled={deleting}
      style={{
        marginTop: 12,
        padding: "9px 14px",
        border: "1px solid #dc2626",
        borderRadius: 8,
        background: "#ffffff",
        color: "#dc2626",
        fontWeight: 700,
        cursor: deleting ? "not-allowed" : "pointer",
        opacity: deleting ? 0.6 : 1,
      }}
    >
      {deleting ? "Suppression..." : "Supprimer"}
    </button>
  );
}