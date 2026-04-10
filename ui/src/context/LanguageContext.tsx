"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

type Language = "English" | "Español" | "Français" | "Deutsch" | "Türkçe";

interface Translations {
  [key: string]: string;
}

const translations: Record<Language, Translations> = {
  English: {
    search: "Search",
    donate: "Donate ▾",
    fundraise: "Fundraise ▾",
    about: "About ▾",
    signin: "Sign in",
    startBenefactor: "Start a Benefactor",
    heroTitle1: "World Wide",
    heroTitle2: "Fundraising",
    heroTitle3: "Platform",
    heroSubtitle: "More than $50 million is raised every week on Benefactor Team.*",
    heroDesc: "Get started in just a few minutes with helpful new tools, it’s easier than ever to pick the perfect title, write a compelling story, and share it with the world.",
    stats1: "No fee to start fundraising",
    stats2: "1 donation made every second",
    stats3: "8K+ fundraisers started daily",
    trustedHeading: "Fundraising on Benefactor is easy, powerful, and trusted",
    footerCategories: "Categories",
    footerAbout: "About",
    raised: "Raised",
    donations: "Donations",
    purpose: "Purpose",
    donatePlain: "Donate",
    share: "Share",
    featuredHeading: "Featured Fundraisers",
    nearbyBtn: "Nearby You",
    viewAll: "View All",
    modalSettings: "Update your settings",
    modalDesc: "Set what language you speak and where you live.",
    modalLang: "Select a language",
    modalCountry: "Select a country",
    modalCancel: "Cancel",
    modalSave: "Save",
    featuredTopics: "Featured topics",
    Animals: "Animals",
    Business: "Business",
    Community: "Community",
    Competitions: "Competitions",
    Creative: "Creative",
    Emergency: "Emergency",
    Environment: "Environment",
    Events: "Events",
    Family: "Family",
    Medical: "Medical",
    ofGoal: "of",
    goal: "goal"
  },
  Türkçe: {
    search: "Arama",
    donate: "Bağış Yap ▾",
    fundraise: "Bağış Topla ▾",
    about: "Hakkımızda ▾",
    signin: "Giriş Yap",
    startBenefactor: "Kampanya Başlat",
    heroTitle1: "Dünya Çapında",
    heroTitle2: "Bağış Toplama",
    heroTitle3: "Platformu",
    heroSubtitle: "Benefactor Ekibi üzerinde her hafta 50 milyon dolardan fazla bağış toplanıyor.*",
    heroDesc: "Yeni ve faydalı araçlarla birkaç dakika içinde başlayın; mükemmel başlığı seçmek, etkileyici bir hikaye yazmak ve onu dünyayla paylaşmak artık her zamankinden daha kolay.",
    stats1: "Bağış toplamak için komisyon yok",
    stats2: "Hemen her saniye 1 bağış yapılıyor",
    stats3: "Günde 8.000'den fazla kampanya",
    trustedHeading: "Benefactor üzerinde bağış toplamak kolay, güçlü ve güvenilirdir",
    footerCategories: "Kategoriler",
    footerAbout: "Hakkımızda",
    raised: "Toplanan",
    donations: "Bağış",
    purpose: "Hedef",
    donatePlain: "Bağış Yap",
    share: "Paylaş",
    featuredHeading: "Öne Çıkan Kampanyalar",
    nearbyBtn: "Yakındaki",
    viewAll: "Tümünü Gör",
    modalSettings: "Ayarlarınızı güncelleyin",
    modalDesc: "Konuştuğunuz dili ve yaşadığınız ülkeyi seçin.",
    modalLang: "Dil Seçimi",
    modalCountry: "Ülke Seçimi",
    modalCancel: "İptal",
    modalSave: "Kaydet",
    featuredTopics: "Öne Çıkan Konular",
    Animals: "Hayvanlar",
    Business: "İşletme",
    Community: "Topluluk",
    Competitions: "Yarışmalar",
    Creative: "Yaratıcı",
    Emergency: "Acil",
    Environment: "Çevre",
    Events: "Etkinlikler",
    Family: "Aile",
    Medical: "Sağlık",
    ofGoal: "/",
    goal: "hedeften"
  },
  Español: {
    search: "Buscar", donate: "Donar ▾", fundraise: "Recaudar ▾", about: "Acerca ▾", signin: "Iniciar sesión", startBenefactor: "Iniciar Campaña",
    heroTitle1: "La Plataforma", heroTitle2: "Mundial De", heroTitle3: "Recaudación", heroSubtitle: "Más de 50 millones recaudados cada semana.", heroDesc: "Comienza en un par de minutos, comparte tu historia con el mundo.",
    stats1: "Sin tarifas de inicio", stats2: "1 donación cada segundo", stats3: "8K+ campañas diarias",
    trustedHeading: "Recaudar en Benefactor es fácil y confiable", footerCategories: "Categorías", footerAbout: "Acerca",
    raised: "Recaudado", donations: "Donaciones", purpose: "Objetivo", donatePlain: "Donar", share: "Compartir", featuredHeading: "Campañas Destacadas",
    nearbyBtn: "Cerca de ti", viewAll: "Ver todo", modalSettings: "Actualice su configuración", modalDesc: "Elija el idioma y el país.", modalLang: "Seleccione un idioma", modalCountry: "Seleccione un país", modalCancel: "Cancelar", modalSave: "Guardar",
    featuredTopics: "Temas destacados", Animals: "Animales", Business: "Negocios", Community: "Comunidad", Competitions: "Competiciones", Creative: "Creativo", Emergency: "Emergencia", Environment: "Medio Ambiente", Events: "Eventos", Family: "Familia", Medical: "Médico",
    ofGoal: "de", goal: "meta"
  },
  Français: {
    search: "Recherche", donate: "Faire un don ▾", fundraise: "Collecter ▾", about: "À propos ▾", signin: "Se connecter", startBenefactor: "Lancer une Campagne",
    heroTitle1: "Plateforme", heroTitle2: "Mondiale De", heroTitle3: "Collecte de Fonds", heroSubtitle: "Plus de 50 millions collectés chaque semaine.", heroDesc: "Commencez en quelques minutes, partagez votre histoire avec le monde.",
    stats1: "Aucun frais de départ", stats2: "1 don fait chaque seconde", stats3: "8K+ collectes chaque jour",
    trustedHeading: "Collecter sur Benefactor est facile et sûr", footerCategories: "Catégories", footerAbout: "À propos",
    raised: "Collectés", donations: "Dons", purpose: "Objectif", donatePlain: "Faire un don", share: "Partager", featuredHeading: "Campagnes en Vedette",
    nearbyBtn: "À proximité", viewAll: "Voir tout", modalSettings: "Mettez à jour vos paramètres", modalDesc: "Choisissez votre langue et votre pays.", modalLang: "Sélectionnez une langue", modalCountry: "Sélectionnez un pays", modalCancel: "Annuler", modalSave: "Enregistrer",
    featuredTopics: "Sujets en vedette", Animals: "Animaux", Business: "Entreprise", Community: "Communauté", Competitions: "Compétitions", Creative: "Créatif", Emergency: "Urgence", Environment: "Environnement", Events: "Événements", Family: "Famille", Medical: "Médical",
    ofGoal: "sur", goal: "d'objectif"
  },
  Deutsch: {
    search: "Suche", donate: "Spenden ▾", fundraise: "Sammeln ▾", about: "Über uns ▾", signin: "Anmelden", startBenefactor: "Kampagne starten",
    heroTitle1: "Weltweite", heroTitle2: "Spenden-", heroTitle3: "Plattform", heroSubtitle: "Wöchentlich werden über 50 Millionen gesammelt.", heroDesc: "Beginnen Sie in wenigen Minuten, teilen Sie Ihre Geschichte mit der Welt.",
    stats1: "Keine Startgebühr", stats2: "1 Spende pro Sekunde", stats3: "8K+ Kampagnen täglich",
    trustedHeading: "Das Sammeln auf Benefactor ist einfach und sicher", footerCategories: "Kategorien", footerAbout: "Über uns",
    raised: "Gesammelt", donations: "Spenden", purpose: "Ziel", donatePlain: "Spenden", share: "Teilen", featuredHeading: "Hervorgehobene Kampagnen",
    nearbyBtn: "In Ihrer Nähe", viewAll: "Alle ansehen", modalSettings: "Einstellungen aktualisieren", modalDesc: "Wählen Sie Ihre Sprache und Ihr Land.", modalLang: "Sprache auswählen", modalCountry: "Land auswählen", modalCancel: "Abbrechen", modalSave: "Speichern",
    featuredTopics: "Beliebte Themen", Animals: "Tiere", Business: "Geschäft", Community: "Gemeinschaft", Competitions: "Wettbewerbe", Creative: "Kreativ", Emergency: "Notfall", Environment: "Umwelt", Events: "Veranstaltungen", Family: "Familie", Medical: "Medizinisch",
    ofGoal: "von", goal: "Ziel"
  }
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType>({
  language: "English",
  setLanguage: () => {},
  t: (key: string) => key,
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>("English");

  useEffect(() => {
    const saved = localStorage.getItem("benefactor_lang") as Language;
    if (saved && translations[saved]) {
      setLanguageState(saved);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("benefactor_lang", lang);
  };

  const t = (key: string) => {
    return translations[language]?.[key] || translations["English"][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => useContext(LanguageContext);
