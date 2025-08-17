export type Listing = {
  title: string;
  description: string;
  city?: string | null;
  category: string;
};

export function filterListings(items: Listing[], query: string, activeCat: string) {
  const q = (query || '').trim().toLowerCase();
  return items.filter((it) => {
    const matchCat = activeCat === 'All' || it.category === activeCat;
    const matchQ = !q ||
      it.title.toLowerCase().includes(q) ||
      it.description.toLowerCase().includes(q) ||
      (it.city || '').toLowerCase().includes(q);
    return matchCat && matchQ;
  });
}