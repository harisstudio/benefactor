export type LanguageCode = 
  | 'en' | 'lt' | 'de' | 'fr' | 'es' | 'it' | 'nl' | 'pl' | 'ro' 
  | 'bg' | 'cs' | 'pt' | 'sv' | 'no' | 'da' | 'fi' | 'uk' | 'ru' 
  | 'tr' | 'kk' | 'uz' | 'az';

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
  { code: 'de', name: 'German', nativeName: 'Deutsch' },
  { code: 'fr', name: 'French', nativeName: 'Français' },
  { code: 'es', name: 'Spanish', nativeName: 'Español' },
  { code: 'it', name: 'Italian', nativeName: 'Italiano' },
  { code: 'nl', name: 'Dutch', nativeName: 'Nederlands' },
  { code: 'pl', name: 'Polish', nativeName: 'Polski' },
  { code: 'ro', name: 'Romanian', nativeName: 'Română' },
  { code: 'bg', name: 'Bulgarian', nativeName: 'Български' },
  { code: 'cs', name: 'Czech', nativeName: 'Čeština' },
  { code: 'pt', name: 'Portuguese', nativeName: 'Português' },
  { code: 'sv', name: 'Swedish', nativeName: 'Svenska' },
  { code: 'no', name: 'Norwegian', nativeName: 'Norsk' },
  { code: 'da', name: 'Danish', nativeName: 'Dansk' },
  { code: 'fi', name: 'Finnish', nativeName: 'Suomi' },
  { code: 'uk', name: 'Ukrainian', nativeName: 'Українська' },
  { code: 'ru', name: 'Russian', nativeName: 'Русский' },
  { code: 'tr', name: 'Turkish', nativeName: 'Türkçe' },
  { code: 'kk', name: 'Kazakh', nativeName: 'Қазақша' },
  { code: 'uz', name: 'Uzbek', nativeName: 'Oʻzbekcha' },
  { code: 'az', name: 'Azerbaijani', nativeName: 'Azərbaycanca' }
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
export const CYRILLIC_LANGUAGES: LanguageCode[] = ['ru', 'uk', 'bg', 'kk', 'uz'];
