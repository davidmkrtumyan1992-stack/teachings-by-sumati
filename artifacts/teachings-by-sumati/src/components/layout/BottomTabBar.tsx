import type { CSSProperties } from "react";
import { Link, useLocation } from "wouter";
import { House, BookOpen, Flower2, Calendar, Menu } from "lucide-react";
import { useT } from "@/i18n/translations";

interface BottomTabBarProps {
  onMenuClick: () => void;
}

const TAB_COUNT = 5;

export function BottomTabBar({ onMenuClick }: BottomTabBarProps) {
  const [location] = useLocation();
  const t = useT();

  const tabs = [
    { href: "/", label: t.nav.home, icon: House },
    { href: "/aci-courses", label: t.nav.aciCourses, icon: BookOpen },
    { href: "/practice-modules", label: t.nav.practiceModules, icon: Flower2 },
    { href: "/events", label: t.nav.events, icon: Calendar },
  ];

  const activeIndex = tabs.findIndex(
    (tab) => location === tab.href || (tab.href !== '/' && location.startsWith(tab.href))
  );
  const hasActiveTab = activeIndex !== -1;
  const notchX = `${((activeIndex === -1 ? 0 : activeIndex) + 0.5) / TAB_COUNT * 100}%`;

  return (
    <nav
      aria-label={t.nav.more}
      className="tabbar-notched fixed bottom-0 left-0 right-0 h-[calc(64px+env(safe-area-inset-bottom))] bg-white border-t border-[#E5E2DF] shadow-[0_-4px_20px_rgba(0,0,0,0.05)] z-40 md:hidden pb-[env(safe-area-inset-bottom)] flex items-stretch relative"
      style={{ '--notch-x': notchX } as CSSProperties}
    >
      {tabs.map((tab, idx) => {
        const isActive = idx === activeIndex;

        return (
          <Link
            key={tab.href}
            href={tab.href}
            className="flex-1 rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7A1B2E] focus-visible:ring-offset-2"
          >
            <div
              className={`flex flex-col items-center justify-center h-full pt-2.5 gap-1 cursor-pointer ${isActive ? 'text-[#7A1B2E]' : 'text-[#9A9A9A]'}`}
              aria-current={isActive ? 'page' : undefined}
              data-testid={`tabbar-link-${tab.href.replace('/', '') || 'home'}`}
            >
              <tab.icon className={`w-6 h-6 shrink-0 transition-opacity duration-200 ${isActive ? 'opacity-0' : 'opacity-100'}`} />
              <span className={`text-[11px] font-medium font-inter text-center leading-tight ${isActive ? 'sr-only' : ''}`}>
                {tab.label}
              </span>
            </div>
          </Link>
        );
      })}

      <button
        type="button"
        className="flex-1 flex flex-col items-center justify-center h-full pt-2.5 gap-1 text-[#9A9A9A]"
        onClick={onMenuClick}
        data-testid="tabbar-link-more"
        aria-label={t.aria.openMenu}
      >
        <Menu className="w-6 h-6 shrink-0" />
        <span className="text-[11px] font-medium font-inter text-center leading-tight">{t.nav.more}</span>
      </button>

      {hasActiveTab && (
        <div
          className="tabbar-notch-bubble absolute -top-6 w-14 h-14 rounded-full bg-[#7A1B2E] shadow-[0_4px_20px_rgba(122,27,46,0.3)] flex items-center justify-center transition-[left] duration-300 ease-out"
          style={{ left: notchX }}
          aria-hidden="true"
        >
          {(() => {
            const ActiveIcon = tabs[activeIndex].icon;
            return <ActiveIcon className="w-6 h-6 text-white" />;
          })()}
        </div>
      )}

      <style>{`
        @property --notch-x {
          syntax: '<percentage>';
          inherits: true;
          initial-value: 10%;
        }
        .tabbar-notched {
          -webkit-mask-image: radial-gradient(circle 32px at var(--notch-x) 0px, transparent 32px, black 33px);
          mask-image: radial-gradient(circle 32px at var(--notch-x) 0px, transparent 32px, black 33px);
          transition: --notch-x 300ms ease-out;
        }
        .tabbar-notch-bubble {
          transform: translateX(-50%);
        }
      `}</style>
    </nav>
  );
}
