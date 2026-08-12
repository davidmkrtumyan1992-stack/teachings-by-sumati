import { useRef } from "react";
import { useParams, Link, useLocation } from "wouter";
import { ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";
import { AnimatedSection } from "@/components/AnimatedSection";
import { useLanguage } from "@/components/layout/LanguageContext";
import { useT } from "@/i18n/translations";
import type { PracticeModulesData } from "@/data/types";
import modulesRaw from "@/data/practice-modules.json";
import { toEmbedUrl } from "@/lib/youtube";

const modulesData = modulesRaw as PracticeModulesData;

export default function PracticeModuleClassPage() {
  const { moduleId, classId } = useParams();
  const { lang, setLang } = useLanguage();
  const t = useT();
  const [, setLocation] = useLocation();

  const classNumber = classId?.startsWith('class-')
    ? Number(classId.slice(6))
    : Number(classId);

  const mod = modulesData.find(m => m.module === moduleId);
  const classData = mod?.classes.find(c => c.classNumber === classNumber);

  const touchStartX = useRef<number | null>(null);

  if (!mod || !classData) {
    return (
      <div className="min-h-screen flex items-center justify-center text-center px-6">
        <div>
          <h1 className="font-playfair text-3xl mb-4">{t.courses.classNotFound}</h1>
          <Link href={`/practice-modules/${moduleId}`} className="text-[#7A1B2E] hover:underline font-inter">
            &larr; {t.practiceModules.backToModules}
          </Link>
        </div>
      </div>
    );
  }

  const sortedClasses = [...mod.classes].sort((a, b) => a.classNumber - b.classNumber);
  const currentIndex = sortedClasses.findIndex(c => c.classNumber === classNumber);
  const prevClass = currentIndex > 0 ? sortedClasses[currentIndex - 1] : null;
  const nextClass = currentIndex < sortedClasses.length - 1 ? sortedClasses[currentIndex + 1] : null;

  const navigateToClass = (num: number) => {
    setLocation(`/practice-modules/${mod.module}/class-${num}`);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (diff > 50 && nextClass) navigateToClass(nextClass.classNumber);
    else if (diff < -50 && prevClass) navigateToClass(prevClass.classNumber);
    touchStartX.current = null;
  };

  const isNotRecorded = classData.status === 'not_recorded_yet';
  const hasEN = !!classData.videoEN;
  const hasRU = !!classData.videoRU;

  const effectiveLang: 'en' | 'ru' =
    !hasEN && hasRU ? 'ru' :
    !hasRU && hasEN ? 'en' :
    lang;

  const videoUrl = effectiveLang === 'en' ? classData.videoEN : classData.videoRU;
  const videoEmbedUrl = toEmbedUrl(videoUrl, lang);
  const classLabel = t.courses.classLabel(classNumber);

  return (
    <div
      className="min-h-screen bg-white pb-24"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Top Bar */}
      <div className="bg-white border-b border-[#E5E2DF] py-4 px-4 sticky top-14 md:top-16 z-20">
        <div className="max-w-[1000px] mx-auto flex items-center justify-between">
          <Link
            href={`/practice-modules/${mod.module}`}
            className="text-[#6B6B6B] hover:text-[#1A1A1A] transition-colors p-2 rounded-lg hover:bg-gray-50 md:hidden"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <Link
            href={`/practice-modules/${mod.module}`}
            className="hidden md:flex items-center gap-2 text-[#6B6B6B] hover:text-[#1A1A1A] font-inter text-sm transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> {t.classPage.backTo(mod.title)}
          </Link>

          <div className="flex items-center gap-2">
            <button
              onClick={() => prevClass && navigateToClass(prevClass.classNumber)}
              disabled={!prevClass}
              className={`p-2 rounded-lg border border-[#E5E2DF] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7A1B2E] focus-visible:ring-offset-2 ${prevClass ? 'hover:bg-[#F0EDEA] text-[#1A1A1A]' : 'opacity-50 cursor-not-allowed text-[#9A9A9A]'}`}
              aria-label={t.aria.prevClass}
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="font-inter text-sm text-[#6B6B6B] px-2 whitespace-nowrap">
              {currentIndex + 1} / {sortedClasses.length}
            </div>
            <button
              onClick={() => nextClass && navigateToClass(nextClass.classNumber)}
              disabled={!nextClass}
              className={`p-2 rounded-lg border border-[#E5E2DF] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7A1B2E] focus-visible:ring-offset-2 ${nextClass ? 'hover:bg-[#F0EDEA] text-[#1A1A1A]' : 'opacity-50 cursor-not-allowed text-[#9A9A9A]'}`}
              aria-label={t.aria.nextClass}
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-[1000px] mx-auto px-6 mt-12 space-y-12">
        <AnimatedSection className="text-center max-w-[640px] mx-auto">
          <h1 className="font-playfair text-3xl md:text-[36px] text-[#1A1A1A]">
            {classLabel}
          </h1>
        </AnimatedSection>

        {/* Video Section */}
        <AnimatedSection delay={0.1}>
          {isNotRecorded ? (
            <div className="w-full aspect-video bg-[#F8F6F4] rounded-2xl overflow-hidden shadow-[0_20px_40px_rgba(0,0,0,0.06)] border border-[#E5E2DF] flex flex-col items-center justify-center gap-3">
              <div className="w-12 h-12 rounded-full bg-[#7A1B2E]/10 flex items-center justify-center mb-1">
                <svg className="w-6 h-6 text-[#7A1B2E]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2m6-2a10 10 0 11-20 0 10 10 0 0120 0z" />
                </svg>
              </div>
              <p className="font-inter text-base font-medium text-[#1A1A1A]">
                {t.classPage.recordingComingSoon}
              </p>
              <p className="font-inter text-sm text-[#9A9A9A]">
                {t.classPage.recordingNotPublished}
              </p>
            </div>
          ) : (
            <>
              {/* Language switcher */}
              {(hasEN || hasRU) && (
                <div className="flex justify-center mb-6">
                  <div className="flex bg-[#F8F6F4] p-1 rounded-xl">
                    {hasEN && (
                      <button
                        onClick={() => setLang('en')}
                        className={`px-6 py-2 rounded-lg font-inter text-sm font-medium transition-all ${effectiveLang === 'en' ? 'bg-[#7A1B2E] text-white shadow-sm' : 'text-[#6B6B6B] hover:text-[#1A1A1A]'}`}
                      >
                        🇬🇧 {t.langLabels.en}
                      </button>
                    )}
                    {hasRU && (
                      <button
                        onClick={() => setLang('ru')}
                        className={`px-6 py-2 rounded-lg font-inter text-sm font-medium transition-all ${effectiveLang === 'ru' ? 'bg-[#7A1B2E] text-white shadow-sm' : 'text-[#6B6B6B] hover:text-[#1A1A1A]'}`}
                      >
                        🇷🇺 {t.langLabels.ru}
                      </button>
                    )}
                  </div>
                </div>
              )}

              <div className="w-full aspect-video bg-black rounded-2xl overflow-hidden shadow-[0_20px_40px_rgba(0,0,0,0.1)] border border-[#E5E2DF]">
                {videoEmbedUrl ? (
                  <iframe
                    src={videoEmbedUrl}
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center text-[#9A9A9A] bg-[#F8F6F4]">
                    <p className="font-inter">{t.classPage.noVideo}</p>
                  </div>
                )}
              </div>
            </>
          )}
        </AnimatedSection>
      </div>
    </div>
  );
}
