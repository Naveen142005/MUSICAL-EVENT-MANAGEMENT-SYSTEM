export interface ContactInfo {
  location: string;
  phone: string;
  email: string;
}

export interface Link {
  name: string;
  url: string;
}

export interface FooterSection {
  section: string;
  logo_text: string;
  description: string;
  contact: ContactInfo;
  quick_links: Link[];
  social_links: Link[];
  copyright_text: string;
  background_image: string;
  background_image_url: string;
}
