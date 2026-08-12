import { Link } from "wouter";
import { AnimatedSection } from "@/components/AnimatedSection";
import { ContentCard } from "@/components/ui/ContentCard";
import { useLanguage } from "@/components/layout/LanguageContext";
import { useT } from "@/i18n/translations";
import type { CoursesData } from "@/data/types";
import coursesRaw from "@/data/courses.json";

const coursesData = coursesRaw as CoursesData;

export default function CoursesPage() {
  const { lang } = useLanguage();
  const t = useT();

  return (
    <div className="min-h-screen bg-white pt-10 pb-24 px-6">
      <div className="max-w-[1200px] mx-auto">
        <AnimatedSection className="text-center mb-16">
          <h1 className="font-playfair text-3xl md:text-[42px] mb-4">{t.courses.heading}</h1>
          <p className="font-inter text-[#6B6B6B] text-base max-w-2xl mx-auto">
            {t.courses.subheading}
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* number 0 ("source-of-all-my-good") is intentionally excluded — it's not
              yet ready to be featured and has no discoverable entry point on the site */}
          {coursesData.courses.filter(c => c.number > 0).map((course, idx) => {
            const title = lang === 'en' ? course.title_en : (course.title_ru || course.title_en);
            const badgeText = course.number > 0 ? `ACI ${course.number}` : t.badge.special;

            return (
              <AnimatedSection key={course.id} delay={(idx % 6) * 0.05}>
                <Link
                  href={`/aci-courses/${course.id}`}
                  className="block rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7A1B2E] focus-visible:ring-offset-2"
                >
                  <ContentCard
                    gradient="linear-gradient(135deg, #7A1B2E 0%, #C4973B 100%)"
                    overlayTitle={<div className="text-4xl md:text-5xl opacity-90 tracking-wider">{badgeText}</div>}
                    motifSeed={idx}
                    data-testid={`course-card-${course.id}`}
                  >
                    <div className="font-inter text-sm font-semibold text-[#7A1B2E] mb-2">{badgeText}</div>
                    <h3 className="font-inter text-base font-medium text-[#1A1A1A] leading-snug mb-6 flex-1">
                      {title}
                    </h3>

                    <div className="space-y-4">
                      <div className="flex gap-[2px]">
                        {Array.from({ length: 10 }).map((_, i) => (
                          <div
                            key={i}
                            className={`h-1.5 flex-1 rounded-sm ${i < (course.total_classes ?? 0) ? 'bg-[#7A1B2E]' : 'bg-[#E5E2DF]'}`}
                          />
                        ))}
                      </div>
                      <div className="font-inter text-sm text-[#7A1B2E] font-medium group-hover:underline">
                        {t.common.learnMore} &rarr;
                      </div>
                    </div>
                  </ContentCard>
                </Link>
              </AnimatedSection>
            );
          })}
        </div>
      </div>
    </div>
  );
}
