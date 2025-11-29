export interface InfoCard {
  icon: string;
  title: string;
  description: string;
}

export interface AboutUsSection {
  section: string;
  badge: string;
  heading: string;
  description: string;
  gallery_images: string[];
  info_cards: InfoCard[];
}
