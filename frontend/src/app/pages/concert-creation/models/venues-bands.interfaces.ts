export interface Venue {
    id: number;
    location: string;
    capacity: number;
    status: string | null;
    type: string;
    name: string;
    price: number;
    image_path: string;
    rating?: number; // Add optional rating property
}

export interface Band {
  id: number;
  name: string;
  price: number;
  image_path: string | null;
  genre: string;
  member_count: number | null;
  status: string | null;
  rating?: number
}
