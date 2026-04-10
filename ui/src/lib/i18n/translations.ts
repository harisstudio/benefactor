import { LanguageCode } from './config';

export type TranslationKey = 
  | 'footer.legal.terms'
  | 'footer.legal.privacy'
  | 'footer.legal.cookie'
  | 'footer.legal.fees'
  | 'footer.legal.safety'
  | 'footer.legal.help'
  | 'footer.legal.contact'
  | 'footer.trust.secure'
  | 'footer.trust.verified'
  | 'footer.trust.data'
  | 'footer.copyright'
  | 'footer.selectLanguage'
  | 'footer.selectCountry';

// Example for EN, TR, and RU (as reference for the rest of scalable dictionary)
export const dictionary: Record<LanguageCode, Record<TranslationKey, string>> = {
  en: {
    'footer.legal.terms': 'Terms',
    'footer.legal.privacy': 'Privacy',
    'footer.legal.cookie': 'Cookie Policy',
    'footer.legal.fees': 'Fees',
    'footer.legal.safety': 'Fundraising Safety',
    'footer.legal.help': 'Help Center',
    'footer.legal.contact': 'Contact',
    'footer.trust.secure': 'Secure payments',
    'footer.trust.verified': 'Verified fundraising flow',
    'footer.trust.data': 'Data protection',
    'footer.copyright': '© {year} Benefactor Platform. All rights reserved.',
    'footer.selectLanguage': 'Language',
    'footer.selectCountry': 'Country'
  },
  tr: {
    'footer.legal.terms': 'Şartlar',
    'footer.legal.privacy': 'Gizlilik',
    'footer.legal.cookie': 'Çerez Politikası',
    'footer.legal.fees': 'Ücretler',
    'footer.legal.safety': 'Bağış Güvenliği',
    'footer.legal.help': 'Yardım Merkezi',
    'footer.legal.contact': 'İletişim',
    'footer.trust.secure': 'Güvenli ödemeler',
    'footer.trust.verified': 'Onaylanmış bağış akışı',
    'footer.trust.data': 'Veri koruması',
    'footer.copyright': '© {year} Benefactor Platform. Tüm hakları saklıdır.',
    'footer.selectLanguage': 'Dil',
    'footer.selectCountry': 'Ülke'
  },
  ru: {
    'footer.legal.terms': 'Условия',
    'footer.legal.privacy': 'Конфиденциальность',
    'footer.legal.cookie': 'Политика файлов cookie',
    'footer.legal.fees': 'Сборы',
    'footer.legal.safety': 'Безопасность сборов',
    'footer.legal.help': 'Справочный центр',
    'footer.legal.contact': 'Контакт',
    'footer.trust.secure': 'Безопасные платежи',
    'footer.trust.verified': 'Проверенные кампании',
    'footer.trust.data': 'Защита данных',
    'footer.copyright': '© {year} Платформа Benefactor. Все права защищены.',
    'footer.selectLanguage': 'Язык',
    'footer.selectCountry': 'Страна'
  },
  // Adding fallbacks for all other languages mapped to English for scaffolding
  lt: {} as any, de: {} as any, fr: {} as any, es: {} as any, it: {} as any, 
  nl: {} as any, pl: {} as any, ro: {} as any, bg: {} as any, cs: {} as any, 
  pt: {} as any, sv: {} as any, no: {} as any, da: {} as any, fi: {} as any, 
  uk: {} as any, kk: {} as any, uz: {} as any, az: {} as any
};

// Fill empty languages with EN fallback to make it production-ready
Object.keys(dictionary).forEach((key) => {
  if (Object.keys(dictionary[key as LanguageCode]).length === 0) {
    dictionary[key as LanguageCode] = dictionary.en;
  }
});
