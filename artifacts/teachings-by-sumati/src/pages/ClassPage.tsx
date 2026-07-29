import { useRef } from "react";
import { useParams, Link, useLocation } from "wouter";
import { ArrowLeft, ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import { AnimatedSection } from "@/components/AnimatedSection";
import { useLanguage } from "@/components/layout/LanguageContext";
import { useT } from "@/i18n/translations";
import type { CoursesData } from "@/data/types";
import coursesRaw from "@/data/courses.json";
import materialsManifestRaw from "@/data/materials-manifest.json";

const coursesData = coursesRaw as CoursesData;

type MaterialKey = 'notes' | 'reading' | 'homework';
type CourseMaterials = Partial<Record<MaterialKey, string>>;
type ManifestEntry = { en?: CourseMaterials; ru?: CourseMaterials };
const materialsManifest = materialsManifestRaw as Record<string, ManifestEntry>;

export default function ClassPage() {
  const { courseId, classId } = useParams();
  const { lang, setLang } = useLanguage();
  const t = useT();
  const [, setLocation] = useLocation();

  const classNumber = classId?.startsWith('class-') ? classId.slice(6) : classId;

  const course = coursesData.courses.find(c => c.id === courseId);
  const classData = course?.classes?.find(c => String(c.class_number) === classNumber);

  const touchStartX = useRef<number | null>(null);

  if (!course || !classData) {
    return (
      <div className="min-h-screen flex items-center justify-center text-center px-6">
        <div>
          <h1 className="font-playfair text-3xl mb-4">{t.courses.classNotFound}</h1>
          <Link href={`/aci-courses/${courseId}`} className="text-[#7A1B2E] hover:underline font-inter">
            &larr; {t.common.backToCourses}
          </Link>
        </div>
      </div>
    );
  }

  const isReview = classNumber === 'review';
  const classLabel = isReview ? t.courses.reviewClass : t.courses.classLabel(classNumber ?? '');
  const courseTitle = lang === 'en' ? course.title_en : (course.title_ru || course.title_en);

  const sortedClasses = [...(course.classes || [])].sort((a, b) => {
    if (a.class_number === 'review') return 1;
    if (b.class_number === 'review') return -1;
    return Number(a.class_number) - Number(b.class_number);
  });

  const currentIndex = sortedClasses.findIndex(c => String(c.class_number) === classNumber);
  const prevClass = currentIndex > 0 ? sortedClasses[currentIndex - 1] : null;
  const nextClass = currentIndex < sortedClasses.length - 1 ? sortedClasses[currentIndex + 1] : null;

  const navigateToClass = (num: string | number) => {
    setLocation(`/aci-courses/${course.id}/class-${num}`);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;
    if (diff > 50 && nextClass) navigateToClass(nextClass.class_number);
    else if (diff < -50 && prevClass) navigateToClass(prevClass.class_number);
    touchStartX.current = null;
  };

  // Determine which language versions are available
  const hasEN = !!classData.video_en;
  const hasRU = !!classData.video_ru;
  const isNotRecorded = classData.status === 'not_recorded_yet';

  // Effective language: if the selected language has no video, fall back to the other
  const effectiveLang: 'en' | 'ru' =
    !hasEN && hasRU ? 'ru' :
    !hasRU && hasEN ? 'en' :
    lang;

  const videoUrl = effectiveLang === 'en' ? classData.video_en : classData.video_ru;
  const videoEmbedUrl = videoUrl ? videoUrl.replace('youtu.be/', 'youtube.com/embed/') : null;

  // PDF materials — course-level (same set for all classes within a course)
  const courseManifest = materialsManifest[course.id];
  const hasMaterials = !!courseManifest;
  const enMaterials: CourseMaterials = courseManifest?.en ?? {};
  const ruMaterials: CourseMaterials = courseManifest?.ru ?? {};
  const noRuAtAll = hasMaterials && Object.keys(ruMaterials).length === 0;

  const getMaterial = (type: MaterialKey): { url: string | null; fallbackToEn: boolean; unavailable: boolean } => {
    const base = import.meta.env.BASE_URL;
    if (!courseManifest) return { url: null, fallbackToEn: false, unavailable: true };

    if (effectiveLang === 'en') {
      const file = enMaterials[type];
      return file
        ? { url: `${base}materials/${file}`, fallbackToEn: false, unavailable: false }
        : { url: null, fallbackToEn: false, unavailable: true };
    }

    // RU selected
    if (noRuAtAll) {
      // ACI-6: no RU materials at all — fall back to EN with badge
      const file = enMaterials[type];
      return file
        ? { url: `${base}materials/${file}`, fallbackToEn: true, unavailable: false }
        : { url: null, fallbackToEn: false, unavailable: true };
    }

    // RU has some materials but this specific type may be missing (e.g. ACI-1 reading)
    const file = ruMaterials[type];
    return file
      ? { url: `${base}materials/${file}`, fallbackToEn: false, unavailable: false }
      : { url: null, fallbackToEn: false, unavailable: true };
  };

  const materialItems: Array<{ type: MaterialKey; label: string }> = [
    { type: 'notes', label: t.classPage.studentNotes },
    { type: 'reading', label: t.classPage.reading },
    { type: 'homework', label: t.classPage.homework },
  ];

  return (
    <div
      className="min-h-screen bg-white pb-24"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Top Bar */}
      <div className="bg-white border-b border-[#E5E2DF] py-4 px-4 sticky top-14 md:top-16 z-20">
        <div className="max-w-[1000px] mx-auto flex items-center justify-between">
          <Link href={`/aci-courses/${course.id}`} className="text-[#6B6B6B] hover:text-[#1A1A1A] transition-colors p-2 rounded-lg hover:bg-gray-50 md:hidden">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <Link href={`/aci-courses/${course.id}`} className="hidden md:flex items-center gap-2 text-[#6B6B6B] hover:text-[#1A1A1A] font-inter text-sm transition-colors">
            <ArrowLeft className="w-4 h-4" /> {t.classPage.backTo(courseTitle)}
          </Link>

          <div className="flex items-center gap-2">
            <button
              onClick={() => prevClass && navigateToClass(prevClass.class_number)}
              disabled={!prevClass}
              className={`p-2 rounded-lg border border-[#E5E2DF] transition-colors ${prevClass ? 'hover:bg-[#F0EDEA] text-[#1A1A1A]' : 'opacity-50 cursor-not-allowed text-[#9A9A9A]'}`}
              aria-label={t.aria.prevClass}
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="font-inter text-sm text-[#6B6B6B] px-2 whitespace-nowrap">
              {currentIndex + 1} / {sortedClasses.length}
            </div>
            <button
              onClick={() => nextClass && navigateToClass(nextClass.class_number)}
              disabled={!nextClass}
              className={`p-2 rounded-lg border border-[#E5E2DF] transition-colors ${nextClass ? 'hover:bg-[#F0EDEA] text-[#1A1A1A]' : 'opacity-50 cursor-not-allowed text-[#9A9A9A]'}`}
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
            /* "Not recorded yet" placeholder */
            <div className="w-full aspect-video bg-[#F8F6F4] rounded-2xl overflow-hidden shadow-[0_20px_40px_rgba(0,0,0,0.06)] border border-[#E5E2DF] flex flex-col items-center justify-center gap-3">
              <div className="w-12 h-12 rounded-full bg-[#7A1B2E]/10 flex items-center justify-center mb-1">
                <svg className="w-6 h-6 text-[#7A1B2E]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2m6-2a10 10 0 11-20 0 10 10 0 0120 0z" />
                </svg>
              </div>
              <p className="font-inter text-base font-medium text-[#1A1A1A]">
                {lang === 'ru' ? 'Запись появится позже' : 'Recording coming soon'}
              </p>
              <p className="font-inter text-sm text-[#9A9A9A]">
                {lang === 'ru' ? 'Эта запись ещё не опубликована' : 'This recording has not been published yet'}
              </p>
            </div>
          ) : (
            <>
              {/* Language switcher — only shown when at least one language is available */}
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

        {/* Materials — hidden for courses without PDFs (ACI 0, ACI 13–18) */}
        {hasMaterials && (
          <AnimatedSection delay={0.2} className="space-y-6">
            <h2 className="font-inter text-xl font-medium text-[#1A1A1A]">{t.classPage.classMaterials}</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {materialItems.map(({ type, label }) => {
                const mat = getMaterial(type);

                if (mat.unavailable) {
                  return (
                    <div key={type} className="bg-[#F8F6F4] border border-[#E5E2DF] rounded-xl p-4 flex gap-4 items-center opacity-60">
                      <div className="w-11 h-[52px] bg-white rounded-md flex flex-col items-center justify-center text-[#9A9A9A] font-bold text-[10px] shrink-0 border border-[#E5E2DF]">
                        PDF
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-inter text-sm font-medium text-[#6B6B6B] truncate">{label}</div>
                        <div className="font-inter text-[11px] text-[#9A9A9A]">{t.classPage.materialNotAvailableRu}</div>
                      </div>
                    </div>
                  );
                }

                return (
                  <a
                    key={type}
                    href={mat.url!}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white border border-[#E5E2DF] rounded-xl p-4 flex gap-4 items-center hover:border-[#7A1B2E]/40 hover:shadow-sm transition-all cursor-pointer group"
                  >
                    <div className="w-11 h-[52px] bg-[#F8F6F4] rounded-md flex flex-col items-center justify-center text-[#7A1B2E] font-bold text-[10px] shrink-0 border border-[#E5E2DF]">
                      PDF
                    </div>
                    <div className="flex-1 min-w-0 flex items-center gap-1.5">
                      <div className="font-inter text-sm font-medium text-[#1A1A1A] truncate">{label}</div>
                      {mat.fallbackToEn && (
                        <span className="shrink-0 text-[10px] font-semibold bg-[#F0EDEA] text-[#7A1B2E] px-1.5 py-0.5 rounded">
                          {t.classPage.materialEnglishBadge}
                        </span>
                      )}
                    </div>
                    <div className="shrink-0 p-2 text-[#7A1B2E] group-hover:bg-[#F8F6F4] rounded-lg transition-colors">
                      <ExternalLink className="w-4 h-4" />
                    </div>
                  </a>
                );
              })}
            </div>
          </AnimatedSection>
        )}
      </div>
    </div>
  );
}
