import { ArrowRight } from "lucide-react";
import { AnimatedSection } from "@/components/AnimatedSection";
import { ContentCard } from "@/components/ui/ContentCard";
import { useLanguage } from "@/components/layout/LanguageContext";
import { useT } from "@/i18n/translations";
import type { CoursesData } from "@/data/types";
import coursesRaw from "@/data/courses.json";

const coursesData = coursesRaw as CoursesData;

export default function ProjectsPage() {
  const { lang } = useLanguage();
  const t = useT();

  return (
    <div className="min-h-screen bg-white pt-10 pb-24 px-6">
      <div className="max-w-[1200px] mx-auto">
        <AnimatedSection className="text-center mb-16">
          <h1 className="font-playfair text-3xl md:text-[42px] mb-4">{t.projects.heading}</h1>
          <p className="font-inter text-[#6B6B6B] text-base max-w-2xl mx-auto">
            {t.projects.subheading}
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {(coursesData.projects ?? []).map((project, idx) => {
            const gradients = [
              'linear-gradient(135deg, #7A1B2E 0%, #C4973B 100%)',
              'linear-gradient(135deg, #1A1A1A 0%, #7A1B2E 100%)',
              'linear-gradient(135deg, #5C0E1F 0%, #1A1A1A 100%)'
            ];
            const bgGradient = gradients[idx % gradients.length];
            
            const title = lang === 'en' ? project.title_en : (project.title_ru || project.title_en);
            const desc = lang === 'en' ? project.description_en : (project.description_ru || project.description_en);

            const CardContent = (
              <ContentCard
                gradient={bgGradient}
                overlayTitle={<h3 className="text-2xl">{title}</h3>}
                motifSeed={idx}
                disabled={!project.url}
                aspectClassName="aspect-[16/9]"
                data-testid={`project-card-${project.id}`}
              >
                <p className="font-inter text-sm text-[#6B6B6B] leading-relaxed mb-6 flex-1">
                  {desc}
                </p>
                {project.url ? (
                  <div className="font-inter text-sm font-medium text-[#7A1B2E] flex items-center gap-1 group-hover:gap-2 transition-all">
                    {t.projects.visitSite} <ArrowRight className="w-4 h-4" />
                  </div>
                ) : (
                  <div className="font-inter text-sm font-medium text-[#9A9A9A]">
                    {t.projects.comingSoon}
                  </div>
                )}
              </ContentCard>
            );

            return (
              <AnimatedSection key={project.id} delay={idx * 0.1}>
                {project.url ? (
                  <a href={project.url} target="_blank" rel="noopener noreferrer" className="block h-full rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7A1B2E] focus-visible:ring-offset-2" data-testid={`project-page-link-${project.id}`}>
                    {CardContent}
                  </a>
                ) : (
                  <div className="block h-full" data-testid={`project-page-link-${project.id}`}>
                    {CardContent}
                  </div>
                )}
              </AnimatedSection>
            );
          })}
        </div>
      </div>
    </div>
  );
}
