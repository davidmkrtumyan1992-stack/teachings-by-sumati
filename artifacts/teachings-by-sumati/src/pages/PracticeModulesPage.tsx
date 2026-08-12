import { Link } from "wouter";
import { AnimatedSection } from "@/components/AnimatedSection";
import { ContentCard } from "@/components/ui/ContentCard";
import { useT } from "@/i18n/translations";
import type { PracticeModulesData } from "@/data/types";
import modulesRaw from "@/data/practice-modules.json";

const modulesData = modulesRaw as PracticeModulesData;

export default function PracticeModulesPage() {
  const t = useT();

  return (
    <div className="min-h-screen bg-white pt-10 pb-24 px-6">
      <div className="max-w-[1200px] mx-auto">
        <AnimatedSection className="text-center mb-16">
          <h1 className="font-playfair text-3xl md:text-[42px] mb-4">{t.practiceModules.heading}</h1>
          <p className="font-inter text-[#6B6B6B] text-base max-w-2xl mx-auto">
            {t.practiceModules.subheading}
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {modulesData.map((mod, idx) => (
            <AnimatedSection key={mod.module} delay={idx * 0.07}>
              <Link
                href={`/practice-modules/${mod.module}`}
                className="block rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7A1B2E] focus-visible:ring-offset-2"
              >
                <ContentCard
                  gradient="linear-gradient(135deg, #5C0E1F 0%, #7A1B2E 100%)"
                  overlayTitle={<div className="text-xl md:text-2xl text-white/90 text-center tracking-wide">{mod.title}</div>}
                  motifSeed={idx}
                  data-testid={`module-card-${mod.module}`}
                >
                  <p className="font-inter text-[13px] text-[#9A9A9A] mb-4 leading-relaxed flex-1">
                    {mod.dateLabel}
                  </p>
                  <div className="font-inter text-sm font-medium text-[#7A1B2E] group-hover:translate-x-1 transition-transform">
                    {t.common.start} →
                  </div>
                </ContentCard>
              </Link>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </div>
  );
}
