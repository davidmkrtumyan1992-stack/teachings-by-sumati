import { Language } from "./LanguageContext";
import { useT } from "@/i18n/translations";

interface HeaderProps {
  currentLanguage: Language;
  onLanguageChange: (lang: Language) => void;
}

export function Header({ currentLanguage, onLanguageChange }: HeaderProps) {
  const t = useT();
  return (
    <header className="sticky top-0 z-30 w-full h-14 md:h-16 bg-white/95 backdrop-blur-md border-b border-border flex items-center justify-between px-6">
      <div className="w-11" />
      
      <div className="font-playfair text-[16px] md:text-[18px] tracking-wide" style={{ color: '#7A1B2E' }}>
        TEACHINGS BY SUMATI
      </div>

      <button
        type="button"
        role="switch"
        aria-checked={currentLanguage === 'ru'}
        aria-label={t.aria.switchLang(currentLanguage === 'en' ? 'English' : 'Russian')}
        className="flex bg-gray-100 p-1 rounded-full w-[72px] h-[32px] relative cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7A1B2E] focus-visible:ring-offset-2"
        onClick={() => onLanguageChange(currentLanguage === 'en' ? 'ru' : 'en')}
        data-testid="toggle-language-header"
      >
        <div
          className="absolute top-1 bottom-1 w-[32px] bg-[#7A1B2E] rounded-full transition-transform duration-300"
          style={{ transform: currentLanguage === 'en' ? 'translateX(0)' : 'translateX(32px)' }}
        />
        <span className={`flex-1 flex items-center justify-center z-10 text-[11px] font-bold transition-colors ${currentLanguage === 'en' ? 'text-white' : 'text-gray-500'}`}>EN</span>
        <span className={`flex-1 flex items-center justify-center z-10 text-[11px] font-bold transition-colors ${currentLanguage === 'ru' ? 'text-white' : 'text-gray-500'}`}>RU</span>
      </button>
    </header>
  );
}
