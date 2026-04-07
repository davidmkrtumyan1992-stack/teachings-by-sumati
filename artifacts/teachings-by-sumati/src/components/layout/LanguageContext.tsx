import { createContext, useContext, useState, ReactNode } from 'react';

export type Language = 'en' | 'ru';

export const LanguageContext = createContext<{
  lang: Language;
  setLang: (l: Language) => void;
}>({
  lang: 'en',
  setLang: () => {},
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Language>('en');

  const setLang = (l: Language) => {
    setLangState(l);
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => useContext(LanguageContext);
