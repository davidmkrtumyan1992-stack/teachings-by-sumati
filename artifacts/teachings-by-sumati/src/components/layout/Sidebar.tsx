import { useEffect, useRef } from "react";
import { Link, useLocation } from "wouter";
import { X, Home, BookOpen, Flower2, Mountain, Calendar, Link as LinkIcon, Globe } from "lucide-react";
import { Language } from "./LanguageContext";
import { useT } from "@/i18n/translations";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  currentLanguage: Language;
  onLanguageChange: (lang: Language) => void;
}

export function Sidebar({ isOpen, onClose, currentLanguage, onLanguageChange }: SidebarProps) {
  const [location] = useLocation();
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const t = useT();

  const NAV_LINKS = [
    { href: "/", label: t.nav.home, icon: Home },
    { href: "/aci-courses", label: t.nav.aciCourses, icon: BookOpen },
    { href: "/practice-modules", label: t.nav.practiceModules, icon: Flower2 },
    { href: "/retreats", label: t.nav.retreats, icon: Mountain },
    { href: "/events", label: t.nav.events, icon: Calendar },
    { href: "/projects", label: t.nav.projects, icon: LinkIcon },
  ];

  useEffect(() => {
    if (!isOpen) return;
    closeButtonRef.current?.focus();
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/40 transition-opacity duration-300"
          onClick={onClose}
          data-testid="sidebar-overlay"
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 bottom-0 left-0 z-50 w-full md:w-[320px] bg-white shadow-2xl transition-transform duration-300 ease-in-out flex flex-col ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
        aria-hidden={!isOpen}
        inert={!isOpen}
        data-testid="sidebar-container"
      >
        <div className="flex items-center justify-between px-6 h-20 shrink-0 border-b border-border">
          <div className="font-playfair text-[17px] font-semibold tracking-widest text-[#1A1A1A]">
            TEACHINGS BY SUMATI
          </div>
          <button 
            ref={closeButtonRef}
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            data-testid="button-close-sidebar"
            aria-label={t.aria.closeMenu}
          >
            <X className="w-6 h-6 text-gray-500" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto py-6">
          <nav className="space-y-1 px-4">
            {NAV_LINKS.map((link) => {
              const isActive = location === link.href || (link.href !== '/' && location.startsWith(link.href));
              
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7A1B2E] focus-visible:ring-offset-2"
                >
                  <div
                    className={`flex items-center gap-4 px-4 h-[52px] rounded-xl cursor-pointer transition-all duration-200 font-inter text-[16px]
                      ${isActive
                        ? "text-[#7A1B2E] font-medium"
                        : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                      }
                    `}
                    style={isActive ? {
                      background: 'rgba(122, 27, 46, 0.07)',
                      boxShadow: '0 2px 8px rgba(122, 27, 46, 0.10), inset 0 0 0 1px rgba(122, 27, 46, 0.20)',
                    } : undefined}
                    aria-current={isActive ? 'page' : undefined}
                    data-testid={`link-sidebar-${link.href.replace('/', '') || 'home'}`}
                  >
                    <link.icon className={`w-5 h-5 shrink-0 ${isActive ? 'text-[#7A1B2E]' : 'text-gray-400'}`} />
                    <span>{link.label}</span>
                    {isActive && (
                      <div className="ml-auto w-1.5 h-1.5 rounded-full bg-[#7A1B2E]" />
                    )}
                  </div>
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="px-6 pt-6 pb-[calc(24px+env(safe-area-inset-bottom))] border-t border-border mt-auto flex items-center justify-between">
          <div className="flex items-center gap-2 text-gray-500 text-sm font-medium">
            <Globe className="w-5 h-5" />
            <span>{t.nav.language}</span>
          </div>
          
          <button
            type="button"
            role="switch"
            aria-checked={currentLanguage === 'ru'}
            aria-label={t.aria.switchLang()}
            className="flex bg-gray-100 p-1 rounded-full w-[72px] h-[32px] relative cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7A1B2E] focus-visible:ring-offset-2"
            onClick={() => onLanguageChange(currentLanguage === 'en' ? 'ru' : 'en')}
            data-testid="toggle-language-sidebar"
          >
            <div className="absolute top-1 bottom-1 w-[32px] bg-[#7A1B2E] rounded-full transition-transform duration-300" style={{ transform: currentLanguage === 'en' ? 'translateX(0)' : 'translateX(32px)' }} />
            <span className={`flex-1 flex items-center justify-center z-10 text-[11px] font-bold leading-none transition-colors ${currentLanguage === 'en' ? 'text-white' : 'text-gray-500'}`}>EN</span>
            <span className={`flex-1 flex items-center justify-center z-10 text-[11px] font-bold leading-none transition-colors ${currentLanguage === 'ru' ? 'text-white' : 'text-gray-500'}`}>RU</span>
          </button>
        </div>
      </div>
    </>
  );
}
