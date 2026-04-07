import { useState, useRef, useEffect } from "react";
import { useParams, Link, useLocation } from "wouter";
import { ArrowLeft, ChevronLeft, ChevronRight, ExternalLink, ChevronDown, ChevronUp } from "lucide-react";
import { AnimatedSection } from "@/components/AnimatedSection";
import { useLanguage } from "@/components/layout/LanguageContext";
import { useT } from "@/i18n/translations";
import type { CoursesData } from "@/data/types";
import coursesRaw from "@/data/courses.json";

const coursesData = coursesRaw as CoursesData;

export default function ClassPage() {
  const { courseId, classId } = useParams();
  const { lang, setLang } = useLanguage();
  const t = useT();
  const [, setLocation] = useLocation();
  const [isTranscriptOpen, setIsTranscriptOpen] = useState(false);
  
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

    if (diff > 50 && nextClass) {
      navigateToClass(nextClass.class_number);
    } else if (diff < -50 && prevClass) {
      navigateToClass(prevClass.class_number);
    }
    touchStartX.current = null;
  };

  const videoUrl = lang === 'en' ? classData.video_en : classData.video_ru;
  const videoEmbedUrl = videoUrl ? videoUrl.replace('youtu.be/', 'youtube.com/embed/') : null;

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
              aria-label="Previous class"
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
              aria-label="Next class"
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
          <div className="flex justify-center mb-6">
            <div className="flex bg-[#F8F6F4] p-1 rounded-xl">
              <button 
                onClick={() => setLang('en')}
                className={`px-6 py-2 rounded-lg font-inter text-sm font-medium transition-all ${lang === 'en' ? 'bg-[#7A1B2E] text-white shadow-sm' : 'text-[#6B6B6B] hover:text-[#1A1A1A]'}`}
              >
                🇬🇧 English
              </button>
              <button 
                onClick={() => setLang('ru')}
                className={`px-6 py-2 rounded-lg font-inter text-sm font-medium transition-all ${lang === 'ru' ? 'bg-[#7A1B2E] text-white shadow-sm' : 'text-[#6B6B6B] hover:text-[#1A1A1A]'}`}
              >
                🇷🇺 Русский
              </button>
            </div>
          </div>

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
        </AnimatedSection>

        {/* Materials */}
        <AnimatedSection delay={0.2} className="space-y-6">
          <h2 className="font-inter text-xl font-medium text-[#1A1A1A]">{t.classPage.classMaterials}</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[t.classPage.studentNotes, t.classPage.reading, t.classPage.homework].map((label) => (
              <div key={label} className="bg-white border border-[#E5E2DF] rounded-xl p-4 flex gap-4 items-center">
                <div className="w-11 h-[52px] bg-[#F8F6F4] rounded-md flex flex-col items-center justify-center text-[#7A1B2E] font-bold text-[10px] shrink-0 border border-[#E5E2DF]">
                  PDF
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-inter text-sm font-medium text-[#1A1A1A] truncate">{label}</div>
                  <div className="font-inter text-[11px] text-[#9A9A9A]">200 KB</div>
                </div>
                <button className="shrink-0 p-2 text-[#7A1B2E] hover:bg-[#F8F6F4] rounded-lg transition-colors">
                  <ExternalLink className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </AnimatedSection>

        {/* Transcript */}
        <AnimatedSection delay={0.3}>
          <div className="border border-[#E5E2DF] rounded-2xl overflow-hidden bg-white">
            <button 
              onClick={() => setIsTranscriptOpen(!isTranscriptOpen)}
              className="w-full px-6 py-5 flex items-center justify-between bg-[#F8F6F4] hover:bg-[#F0EDEA] transition-colors"
            >
              <span className="font-inter text-base font-medium text-[#1A1A1A]">{t.classPage.transcript}</span>
              {isTranscriptOpen ? <ChevronUp className="w-5 h-5 text-[#6B6B6B]" /> : <ChevronDown className="w-5 h-5 text-[#6B6B6B]" />}
            </button>
            
            {isTranscriptOpen && (
              <div className="p-6 md:p-8 font-inter text-sm md:text-base text-[#4A4A4A] leading-loose space-y-6">
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </p>
                <p>
                  Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </p>
              </div>
            )}
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
}
