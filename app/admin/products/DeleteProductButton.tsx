"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { supabase } from "@/lib/supabase";

type DeleteProductButtonProps = {
  productId: string;
  productName: string;
};

export default function DeleteProductButton({
  productId,
  productName,
}: DeleteProductButtonProps) {
  const router = useRouter();

  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    const confirmed = window.confirm(
      `Supprimer définitivement "${productName}" ?`,
    );

    if (!confirmed) {
      return;
    }

    setDeleting(true);

    const { error } = await supabase
      .from("products")
      .delete()
      .eq("id", productId);
if (error) {
  window.alert(
    `Code: ${error.code ?? "N/A"}
Message: ${error.message ?? "N/A"}
Details: ${error.details ?? "N/A"}
Hint: ${error.hint ?? "N/A"}`,
  );

  setDeleting(false);
  return;
}

    router.refresh();
  };

  return (
    <button
      type="button"
      onClick={handleDelete}
      disabled={deleting}
      style={{
        padding: "9px 12px",
        border: "1px solid #fecaca",
        borderRadius: 8,
        background: "#ffffff",
        color: "#b91c1c",
        fontWeight: 700,
        cursor: deleting
          ? "not-allowed"
          : "pointer",
        opacity: deleting ? 0.6 : 1,
      }}
    >
      {deleting
        ? "Suppression..."
        : "Supprimer"}
    </button>
  );
}