import { useState } from "react";
import { useLocation } from "wouter";
import { LanguageProvider, useLanguage } from "./LanguageContext";
import { Sidebar } from "./Sidebar";
import { HamburgerButton } from "./HamburgerButton";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { BottomTabBar } from "./BottomTabBar";
import { DesktopDock } from "./DesktopDock";

interface SiteLayoutProps {
  children: React.ReactNode;
}

function LayoutInner({ children }: SiteLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { lang, setLang } = useLanguage();
  const [location] = useLocation();

  const isHomePage = location === "/";

  return (
    <div className="min-h-[100dvh] flex flex-col w-full relative pb-[calc(64px+env(safe-area-inset-bottom))] md:pb-24">
      <Sidebar 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)} 
        currentLanguage={lang}
        onLanguageChange={setLang}
      />
      
      <HamburgerButton 
        isOpen={isSidebarOpen} 
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        isOnHero={isHomePage}
      />

      {!isHomePage && (
        <Header 
          currentLanguage={lang} 
          onLanguageChange={setLang} 
        />
      )}

      <main className="flex-1 flex flex-col w-full">
        {children}
      </main>

      <Footer />

      <BottomTabBar onMenuClick={() => setIsSidebarOpen(true)} />
      <DesktopDock />
    </div>
  );
}

export function SiteLayout({ children }: SiteLayoutProps) {
  return (
    <LanguageProvider>
      <LayoutInner>{children}</LayoutInner>
    </LanguageProvider>
  );
}
