import { describe, it, expect } from 'vitest';
import { filterListings } from '@/lib/filter';

const items = [
  { title: 'Need a jump-start', description: 'Car battery dead at Target', city: 'Worcester, MA', category: 'Cars & Errands' },
  { title: 'I can assemble IKEA', description: 'Fast assembly for desks', city: 'Auburn, MA', category: 'Home & Handy' },
  { title: 'Wi‑Fi setup', description: 'Router + devices', city: 'Shrewsbury, MA', category: 'Tech & Setup' },
];

describe('filterListings', () => {
  it('returns all when no query and All category', () => {
    const out = filterListings(items, '', 'All');
    expect(out.length).toBe(3);
  });

  it('filters by category', () => {
    const out = filterListings(items, '', 'Tech & Setup');
    expect(out.length).toBe(1);
    expect(out[0].title).toContain('Wi‑Fi');
  });

  it('filters by query in title/description/city', () => {
    const out = filterListings(items, 'target', 'All');
    expect(out.length).toBe(1);
    expect(out[0].title).toContain('jump-start');
  });

  it('combines category and query', () => {
    const out = filterListings(items, 'assembly', 'Home & Handy');
    expect(out.length).toBe(1);
    expect(out[0].title).toContain('assemble');
  });

  it('returns empty when no match', () => {
    const out = filterListings(items, 'hair', 'Cars & Errands');
    expect(out.length).toBe(0);
  });
});