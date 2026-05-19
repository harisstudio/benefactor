export type LanguageCode = 'en' | 'lt';

export type CountryCode = 
  | 'GB' | 'LT' | 'DE' | 'FR' | 'ES' | 'IT' | 'NL' | 'BE' | 'AT' 
  | 'CH' | 'PL' | 'RO' | 'BG' | 'CZ' | 'PT' | 'IE' | 'SE' | 'NO' 
  | 'DK' | 'FI' | 'UA' | 'RU' | 'TR' | 'KZ' | 'UZ' | 'AZ';

export interface Language {
  code: LanguageCode;
  name: string;
  nativeName: string;
}

export interface Country {
  code: CountryCode;
  name: string;
}

export const SUPPORTED_LANGUAGES: Language[] = [
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'lt', name: 'Lithuanian', nativeName: 'Lietuvių' },
];

export const SUPPORTED_COUNTRIES: Country[] = [
  { code: 'GB', name: 'United Kingdom' },
  { code: 'LT', name: 'Lithuania' },
  { code: 'DE', name: 'Germany' },
  { code: 'FR', name: 'France' },
  { code: 'ES', name: 'Spain' },
  { code: 'IT', name: 'Italy' },
  { code: 'NL', name: 'Netherlands' },
  { code: 'BE', name: 'Belgium' },
  { code: 'AT', name: 'Austria' },
  { code: 'CH', name: 'Switzerland' },
  { code: 'PL', name: 'Poland' },
  { code: 'RO', name: 'Romania' },
  { code: 'BG', name: 'Bulgaria' },
  { code: 'CZ', name: 'Czech Republic' },
  { code: 'PT', name: 'Portugal' },
  { code: 'IE', name: 'Ireland' },
  { code: 'SE', name: 'Sweden' },
  { code: 'NO', name: 'Norway' },
  { code: 'DK', name: 'Denmark' },
  { code: 'FI', name: 'Finland' },
  { code: 'UA', name: 'Ukraine' },
  { code: 'RU', name: 'Russia' },
  { code: 'TR', name: 'Turkey' },
  { code: 'KZ', name: 'Kazakhstan' },
  { code: 'UZ', name: 'Uzbekistan' },
  { code: 'AZ', name: 'Azerbaijan' }
];

// Cyrillic languages that need Manrope font for visual parity
export const CYRILLIC_LANGUAGES: LanguageCode[] = [];
