export interface FaqItem {
  question: string;
  answer: string;
}

export interface FaqSection {
  section: string;
  heading: string;
  subheading: string;
  faqs: FaqItem[];
}
