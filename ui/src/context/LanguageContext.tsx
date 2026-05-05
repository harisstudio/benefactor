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
    heroSubtitle: "Where every story matters and every donation counts.",
    heroDesc: "Create your fundraiser in minutes. Share your cause, rally your community, and turn generosity into real impact.",
    stats1: "No fee to start fundraising",
    stats2: "Every campaign reviewed & verified",
    stats3: "Withdraw to your bank anytime",
    trustedHeading: "Simple. Transparent. Built for trust.",
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
    heroSubtitle: "Her hikaye önemli, her bağış fark yaratır.",
    heroDesc: "Dakikalar içinde kampanyanı oluştur. Amacını paylaş, topluluğunu harekete geçir ve cömertliği gerçek etkiye dönüştür.",
    stats1: "Bağış toplamak için komisyon yok",
    stats2: "Her kampanya incelenir ve doğrulanır",
    stats3: "İstediğin zaman bankana çek",
    trustedHeading: "Basit. Şeffaf. Güven üzerine kurulu.",
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
    heroTitle1: "La Plataforma", heroTitle2: "Mundial De", heroTitle3: "Recaudación", heroSubtitle: "Donde cada historia importa y cada donación cuenta.", heroDesc: "Crea tu campaña en minutos. Comparte tu causa, moviliza a tu comunidad y convierte la generosidad en impacto real.",
    stats1: "Sin tarifas de inicio", stats2: "Cada campaña es revisada y verificada", stats3: "Retira a tu banco en cualquier momento",
    trustedHeading: "Simple. Transparente. Construido para la confianza.", footerCategories: "Categorías", footerAbout: "Acerca",
    raised: "Recaudado", donations: "Donaciones", purpose: "Objetivo", donatePlain: "Donar", share: "Compartir", featuredHeading: "Campañas Destacadas",
    nearbyBtn: "Cerca de ti", viewAll: "Ver todo", modalSettings: "Actualice su configuración", modalDesc: "Elija el idioma y el país.", modalLang: "Seleccione un idioma", modalCountry: "Seleccione un país", modalCancel: "Cancelar", modalSave: "Guardar",
    featuredTopics: "Temas destacados", Animals: "Animales", Business: "Negocios", Community: "Comunidad", Competitions: "Competiciones", Creative: "Creativo", Emergency: "Emergencia", Environment: "Medio Ambiente", Events: "Eventos", Family: "Familia", Medical: "Médico",
    ofGoal: "de", goal: "meta"
  },
  Français: {
    search: "Recherche", donate: "Faire un don ▾", fundraise: "Collecter ▾", about: "À propos ▾", signin: "Se connecter", startBenefactor: "Lancer une Campagne",
    heroTitle1: "Plateforme", heroTitle2: "Mondiale De", heroTitle3: "Collecte de Fonds", heroSubtitle: "Où chaque histoire compte et chaque don fait la différence.", heroDesc: "Créez votre collecte en quelques minutes. Partagez votre cause, mobilisez votre communauté et transformez la générosité en impact réel.",
    stats1: "Aucun frais de départ", stats2: "Chaque campagne est vérifiée", stats3: "Retirez sur votre compte à tout moment",
    trustedHeading: "Simple. Transparent. Conçu pour la confiance.", footerCategories: "Catégories", footerAbout: "À propos",
    raised: "Collectés", donations: "Dons", purpose: "Objectif", donatePlain: "Faire un don", share: "Partager", featuredHeading: "Campagnes en Vedette",
    nearbyBtn: "À proximité", viewAll: "Voir tout", modalSettings: "Mettez à jour vos paramètres", modalDesc: "Choisissez votre langue et votre pays.", modalLang: "Sélectionnez une langue", modalCountry: "Sélectionnez un pays", modalCancel: "Annuler", modalSave: "Enregistrer",
    featuredTopics: "Sujets en vedette", Animals: "Animaux", Business: "Entreprise", Community: "Communauté", Competitions: "Compétitions", Creative: "Créatif", Emergency: "Urgence", Environment: "Environnement", Events: "Événements", Family: "Famille", Medical: "Médical",
    ofGoal: "sur", goal: "d'objectif"
  },
  Deutsch: {
    search: "Suche", donate: "Spenden ▾", fundraise: "Sammeln ▾", about: "Über uns ▾", signin: "Anmelden", startBenefactor: "Kampagne starten",
    heroTitle1: "Weltweite", heroTitle2: "Spenden-", heroTitle3: "Plattform", heroSubtitle: "Wo jede Geschichte zählt und jede Spende wirkt.", heroDesc: "Erstelle deine Kampagne in wenigen Minuten. Teile dein Anliegen, mobilisiere deine Gemeinschaft und verwandle Großzügigkeit in echte Wirkung.",
    stats1: "Keine Startgebühr", stats2: "Jede Kampagne wird geprüft und verifiziert", stats3: "Jederzeit auf Ihr Konto auszahlen",
    trustedHeading: "Einfach. Transparent. Für Vertrauen gebaut.", footerCategories: "Kategorien", footerAbout: "Über uns",
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
