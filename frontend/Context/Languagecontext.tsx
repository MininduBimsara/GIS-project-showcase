"use client";

import React, { createContext, useContext, useState } from "react";
import { en } from "@/locales/en";
import { si } from "@/locales/si";
import { ta } from "@/locales/ta";

type Language = "en" | "si" | "ta";
type TranslationData = typeof en;

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: TranslationData;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

const translations: Record<Language, TranslationData> = {
  en,
  si,
  ta,
};

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  // Load saved language preference from localStorage on mount
  const [language, setLanguageState] = useState<Language>(() => {
    if (typeof window !== "undefined") {
      const savedLanguage = localStorage.getItem("language") as Language;
      if (savedLanguage && translations[savedLanguage]) {
        return savedLanguage;
      }
    }
    return "en";
  });

  // Save language preference to localStorage and refresh page when it changes
  const setLanguage = (lang: Language) => {
    if (lang !== language) {
      localStorage.setItem("language", lang);
      // Force page refresh to reload all content in new language
      window.location.reload();
    }
  };

  const value: LanguageContextType = {
    language,
    setLanguage,
    t: translations[language],
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
