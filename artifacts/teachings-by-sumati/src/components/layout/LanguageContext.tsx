import { createContext, useContext, useState, ReactNode } from 'react';

export type Language = 'en' | 'ru';

const STORAGE_KEY = 'tbs_lang';

function readStoredLang(): Language {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === 'en' || stored === 'ru') return stored;
  } catch {
  }
  return 'en';
}

export const LanguageContext = createContext<{
  lang: Language;
  setLang: (l: Language) => void;
}>({
  lang: 'en',
  setLang: () => {},
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Language>(readStoredLang);

  const setLang = (l: Language) => {
    try {
      localStorage.setItem(STORAGE_KEY, l);
    } catch {
    }
    setLangState(l);
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => useContext(LanguageContext);
