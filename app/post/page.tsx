'use client';
import { useState } from 'react';
import PostModal from '@/components/PostModal';

export default function PostPage() {
  const [open, setOpen] = useState(true);
  return (
    <main className="max-w-6xl mx-auto px-4 py-10">
      <PostModal open={open} onClose={()=>setOpen(false)} />
      {!open && <div className="text-center text-gray-500">Closed</div>}
    </main>
  );
}