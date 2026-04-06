import { Link, useLocation } from "wouter";
import { House, BookOpen, Flower2, Calendar, Menu } from "lucide-react";

interface BottomTabBarProps {
  onMenuClick: () => void;
}

export function BottomTabBar({ onMenuClick }: BottomTabBarProps) {
  const [location] = useLocation();

  const tabs = [
    { href: "/", label: "Home", icon: House },
    { href: "/aci-courses", label: "Courses", icon: BookOpen },
    { href: "/practice-modules", label: "Practices", icon: Flower2 },
    { href: "/events", label: "Events", icon: Calendar },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 h-[calc(64px+env(safe-area-inset-bottom))] bg-white border-t border-[#E5E2DF] shadow-[0_-4px_20px_rgba(0,0,0,0.05)] z-40 md:hidden pb-[env(safe-area-inset-bottom)] flex items-center justify-around px-2">
      {tabs.map((tab) => {
        const isActive = location === tab.href || (tab.href !== '/' && location.startsWith(tab.href));
        
        return (
          <Link key={tab.href} href={tab.href}>
            <div 
              className={`flex flex-col items-center justify-center w-16 h-full gap-1 cursor-pointer ${isActive ? 'text-[#7A1B2E]' : 'text-[#9A9A9A]'}`}
              data-testid={`tabbar-link-${tab.label.toLowerCase()}`}
            >
              <tab.icon className="w-6 h-6" />
              <span className="text-[11px] font-medium font-inter">{tab.label}</span>
            </div>
          </Link>
        );
      })}
      
      <div 
        className="flex flex-col items-center justify-center w-16 h-full gap-1 cursor-pointer text-[#9A9A9A]"
        onClick={onMenuClick}
        data-testid="tabbar-link-more"
      >
        <Menu className="w-6 h-6" />
        <span className="text-[11px] font-medium font-inter">More</span>
      </div>
    </div>
  );
}
