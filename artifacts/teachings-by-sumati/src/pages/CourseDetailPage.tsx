import { useParams, Link } from "wouter";
import { ArrowLeft, ExternalLink, CheckCircle2, Radio } from "lucide-react";
import { AnimatedSection } from "@/components/AnimatedSection";
import { useLanguage } from "@/components/layout/LanguageContext";
import { useT } from "@/i18n/translations";
import type { CoursesData } from "@/data/types";
import coursesRaw from "@/data/courses.json";
import { useProgress } from "@/hooks/useProgress";

const coursesData = coursesRaw as CoursesData;

export default function CourseDetailPage() {
  const { courseId } = useParams();
  const { lang } = useLanguage();
  const t = useT();
  
  const course = coursesData.courses.find(c => c.id === courseId);
  const { isWatched, watchedCount } = useProgress(courseId ?? '');

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center text-center px-6">
        <div>
          <h1 className="font-playfair text-3xl mb-4">{t.courses.courseNotFound}</h1>
          <Link href="/aci-courses" className="text-[#7A1B2E] hover:underline font-inter">
            &larr; {t.common.backToCourses}
          </Link>
        </div>
      </div>
    );
  }

  const title = lang === 'en' ? course.title_en : (course.title_ru || course.title_en);
  const subtitle = lang === 'en' ? course.title_ru : course.title_en;
  const badgeText = course.number > 0 ? `ACI ${course.number}` : t.badge.special;

  const sortedClasses = [...(course.classes || [])].sort((a, b) => {
    if (a.class_number === 'review') return 1;
    if (b.class_number === 'review') return -1;
    return Number(a.class_number) - Number(b.class_number);
  });

  return (
    <div className="min-h-screen bg-white pb-24">
      {/* Course Header */}
      <div className="bg-[#F8F6F4] pt-8 pb-12 px-6 rounded-b-[24px] mb-12">
        <div className="max-w-[800px] mx-auto">
          <Link href="/aci-courses" className="inline-flex items-center gap-2 text-[#6B6B6B] hover:text-[#1A1A1A] font-inter text-sm mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4" /> {t.common.backToCourses}
          </Link>
          
          <div className="space-y-4">
            <div className="inline-block bg-white border border-[#E5E2DF] px-3 py-1 rounded-full text-[#7A1B2E] font-inter text-xs font-bold tracking-wider">
              {badgeText}
            </div>
            <h1 className="font-playfair text-3xl md:text-[40px] leading-tight text-[#1A1A1A]">
              {title}
            </h1>
            {subtitle && (
              <p className="font-inter text-lg text-[#6B6B6B]">
                {subtitle}
              </p>
            )}
            
            <div className="flex flex-wrap gap-4 pt-4 border-t border-[#E5E2DF] mt-6">
              <div className="flex-1 min-w-0 space-y-2">
                <div className="font-inter text-sm text-[#1A1A1A] font-medium">
                  {t.courses.classesCount(course.total_classes ?? 0, !!course.has_review)}
                </div>
                {sortedClasses.length > 0 && (
                  <div className="space-y-1.5">
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
                        className="bg-[#7A1B2E] h-1.5 rounded-full transition-all duration-500"
                        style={{ width: `${sortedClasses.length > 0 ? (watchedCount / sortedClasses.length) * 100 : 0}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>
              
              <div className="flex gap-3 ml-auto">
                {course.platform_en && (
                  <a 
                    href={course.platform_en} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm font-inter text-[#7A1B2E] hover:text-[#5C0E1F] bg-white border border-[#7A1B2E]/20 px-4 py-2 rounded-lg transition-colors"
                  >
                    {t.platform.eng} <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
                {course.platform_ru && (
                  <a 
                    href={course.platform_ru} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm font-inter text-[#7A1B2E] hover:text-[#5C0E1F] bg-white border border-[#7A1B2E]/20 px-4 py-2 rounded-lg transition-colors"
                  >
                    {t.platform.rus} <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Classes List */}
      <div className="max-w-[800px] mx-auto px-6">
        {course.liveOnly ? (
          <div className="text-center py-20 bg-[#F8F6F4] rounded-2xl border border-[#E5E2DF] border-dashed">
            <div className="w-12 h-12 rounded-full bg-[#7A1B2E]/10 flex items-center justify-center mx-auto mb-4">
              <Radio className="w-6 h-6 text-[#7A1B2E]" />
            </div>
            <div className="font-playfair text-xl text-[#1A1A1A] mb-2">{t.courses.liveOnlyTitle}</div>
            <p className="font-inter text-sm text-[#9A9A9A]">{t.courses.liveOnlyDesc}</p>
          </div>
        ) : sortedClasses.length > 0 ? (
          <div className="space-y-3">
            {sortedClasses.map((cls, idx) => {
              const isReview = cls.class_number === 'review';
              const classLabel = isReview ? t.courses.reviewClass : t.courses.classLabel(cls.class_number);
              
              return (
                <AnimatedSection key={cls.class_number} delay={idx * 0.05}>
                  <Link
                    href={`/aci-courses/${course.id}/class-${cls.class_number}`}
                    className="block rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7A1B2E] focus-visible:ring-offset-2"
                  >
                    <div className={`group rounded-xl p-5 md:p-6 flex items-center justify-between cursor-pointer hover:shadow-md transition-all duration-300 border ${isWatched(cls.class_number) ? 'bg-[#F8F6F4] border-[#E5E2DF]' : 'bg-white border-[#E5E2DF]'}`} style={{ borderLeft: `4px solid ${isReview ? '#C4973B' : '#7A1B2E'}` }}>
                      <div className="flex items-center gap-3 min-w-0">
                        {isWatched(cls.class_number) ? (
                          <CheckCircle2 className="w-4 h-4 text-[#7A1B2E] shrink-0" />
                        ) : (
                          <div className="w-4 h-4 rounded-full border-2 border-[#D4D0CC] shrink-0" />
                        )}
                        <div className={`font-inter text-base font-medium ${isWatched(cls.class_number) ? 'text-[#6B6B6B]' : 'text-[#1A1A1A]'}`}>
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
        ) : (
          <div className="text-center py-20 bg-[#F8F6F4] rounded-2xl border border-[#E5E2DF] border-dashed">
            <div className="font-playfair text-xl text-[#6B6B6B] mb-2">{t.courses.classesComingSoon}</div>
            <p className="font-inter text-sm text-[#9A9A9A]">{t.courses.materialsBeingPrepared}</p>
          </div>
        )}
      </div>
    </div>
  );
}
