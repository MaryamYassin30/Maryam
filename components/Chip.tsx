export default function Chip({ label, active, onClick }: { label: string; active?: boolean; onClick?: () => void }) {
  return (
    <button onClick={onClick} className={`px-3 py-1 rounded-full text-sm border transition shadow-sm ${active ? 'bg-black text-white border-black' : 'bg-white hover:bg-gray-50 border-gray-200'}`}>{label}</button>
  );
}