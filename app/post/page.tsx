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
  const [checking, setChecking] = useState(true);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  // Optional: require sign-in to post
  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUserEmail(data.user?.email ?? null);
      setChecking(false);
    });
  }, []);

  const [form, setForm] = useState({
    title: "",
    description: "",
    city: "",
    price: "",
    category: "",
    user_name: "",
    user_initials: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    const priceNum = form.price ? Number(form.price) : 0;

    // Basic initials fallback if user doesn't type them
    const initials =
      form.user_initials ||
      (form.user_name || "")
        .split(" ")
        .map((s) => s[0])
        .join("")
        .slice(0, 2)
        .toUpperCase();

    const { error } = await supabase.from("help_posts").insert([
      {
        title: form.title,
        description: form.description,
        city: form.city,
        price: priceNum,
        category: form.category || null,
        user_name: form.user_name || userEmail || "Anonymous",
        user_initials: initials || "??",
        rating: null,
        reviews_count: null,
        post_type: "need",
      },
    ]);

    setSubmitting(false);

    if (error) setError(error.message);
    else router.push("/");
  };

  if (checking) return <div className="p-6 text-sm text-gray-600">Checking session…</div>;
  // If you want to force login: 
  // if (!userEmail) { router.push("/signin?next=/post"); return null; }

  return (
    <div className="mx-auto max-w-lg p-6">
      <h2 className="text-lg font-semibold mb-3">Post a need</h2>
      <form onSubmit={onSubmit} className="space-y-3">
        <input className="w-full rounded-lg border px-3 py-2 text-sm" placeholder="City (e.g., Worcester, MA)"
          value={form.city} onChange={(e)=>setForm({...form,city:e.target.value})} required />
        <input className="w-full rounded-lg border px-3 py-2 text-sm" placeholder="Title (e.g., Need a quick jump-start tonight)"
          value={form.title} onChange={(e)=>setForm({...form,title:e.target.value})} required />
        <textarea className="w-full rounded-lg border px-3 py-2 text-sm" rows={4} placeholder="Describe what you need"
          value={form.description} onChange={(e)=>setForm({...form,description:e.target.value})} required />
        <input className="w-full rounded-lg border px-3 py-2 text-sm" placeholder="Price (optional, e.g., 40)"
          value={form.price} onChange={(e)=>setForm({...form,price:e.target.value})} />
        <input className="w-full rounded-lg border px-3 py-2 text-sm" placeholder="Category (e.g., Tech & Setup)"
          value={form.category} onChange={(e)=>setForm({...form,category:e.target.value})} />
        <div className="grid grid-cols-2 gap-2">
          <input className="rounded-lg border px-3 py-2 text-sm" placeholder="Your name (optional)"
            value={form.user_name} onChange={(e)=>setForm({...form,user_name:e.target.value})} />
          <input className="rounded-lg border px-3 py-2 text-sm" placeholder="Initials (optional)"
            value={form.user_initials} onChange={(e)=>setForm({...form,user_initials:e.target.value})} />
        </div>
        <button disabled={submitting} className="rounded-lg bg-black text-white px-3 py-2 text-sm">
          {submitting ? "Posting…" : "Post need"}
        </button>
        {error && <div className="text-sm text-red-600">{error}</div>}
      </form>
    </div>
  );
}
