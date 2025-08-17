export default function Stars({ value = 0 }: { value?: number }) {
  return (
    <div className="flex items-center gap-1" aria-label={`Rating ${value} of 5`}>
      {[1,2,3,4,5].map(i => (
        <svg key={i} className={`w-4 h-4 ${i <= value ? 'fill-gray-900' : 'fill-transparent'} stroke-gray-900`} viewBox="0 0 24 24" strokeWidth="1.5"><path d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
      ))}
    </div>
  );
}