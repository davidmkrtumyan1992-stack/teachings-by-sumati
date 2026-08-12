import { useRef, useState, type MouseEvent } from "react";
import { Link, useLocation } from "wouter";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
  AnimatePresence,
  type MotionValue,
} from "framer-motion";
import { Home, BookOpen, Flower2, Mountain, Calendar, Link as LinkIcon, type LucideIcon } from "lucide-react";
import { useT } from "@/i18n/translations";

interface DockItem {
  href: string;
  label: string;
  icon: LucideIcon;
}

export function DesktopDock() {
  const [location] = useLocation();
  const t = useT();
  const mouseX = useMotionValue(Infinity);

  const items: DockItem[] = [
    { href: "/", label: t.nav.home, icon: Home },
    { href: "/aci-courses", label: t.nav.aciCourses, icon: BookOpen },
    { href: "/practice-modules", label: t.nav.practiceModules, icon: Flower2 },
    { href: "/retreats", label: t.nav.retreats, icon: Mountain },
    { href: "/events", label: t.nav.events, icon: Calendar },
    { href: "/projects", label: t.nav.projects, icon: LinkIcon },
  ];

  return (
    <motion.div
      onMouseMove={(e: MouseEvent<HTMLDivElement>) => mouseX.set(e.pageX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      className="hidden md:flex fixed bottom-6 left-1/2 -translate-x-1/2 z-40 items-end gap-3 h-16 px-4 pb-2.5 rounded-2xl glass-panel"
      aria-label={t.aria.quickAccess}
    >
      {items.map((item) => {
        const isActive = location === item.href || (item.href !== "/" && location.startsWith(item.href));
        return <DockIcon key={item.href} mouseX={mouseX} item={item} isActive={isActive} />;
      })}
    </motion.div>
  );
}

function DockIcon({ mouseX, item, isActive }: { mouseX: MotionValue<number>; item: DockItem; isActive: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  const sizeRange = shouldReduceMotion ? [44, 44, 44] : [40, 64, 40];
  const iconSizeRange = shouldReduceMotion ? [22, 22, 22] : [18, 28, 18];
  const size = useSpring(useTransform(distance, [-140, 0, 140], sizeRange), { mass: 0.1, stiffness: 150, damping: 12 });
  const iconSize = useSpring(useTransform(distance, [-140, 0, 140], iconSizeRange), { mass: 0.1, stiffness: 150, damping: 12 });

  const Icon = item.icon;

  return (
    <Link
      href={item.href}
      className="rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7A1B2E] focus-visible:ring-offset-2"
    >
      <motion.div
        ref={ref}
        style={{
          width: size,
          height: size,
          ...(isActive
            ? { background: "rgba(122, 27, 46, 0.07)", boxShadow: "inset 0 0 0 1px rgba(122, 27, 46, 0.20)" }
            : {}),
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className={`relative flex items-center justify-center rounded-full transition-colors ${isActive ? "" : "hover:bg-white/50"}`}
      >
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0, y: 6, x: "-50%" }}
              animate={{ opacity: 1, y: 0, x: "-50%" }}
              exit={{ opacity: 0, y: 4, x: "-50%" }}
              transition={{ duration: 0.15 }}
              className="absolute left-1/2 -top-9 whitespace-nowrap rounded-md bg-[#1A1A1A] text-white text-xs font-inter px-2.5 py-1 shadow-lg pointer-events-none"
            >
              {item.label}
            </motion.div>
          )}
        </AnimatePresence>
        <motion.div style={{ width: iconSize, height: iconSize }} className="flex items-center justify-center">
          <Icon className={`w-full h-full ${isActive ? "text-[#7A1B2E]" : "text-[#6B6B6B]"}`} strokeWidth={1.75} />
        </motion.div>
        {isActive && (
          <span className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#7A1B2E]" />
        )}
        <span className="sr-only">{item.label}</span>
      </motion.div>
    </Link>
  );
}
