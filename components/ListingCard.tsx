import Stars from './Stars';

type Listing = {
  id: string;
  title: string;
  description: string;
  city: string | null;
  price_number: number | null;
  category: string;
  type: 'need' | 'offer';
  user: { display_name?: string | null };
};

export default function ListingCard({ item, onMessage }: { item: Listing; onMessage?: () => void }) {
  return (
    <div className="rounded-2xl border border-gray-200 p-4 shadow-sm hover:shadow-md transition bg-white">
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1">
          <div className="flex items-center gap-2 text-sm text-gray-500">{item.city ?? 'Nearby'}</div>
          <h3 className="text-lg font-semibold mt-1">{item.title}</h3>
          <p className="text-gray-600 mt-1 line-clamp-2">{item.description}</p>
          <div className="flex items-center gap-2 mt-3">
            <div className="w-8 h-8 rounded-full bg-gray-200"/>
            <div>
              <div className="text-sm font-medium">{item.user.display_name ?? 'User'}</div>
              <div className="text-xs text-gray-500 flex items-center gap-1"><Stars value={5}/> <span>(new)</span></div>
            </div>
          </div>
        </div>
        <div className="text-right min-w-[110px]">
          <div className="text-2xl font-bold">{item.price_number ? `$${item.price_number}` : '—'}</div>
          <div className="text-xs text-gray-500">Listed price</div>
          <button onClick={onMessage} className="mt-3 inline-flex items-center gap-2 px-3 py-2 rounded-xl border border-gray-300 hover:bg-gray-50">Message</button>
        </div>
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        <span className="text-xs px-2 py-1 rounded-full bg-gray-100">{item.category}</span>
        <span className="text-xs px-2 py-1 rounded-full bg-gray-100">{item.type === 'need' ? 'You need' : 'I can'}</span>
      </div>
    </div>
  );
}