'use client';
import { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

export default function PostModal({ open, onClose }: { open: boolean; onClose: ()=>void }) {
  const [type, setType] = useState<'need'|'offer'>('need');
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [price, setPrice] = useState('');
  const [city, setCity] = useState('Auburn, MA');
  const [category, setCategory] = useState('Cars & Errands');
  const [loading, setLoading] = useState(false);

  if (!open) return null;

  async function createPost() {
    if (!title || !desc) return;
    setLoading(true);
    const { data: user } = await supabase.auth.getUser();
    if (!user.user) {
      alert('Please sign in to post.');
      setLoading(false);
      return;
    }
    const { error } = await supabase.from('listings').insert({
      user_id: user.user.id,
      type,
      title,
      description: desc,
      category,
      price_number: price ? Number(price) : null,
      city,
      status: 'active'
    });
    setLoading(false);
    if (error) alert(error.message);
    else {
      onClose();
      await fetch('/api/revalidate', { method: 'POST' });
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-xl p-6">
        <h3 className="text-xl font-semibold">Create a post</h3>
        <p className="text-sm text-gray-500">Prices are informational — payments happen off‑platform.</p>
        <div className="mt-4 grid grid-cols-2 gap-3">
          <div>
            <label className="text-sm text-gray-600">Post type</label>
            <div className="mt-1 flex gap-2">
              {(['need','offer'] as const).map(k => (
                <button key={k} onClick={()=>setType(k)} className={`px-3 py-1 rounded-xl border ${type===k?'bg-black text-white border-black':'bg-white border-gray-300'}`}>{k==='need'?'You need':'I can'}</button>
              ))}
            </div>
          </div>
          <div>
            <label className="text-sm text-gray-600">Category</label>
            <select className="mt-1 w-full border rounded-xl px-3 py-2" value={category} onChange={e=>setCategory(e.target.value)}>
              <option>Cars & Errands</option>
              <option>Home & Handy</option>
              <option>Tech & Setup</option>
              <option>Beauty & Self-care</option>
              <option>Lessons & Coaching</option>
            </select>
          </div>
          <div className="col-span-2">
            <label className="text-sm text-gray-600">Title</label>
            <input className="mt-1 w-full border rounded-xl px-3 py-2" placeholder="e.g., Jump-start needed near Worcester tonight" value={title} onChange={e=>setTitle(e.target.value)} />
          </div>
          <div className="col-span-2">
            <label className="text-sm text-gray-600">Description</label>
            <textarea className="mt-1 w-full border rounded-xl px-3 py-2" rows={4} placeholder="Add key details, timing, tools, and expectations" value={desc} onChange={e=>setDesc(e.target.value)} />
          </div>
          <div>
            <label className="text-sm text-gray-600">Price (display only)</label>
            <input className="mt-1 w-full border rounded-xl px-3 py-2" placeholder="e.g., 40" value={price} onChange={e=>setPrice(e.target.value)} />
            <p className="text-[11px] text-gray-500 mt-1">No in-app payments. Settle outside the app.</p>
          </div>
          <div>
            <label className="text-sm text-gray-600">City</label>
            <input className="mt-1 w-full border rounded-xl px-3 py-2" placeholder="City, State" value={city} onChange={e=>setCity(e.target.value)} />
          </div>
        </div>
        <div className="flex items-center justify-end gap-2 mt-5">
          <button onClick={onClose} className="px-3 py-2 rounded-xl border border-gray-300">Cancel</button>
          <button onClick={createPost} disabled={loading} className="px-4 py-2 rounded-xl bg-black text-white">{loading?'Publishing…':'Publish'}</button>
        </div>
      </div>
    </div>
  );
}