import { useParams, Link } from "wouter";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { AnimatedSection } from "@/components/AnimatedSection";
import { useT } from "@/i18n/translations";
import type { PracticeModulesData } from "@/data/types";
import modulesRaw from "@/data/practice-modules.json";
import { useProgress } from "@/hooks/useProgress";

const modulesData = modulesRaw as PracticeModulesData;

export default function PracticeModuleDetailPage() {
  const { moduleId } = useParams();
  const t = useT();

  const mod = modulesData.find(m => m.module === moduleId);
  const { isWatched, watchedCount } = useProgress(moduleId ?? '');

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

  const sortedClasses = [...mod.classes]
    .filter(c => c.status !== 'not_recorded_yet')
    .sort((a, b) => a.classNumber - b.classNumber);

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
            <div className="pt-4 border-t border-[#E5E2DF] space-y-2">
              <div className="font-inter text-sm text-[#1A1A1A] font-medium">
                {t.courses.classesCount(sortedClasses.length, false)}
              </div>
              {sortedClasses.length > 0 && (
                <div className="space-y-1.5 max-w-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-inter text-xs text-[#6B6B6B]">
                      {watchedCount === sortedClasses.length
                        ? t.progress.allDone
                        : t.progress.watched(watchedCount, sortedClasses.length)}
                    </span>
                    {watchedCount === sortedClasses.length && (
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#7A1B2E]" />
                    )}
                  </div>
                  <div className="w-full bg-[#E5E2DF] rounded-full h-1.5 overflow-hidden">
                    <div
                      className="bg-[#7A1B2E] h-1.5 rounded-full transition-all duration-500 ease-premium"
                      style={{ width: `${(watchedCount / sortedClasses.length) * 100}%` }}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Classes List */}
      <div className="max-w-[800px] mx-auto px-6">
        <div className="space-y-3">
          {sortedClasses.map((cls, idx) => {
            const classLabel = t.courses.classLabel(cls.classNumber);

            return (
              <AnimatedSection key={cls.classNumber} delay={idx * 0.05}>
                <Link
                  href={`/practice-modules/${mod.module}/class-${cls.classNumber}`}
                  className="block rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7A1B2E] focus-visible:ring-offset-2"
                >
                  <div
                    className={`group rounded-xl p-5 md:p-6 flex items-center justify-between cursor-pointer hover:shadow-md transition-all duration-300 ease-premium border ${isWatched(cls.classNumber) ? 'bg-[#F8F6F4] border-[#E5E2DF]' : 'bg-white border-[#E5E2DF]'}`}
                    style={{ borderLeft: '4px solid #7A1B2E' }}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      {isWatched(cls.classNumber) ? (
                        <CheckCircle2 className="w-4 h-4 text-[#7A1B2E] shrink-0" />
                      ) : (
                        <div className="w-4 h-4 rounded-full border-2 border-[#D4D0CC] shrink-0" />
                      )}
                      <div className={`font-inter text-[13px] font-bold tracking-wide uppercase ${isWatched(cls.classNumber) ? 'text-[#6B6B6B]' : 'text-[#7A1B2E]'}`}>
                        {classLabel}
                      </div>
                    </div>
                    <div className="font-inter text-sm font-medium text-[#7A1B2E] group-hover:translate-x-1 transition-transform shrink-0 ml-4">
                      {t.common.start} &rarr;
                    </div>
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
