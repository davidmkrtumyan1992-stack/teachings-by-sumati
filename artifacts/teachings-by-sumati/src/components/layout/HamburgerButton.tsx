import { useT } from "@/i18n/translations";

interface HamburgerButtonProps {
  isOpen: boolean;
  onClick: () => void;
  isOnHero?: boolean;
}

export function HamburgerButton({ isOpen, onClick, isOnHero = false }: HamburgerButtonProps) {
  const t = useT();
  const linesColor = isOnHero ? "bg-white" : "bg-[#1A1A1A]";
  const bgColor = isOnHero ? "bg-transparent" : "bg-white shadow-md";

  return (
    <button
      onClick={onClick}
      className={`fixed top-6 left-6 z-60 w-11 h-11 flex flex-col items-center justify-center gap-1.5 rounded-full transition-all duration-300 ${bgColor}`}
      data-testid="button-hamburger"
      aria-label={t.aria.menu}
    >
      <div className={`w-6 h-[2px] transition-all duration-300 ${linesColor} ${isOpen ? "rotate-45 translate-y-[8px]" : ""}`} />
      <div className={`w-6 h-[2px] transition-all duration-300 ${linesColor} ${isOpen ? "opacity-0" : "opacity-100"}`} />
      <div className={`w-6 h-[2px] transition-all duration-300 ${linesColor} ${isOpen ? "-rotate-45 -translate-y-[8px]" : ""}`} />
    </button>
  );
}
