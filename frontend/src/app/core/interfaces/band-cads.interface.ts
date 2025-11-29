export interface Band {
  title: string;
  description: string;
  cta_text: string;
  image_path: string | null;
  image_url: string | null;
}

export interface BandsSection {
  section: string;
  heading: string;
  subheading: string;
  bands: Band[];
}
