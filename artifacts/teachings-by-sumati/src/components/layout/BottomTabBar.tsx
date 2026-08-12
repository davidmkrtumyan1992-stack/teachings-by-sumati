import { Link, useLocation } from "wouter";
import { House, BookOpen, Flower2, Calendar, Menu } from "lucide-react";
import { useT } from "@/i18n/translations";

interface BottomTabBarProps {
  onMenuClick: () => void;
}

export function BottomTabBar({ onMenuClick }: BottomTabBarProps) {
  const [location] = useLocation();
  const t = useT();

  const tabs = [
    { href: "/", label: t.nav.home, icon: House },
    { href: "/aci-courses", label: t.nav.aciCourses, icon: BookOpen },
    { href: "/practice-modules", label: t.nav.practiceModules, icon: Flower2 },
    { href: "/events", label: t.nav.events, icon: Calendar },
  ];

  return (
    <nav
      aria-label={t.nav.more}
      className="fixed bottom-0 left-0 right-0 h-[calc(64px+env(safe-area-inset-bottom))] bg-white border-t border-[#E5E2DF] shadow-[0_-4px_20px_rgba(0,0,0,0.05)] z-40 md:hidden pb-[env(safe-area-inset-bottom)] flex items-center justify-around px-2"
    >
      {tabs.map((tab) => {
        const isActive = location === tab.href || (tab.href !== '/' && location.startsWith(tab.href));

        return (
          <Link
            key={tab.href}
            href={tab.href}
            className="rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7A1B2E] focus-visible:ring-offset-2"
          >
            <div
              className={`flex flex-col items-center w-16 h-full pt-2.5 gap-1 cursor-pointer ${isActive ? 'text-[#7A1B2E]' : 'text-[#9A9A9A]'}`}
              aria-current={isActive ? 'page' : undefined}
              data-testid={`tabbar-link-${tab.href.replace('/', '') || 'home'}`}
            >
              <tab.icon className="w-6 h-6 shrink-0" />
              <span className="text-[11px] font-medium font-inter text-center leading-tight">{tab.label}</span>
            </div>
          </Link>
        );
      })}

      <button
        type="button"
        className="flex flex-col items-center w-16 h-full pt-2.5 gap-1 text-[#9A9A9A]"
        onClick={onMenuClick}
        data-testid="tabbar-link-more"
        aria-label={t.aria.openMenu}
      >
        <Menu className="w-6 h-6 shrink-0" />
        <span className="text-[11px] font-medium font-inter text-center leading-tight">{t.nav.more}</span>
      </button>
    </nav>
  );
}
