import { Language } from "./LanguageContext";

interface HeaderProps {
  currentLanguage: Language;
  onLanguageChange: (lang: Language) => void;
}

export function Header({ currentLanguage, onLanguageChange }: HeaderProps) {
  return (
    <header className="sticky top-0 z-30 w-full h-14 md:h-16 bg-white/95 backdrop-blur-md border-b border-border flex items-center justify-between px-6">
      {/* Left space reserved for fixed hamburger button */}
      <div className="w-11" />
      
      <div className="font-playfair text-[16px] md:text-[18px] tracking-wide" style={{ color: '#7A1B2E' }}>
        TEACHINGS BY SUMATI
      </div>

      <div 
        className="flex bg-gray-100 p-1 rounded-full w-[72px] h-[32px] relative cursor-pointer" 
        onClick={() => onLanguageChange(currentLanguage === 'en' ? 'ru' : 'en')}
        data-testid="toggle-language-header"
      >
        <div 
          className="absolute top-1 bottom-1 w-[32px] bg-[#7A1B2E] rounded-full transition-transform duration-300" 
          style={{ transform: currentLanguage === 'en' ? 'translateX(0)' : 'translateX(32px)' }} 
        />
        <div className={`flex-1 flex items-center justify-center z-10 text-[11px] font-bold transition-colors ${currentLanguage === 'en' ? 'text-white' : 'text-gray-500'}`}>EN</div>
        <div className={`flex-1 flex items-center justify-center z-10 text-[11px] font-bold transition-colors ${currentLanguage === 'ru' ? 'text-white' : 'text-gray-500'}`}>RU</div>
      </div>
    </header>
  );
}
