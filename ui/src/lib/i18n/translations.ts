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
  lt: {
    'footer.legal.terms': 'Sąlygos',
    'footer.legal.privacy': 'Privatumas',
    'footer.legal.cookie': 'Slapukų politika',
    'footer.legal.fees': 'Mokesčiai',
    'footer.legal.safety': 'Rinkliavų sauga',
    'footer.legal.help': 'Pagalbos centras',
    'footer.legal.contact': 'Kontaktai',
    'footer.trust.secure': 'Saugūs mokėjimai',
    'footer.trust.verified': 'Patikrintos rinkliavos',
    'footer.trust.data': 'Duomenų apsauga',
    'footer.copyright': '© {year} Benefactor Platform. Visos teisės saugomos.',
    'footer.selectLanguage': 'Kalba',
    'footer.selectCountry': 'Šalis'
  }
};

// Fill empty languages with EN fallback to make it production-ready
Object.keys(dictionary).forEach((key) => {
  if (Object.keys(dictionary[key as LanguageCode]).length === 0) {
    dictionary[key as LanguageCode] = dictionary.en;
  }
});
