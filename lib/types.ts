export type Json = string | number | boolean | null | { [key: string]: Json } | Json[];

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: { user_id: string; display_name: string | null; city: string | null; bio: string | null; rating_avg: number | null; reviews_count: number | null; created_at: string },
        Insert: { user_id: string; display_name?: string | null; city?: string | null; bio?: string | null; rating_avg?: number | null; reviews_count?: number | null },
        Update: Partial<{ display_name: string | null; city: string | null; bio: string | null; rating_avg: number | null; reviews_count: number | null }>
      },
      listings: {
        Row: { id: string; user_id: string; type: 'need' | 'offer'; title: string; description: string; category: string; price_number: number | null; city: string | null; status: 'active'|'closed'; created_at: string },
        Insert: { user_id: string; type: 'need'|'offer'; title: string; description: string; category: string; price_number?: number | null; city?: string | null; status?: 'active'|'closed' },
        Update: Partial<{ type: 'need'|'offer'; title: string; description: string; category: string; price_number: number | null; city: string | null; status: 'active'|'closed' }>
      },
      reviews: {
        Row: { id: string; reviewer_id: string; reviewee_id: string; listing_id: string | null; rating: number; text: string | null; created_at: string },
        Insert: { reviewer_id: string; reviewee_id: string; listing_id?: string | null; rating: number; text?: string | null },
        Update: Partial<{ rating: number; text: string | null }>
      }
    }
  }
}