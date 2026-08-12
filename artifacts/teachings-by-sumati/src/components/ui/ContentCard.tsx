import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Dharma wheel — ring, 8 spokes, hub. Foundational/path-oriented courses. */
function WheelMotif({ size }: { size: number }) {
  const cx = size / 2;
  const cy = size / 2;
  const spokes = Array.from({ length: 8 }, (_, i) => {
    const angle = (i / 8) * Math.PI * 2;
    const r = size * 0.34;
    return { x2: cx + Math.cos(angle) * r, y2: cy + Math.sin(angle) * r };
  });

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} fill="none" aria-hidden="true">
      <circle cx={cx} cy={cy} r={size * 0.42} stroke="white" strokeWidth={1.5} />
      {spokes.map((s, i) => (
        <line key={i} x1={cx} y1={cy} x2={s.x2} y2={s.y2} stroke="white" strokeWidth={1} />
      ))}
      <circle cx={cx} cy={cy} r={size * 0.07} stroke="white" strokeWidth={1.5} />
    </svg>
  );
}

/** Lotus — radial elongated petals, no spokes. Refuge/devotional courses. */
function LotusMotif({ size }: { size: number }) {
  const cx = size / 2;
  const cy = size / 2;
  const petalCount = 10;
  const petalLen = size * 0.38;
  const petalWidth = size * 0.1;

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} fill="none" aria-hidden="true">
      {Array.from({ length: petalCount }, (_, i) => {
        const angle = (i / petalCount) * 360;
        return (
          <ellipse
            key={i}
            cx={cx}
            cy={cy - petalLen * 0.55}
            rx={petalWidth}
            ry={petalLen}
            stroke="white"
            strokeWidth={1}
            transform={`rotate(${angle} ${cx} ${cy})`}
          />
        );
      })}
      <circle cx={cx} cy={cy} r={size * 0.06} fill="white" />
    </svg>
  );
}

/** Interlocking rings — three offset overlapping circles. Karma/interdependence themes. */
function RingsMotif({ size }: { size: number }) {
  const r = size * 0.26;
  const centers = [
    { x: size * 0.42, y: size * 0.42 },
    { x: size * 0.62, y: size * 0.42 },
    { x: size * 0.52, y: size * 0.6 },
  ];

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} fill="none" aria-hidden="true">
      {centers.map((c, i) => (
        <circle key={i} cx={c.x} cy={c.y} r={r} stroke="white" strokeWidth={1.25} />
      ))}
    </svg>
  );
}

const MOTIFS = [WheelMotif, LotusMotif, RingsMotif];
const CORNERS = [
  "-bottom-12 -right-12",
  "-top-12 -left-12",
  "-bottom-12 -left-12",
  "-top-12 -right-12",
];

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
  const Motif = MOTIFS[motifSeed % MOTIFS.length];
  const corner = CORNERS[motifSeed % CORNERS.length];
  const rotation = (motifSeed * 23) % 360;
  const motifSize = 220 + (motifSeed % 3) * 30;

  return (
    <div
      className={cn(
        "bg-white border border-[#E5E2DF] rounded-2xl overflow-hidden h-full flex flex-col",
        disabled ? "opacity-60" : "group cursor-pointer hover:-translate-y-1 hover:shadow-xl transition-all duration-300 ease-premium"
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
        <div className={cn("absolute", corner)} style={{ opacity: 0.18, transform: `rotate(${rotation}deg)` }}>
          <Motif size={motifSize} />
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
