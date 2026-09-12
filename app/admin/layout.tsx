"use client";

import { ReactNode, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

import { supabase } from "@/lib/supabase";

export default function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();

  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    let mounted = true;

    async function checkAuth() {
      // صفحة Login لازم تبقى متاحة بدون Session
      if (pathname === "/admin/login") {
        if (mounted) {
          setAuthorized(true);
          setLoading(false);
        }
        return;
      }

      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();

      if (!mounted) {
        return;
      }

      if (error || !session) {
        setAuthorized(false);
        setLoading(false);

        router.replace("/admin/login");
        return;
      }

      setAuthorized(true);
      setLoading(false);
    }

    void checkAuth();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (pathname === "/admin/login") {
        return;
      }

      if (!session) {
        setAuthorized(false);
        router.replace("/admin/login");
      }
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [pathname, router]);

  if (loading) {
    return (
      <main
        style={{
          minHeight: "100vh",
          display: "grid",
          placeItems: "center",
        }}
      >
        Chargement...
      </main>
    );
  }

  if (!authorized) {
    return null;
  }

  return <>{children}</>;
}