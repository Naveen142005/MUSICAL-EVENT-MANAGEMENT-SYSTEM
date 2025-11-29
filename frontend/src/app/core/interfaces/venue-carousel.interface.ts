export interface VenueSlide {
  title: string;
  description: string;
  cta_text: string;
  image_path: string | null;
}

export interface VenueCaroselSection {
  section: string;
  slides: VenueSlide[];
}
