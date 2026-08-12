import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

function MandalaMotif({ size = 260 }: { size?: number }) {
  const cx = size / 2;
  const cy = size / 2;
  const ringRadii = [size * 0.46, size * 0.36, size * 0.27];
  const petalCount = 16;
  const petals = Array.from({ length: petalCount }, (_, i) => {
    const angle = (i / petalCount) * Math.PI * 2;
    const r = size * 0.4;
    return { x: cx + Math.cos(angle) * r, y: cy + Math.sin(angle) * r };
  });
  const spokes = Array.from({ length: 8 }, (_, i) => {
    const angle = (i / 8) * Math.PI * 2;
    const r = size * 0.3;
    return { x2: cx + Math.cos(angle) * r, y2: cy + Math.sin(angle) * r };
  });

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} fill="none" aria-hidden="true">
      {ringRadii.map((r, i) => (
        <circle key={r} cx={cx} cy={cy} r={r} stroke="white" strokeWidth={i === 0 ? 1.5 : 1} />
      ))}
      {spokes.map((s, i) => (
        <line key={i} x1={cx} y1={cy} x2={s.x2} y2={s.y2} stroke="white" strokeWidth={1} />
      ))}
      {petals.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r={size * 0.018} fill="white" />
      ))}
      <circle cx={cx} cy={cy} r={size * 0.045} stroke="white" strokeWidth={1.5} />
    </svg>
  );
}

interface ContentCardProps {
  gradient: string;
  badge?: string;
  overlayTitle?: ReactNode;
  motifSeed?: number;
  disabled?: boolean;
  aspectClassName?: string;
  children: ReactNode;
  "data-testid"?: string;
}

export function ContentCard({
  gradient,
  badge,
  overlayTitle,
  motifSeed = 0,
  disabled,
  aspectClassName = "aspect-[16/10]",
  children,
  ...rest
}: ContentCardProps) {
  const rotation = (motifSeed * 47) % 360;

  return (
    <div
      className={cn(
        "bg-white border border-[#E5E2DF] rounded-2xl overflow-hidden h-full flex flex-col",
        disabled ? "opacity-60" : "group cursor-pointer hover:-translate-y-1 hover:shadow-lg transition-all duration-300"
      )}
      {...rest}
    >
      <div className={cn("relative w-full overflow-hidden shrink-0", aspectClassName)} style={{ background: gradient }}>
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(120% 120% at 12% 8%, rgba(255,255,255,0.12) 0%, transparent 45%), radial-gradient(140% 140% at 100% 100%, rgba(0,0,0,0.28) 0%, transparent 55%)',
          }}
        />
        <div className="absolute inset-0 texture-grain" />
        <div className="absolute -bottom-12 -right-12" style={{ opacity: 0.16, transform: `rotate(${rotation}deg)` }}>
          <MandalaMotif size={260} />
        </div>
        {badge && (
          <div className="absolute top-4 left-4 font-inter text-[11px] font-semibold tracking-wide text-white/95 bg-black/20 backdrop-blur-sm px-2.5 py-1 rounded-full">
            {badge}
          </div>
        )}
        {overlayTitle && (
          <div className="absolute inset-0 flex items-end p-5">
            <div className="font-playfair text-xl md:text-2xl text-white drop-shadow-md leading-snug">
              {overlayTitle}
            </div>
          </div>
        )}
      </div>
      <div className="p-6 flex flex-col flex-1">{children}</div>
    </div>
  );
}
