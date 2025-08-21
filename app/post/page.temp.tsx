"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  { auth: { persistSession: true } }
);

export default function PostNeedPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [checking, setChecking] = useState(true);

  // Require login
  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (!data.user) {
        const next = encodeURIComponent("/post");
        router.replace(`/signin?next=${next}`);
      } else {
        setUser(data.user);
      }
      setChecking(false);
    });
  }, [router]);

  const [form, setForm] = useState({
    city: "",
    title: "",
    description: "",
    price: "",
    category: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setSubmitting(true);
    setError(null);

    const priceNum = form.price ? Number(form.price) : 0;

    const name = user.user_metadata?.full_name || user.email || "Anonymous";
    const initials = (name || "")
      .split(" ")
      .map((s: string) => s[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();

    const { error } = await supabase.from("help_posts").insert([
      {
        city: form.city,
        title: form.title,
        description: form.description,
        price: priceNum,
        category: form.category || null,
        user_name: name,
        user_initials: initials || "??",
        rating: null,
        reviews_count: null,
        post_type: "need",
        user_id: user.id,
      },
    ]);

    setSubmitting(false);

    if (error) setError(error.message);
    else router.push("/");
  };

  if (checking) return <div className="p-6 text-sm text-gray-600">Checking session…</div>;

  return (
    <div className="mx-auto max-w-lg p-6">
      <h2 className="text-lg font-semibold mb-3">Post a need</h2>
      <form onSubmit={onSubmit} className="space-y-3">
        <input
          className="w-full rounded-lg border px-3 py-2 text-sm"
          placeholder="City (e.g., Worcester, MA)"
          value={form.city}
          onChange={(e) => setForm({ ...form, city: e.target.value })}
          required
        />
        <input
          className="w-full rounded-lg border px-3 py-2 text-sm"
          placeholder="Title (e.g., Need a quick jump-start tonight)"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          required
        />
        <textarea
          className="w-full rounded-lg border px-3 py-2 text-sm"
          rows={4}
          placeholder="Describe what you need"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          required
        />
        <input
          className="w-full rounded-lg border px-3 py-2 text-sm"
          placeholder="Price (optional, e.g., 40)"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
          inputMode="decimal"
        />
        <input
          className="w-full rounded-lg border px-3 py-2 text-sm"
          placeholder="Category (e.g., Tech & Setup)"
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
        />

        <button disabled={submitting} className="rounded-lg bg-black text-white px-3 py-2 text-sm">
          {submitting ? "Posting…" : "Post need"}
        </button>
        {error && <div className="text-sm text-red-600">{error}</div>}
      </form>
    </div>
  );
}
