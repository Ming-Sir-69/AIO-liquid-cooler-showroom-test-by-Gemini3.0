export enum Language {
  EN = 'EN',
  CN = 'CN',
  VN = 'VN',
}

export interface SpecData {
  dimensions: string; // LxWxH
  weight: string;
  workTemp: string;
  voltage: string;
  current: string;
  fanSpeed: string;
  pumpSpeed: string;
  coolantConcentration: string;
  coolantFreezingPoint: string;
  coolantPH: string;
}

export interface Product {
  id: string;
  name: string;
  price: Record<Language, string>;
  imageSeed: string; // For Picsum
  specs: SpecData;
}

export interface Brand {
  id: string;
  name: Record<Language, string>; // Localized Name
  origin: string; // Country/Region
  bgSeed: string; // For Picsum lifestyle background
  description: Record<Language, string>;
  products: Product[];
  primaryColor: string; // Brand color hex
}

export interface GlobalContent {
  nav: {
    title: Record<Language, string>;
    toggleTheme: Record<Language, string>;
    back: Record<Language, string>;
  };
  product: {
    viewSpecs: Record<Language, string>;
    specsTitle: Record<Language, string>;
  }
}