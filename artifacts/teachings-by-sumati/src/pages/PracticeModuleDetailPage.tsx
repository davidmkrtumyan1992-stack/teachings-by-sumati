import { useParams, Link } from "wouter";
import { ArrowLeft } from "lucide-react";
import { AnimatedSection } from "@/components/AnimatedSection";
import { useT } from "@/i18n/translations";
import type { PracticeModulesData } from "@/data/types";
import modulesRaw from "@/data/practice-modules.json";

const modulesData = modulesRaw as PracticeModulesData;

export default function PracticeModuleDetailPage() {
  const { moduleId } = useParams();
  const t = useT();

  const mod = modulesData.find(m => m.module === moduleId);

  if (!mod) {
    return (
      <div className="min-h-screen flex items-center justify-center text-center px-6">
        <div>
          <h1 className="font-playfair text-3xl mb-4">{t.practiceModules.moduleNotFound}</h1>
          <Link href="/practice-modules" className="text-[#7A1B2E] hover:underline font-inter">
            &larr; {t.practiceModules.backToModules}
          </Link>
        </div>
      </div>
    );
  }

  const sortedClasses = [...mod.classes].sort((a, b) => a.classNumber - b.classNumber);

  return (
    <div className="min-h-screen bg-white pb-24">
      {/* Module Header */}
      <div className="bg-[#F8F6F4] pt-8 pb-12 px-6 rounded-b-[24px] mb-12">
        <div className="max-w-[800px] mx-auto">
          <Link
            href="/practice-modules"
            className="inline-flex items-center gap-2 text-[#6B6B6B] hover:text-[#1A1A1A] font-inter text-sm mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> {t.practiceModules.backToModules}
          </Link>

          <div className="space-y-3">
            <h1 className="font-playfair text-3xl md:text-[40px] leading-tight text-[#1A1A1A]">
              {mod.title}
            </h1>
            <p className="font-inter text-base text-[#6B6B6B]">{mod.dateLabel}</p>
            <div className="pt-4 border-t border-[#E5E2DF]">
              <div className="font-inter text-sm text-[#1A1A1A] font-medium py-2">
                {t.courses.classesCount(sortedClasses.length, false)}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Classes List */}
      <div className="max-w-[800px] mx-auto px-6">
        <div className="space-y-3">
          {sortedClasses.map((cls, idx) => {
            const classLabel = t.courses.classLabel(cls.classNumber);
            const isNotRecorded = cls.status === 'not_recorded_yet';

            return (
              <AnimatedSection key={cls.classNumber} delay={idx * 0.05}>
                <Link
                  href={`/practice-modules/${mod.module}/class-${cls.classNumber}`}
                  className="block rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7A1B2E] focus-visible:ring-offset-2"
                >
                  <div
                    className={`group bg-white border border-[#E5E2DF] rounded-xl p-5 md:p-6 flex items-center justify-between transition-all duration-300 ${isNotRecorded ? 'opacity-60 cursor-default' : 'cursor-pointer hover:shadow-md'}`}
                    style={{ borderLeft: '4px solid #7A1B2E' }}
                  >
                    <div>
                      <div className="font-inter text-[13px] font-bold text-[#7A1B2E] tracking-wide uppercase mb-1">
                        {classLabel}
                      </div>
                      {isNotRecorded && (
                        <div className="font-inter text-[12px] text-[#9A9A9A]">
                          {t.classPage.recordingComingSoon}
                        </div>
                      )}
                    </div>
                    {!isNotRecorded && (
                      <div className="font-inter text-sm font-medium text-[#7A1B2E] group-hover:translate-x-1 transition-transform">
                        {t.common.start} &rarr;
                      </div>
                    )}
                  </div>
                </Link>
              </AnimatedSection>
            );
          })}
        </div>
      </div>
    </div>
  );
}
