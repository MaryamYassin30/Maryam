"use client";

import { useEffect, useState } from "react";
import { Search, Filter, Info, MapPin, Star, MessageSquare } from "lucide-react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  { auth: { persistSession: false } }
);

// ---------- Types ----------
interface CategoryChipProps { label: string; active?: boolean; onClick: () => void }
interface StarsProps { value?: number }
interface PostItem {
  id: string | number;
  city: string;
  price: number;
  title: string;
  description: string;
  user_name: string;
  user_initials: string; // e.g., "SK"
  rating: number | null;
  reviews_count: number | null;
  category: string | null;
}

// ---------- Small UI bits ----------
function CategoryChip({ label, active, onClick }: CategoryChipProps) {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-1 rounded-full border text-sm transition-all ${
        active ? "bg-black text-white border-black" : "bg-white hover:bg-gray-100 border-gray-300"
      }`}
    >
      {label}
    </button>
  );
}

function Stars({ value = 0 }: StarsProps) {
  const v = Math.max(0, Math.min(5, value ?? 0));
  return (
    <span className="flex items-center gap-0.5 text-gray-400" aria-label={`Rating ${v} of 5`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <Star key={i} className={`w-4 h-4 ${i <= v ? "text-gray-700 fill-current" : "fill-transparent"}`} />
      ))}
    </span>
  );
}

function NeedCard({ item }: { item: PostItem }) {
  const { city, price, title, description, user_name, user_initials, rating, reviews_count, category } = item;

  return (
    <div className="rounded-2xl border bg-white p-5 shadow-sm hover:shadow-md transition-shadow">
      {/* Top row */}
      <div className="flex items-start justify-between gap-6">
        <div className="flex-1">
          <div className="flex items-center gap-1 text-sm text-gray-600 mb-1">
            <MapPin className="w-4 h-4" /> {city}
          </div>
          <h3 className="font-semibold text-[1.06rem] leading-snug">{title}</h3>
          <p className="mt-1 text-sm text-gray-600">{description}</p>
        </div>
        <div className="w-28 shrink-0 text-right">
          <div className="text-2xl font-bold">${price}</div>
          <div className="text-xs text-gray-500 -mt-0.5">Listed price</div>
          <button className="mt-2 w-full rounded-2xl border border-gray-300 px-3 py-1.5 text-sm bg-white hover:bg-gray-50 inline-flex items-center justify-center gap-1">
            <MessageSquare className="w-4 h-4" /> Message
          </button>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-full bg-[#5b89c9] text-white grid place-items-center text-xs font-semibold">
            {user_initials || "??"}
          </div>
          <div>
            <div className="text-sm font-medium leading-tight">{user_name}</div>
            <div className="flex items-center gap-2 text-xs">
              <Stars value={rating ?? 0} />
              <span className="text-gray-500">({reviews_count ?? 0})</span>
            </div>
          </div>
        </div>
        {category && (
          <span className="rounded-full bg-gray-100 px-2 py-1 text-xs text-gray-700">{category}</span>
        )}
      </div>
    </div>
  );
}

// ---------- Page ----------
export default function Page() {
  const [query, setQuery] = useState("");
  const categories = ["All", "Cars & Errands", "Home & Handy", "Tech & Setup", "Beauty & Self-care", "Lessons & Coaching"];
  const [activeCategory, setActiveCategory] = useState(0);

  const [items, setItems] = useState<PostItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 🔥 Direct Supabase fetch instead of /api/posts
  useEffect(() => {
    (async () => {
      try {
        const { data, error } = await supabase
          .from("help_posts")
          .select(
            "id, city, price, title, description, user_name, user_initials, rating, reviews_count, category"
          )
          .order("id", { ascending: false })
          .limit(30);

        if (error) throw error;
        setItems(data || []);
      } catch (e: any) {
        setError(e.message || "Failed to load posts");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <div className="min-h-screen bg-white">


      {/* Search & categories */}
      <section className="mx-auto max-w-6xl px-4 py-4">
        <div className="rounded-xl border bg-white p-2 flex items-center gap-2 shadow-sm">
          <Search className="w-5 h-5" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search needs and offers — e.g., jump-start, hair braiding, math tutor"
            className="flex-1 outline-none text-sm"
          />
          <button className="rounded-lg border px-3 py-1.5 text-sm flex items-center gap-1">
            <Filter className="w-4 h-4" /> Filters
          </button>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {categories.map((c, i) => (
            <CategoryChip key={c} label={c} active={activeCategory === i} onClick={() => setActiveCategory(i)} />
          ))}
        </div>
      </section>

      {/* Safety note */}
      <section className="mx-auto max-w-6xl px-4 mb-4">
        <div className="rounded-lg bg-gray-50 border px-3 py-2 text-sm text-gray-700 flex items-center gap-2">
          <Info className="w-4 h-4" />
          Meet in public places when possible. Payments handled off-platform — verify details before committing.
        </div>
      </section>

      {/* Needs list */}
      <section className="mx-auto max-w-6xl px-4 pb-12">
        {loading && <div className="text-sm text-gray-600">Loading posts…</div>}
        {error && <div className="text-sm text-red-600">{error}</div>}
        {!loading && !error && items.length === 0 && <div className="text-sm text-gray-600">No posts yet.</div>}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((it) => (
            <NeedCard key={it.id} item={it} />
          ))}
        </div>
      </section>
    </div>
  );
}
