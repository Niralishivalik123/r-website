export interface FooterLink {
  text: string;
  url: string;
}

export interface FooterContent {
  logo: string;
  links: FooterLink[];
  copyright: string;
}

export interface FooterProps {
  content: FooterContent;
}

export interface FooterData {
  content: FooterContent;
}
