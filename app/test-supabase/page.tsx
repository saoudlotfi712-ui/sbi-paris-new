import { supabase } from "@/lib/supabase";

export default async function TestSupabasePage() {
  const { data, error } = await supabase
    .from("products")
    .select("*");

  if (error) {
    return (
      <main style={{ padding: 40 }}>
        <h1>Supabase connection error</h1>
        <pre>{error.message}</pre>
      </main>
    );
  }

  return (
    <main style={{ padding: 40 }}>
      <h1>Supabase connected successfully ✅</h1>
      <p>Products found: {data?.length ?? 0}</p>
    </main>
  );
}