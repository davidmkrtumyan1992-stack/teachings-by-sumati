import { useParams, Link } from "wouter";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { AnimatedSection } from "@/components/AnimatedSection";
import { useLanguage } from "@/components/layout/LanguageContext";
import { useT } from "@/i18n/translations";
import type { CoursesData } from "@/data/types";
import coursesRaw from "@/data/courses.json";

const coursesData = coursesRaw as CoursesData;

export default function CourseDetailPage() {
  const { courseId } = useParams();
  const { lang } = useLanguage();
  const t = useT();
  
  const course = coursesData.courses.find(c => c.id === courseId);

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
              <div className="font-inter text-sm text-[#1A1A1A] font-medium py-2">
                {t.courses.classesCount(course.total_classes ?? 0, !!course.has_review)}
              </div>
              
              <div className="flex gap-3 ml-auto">
                {course.platform_en && (
                  <a 
                    href={course.platform_en} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm font-inter text-[#7A1B2E] hover:text-[#5C0E1F] bg-white border border-[#7A1B2E]/20 px-4 py-2 rounded-lg transition-colors"
                  >
                    ACI Platform ENG <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
                {course.platform_ru && (
                  <a 
                    href={course.platform_ru} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm font-inter text-[#7A1B2E] hover:text-[#5C0E1F] bg-white border border-[#7A1B2E]/20 px-4 py-2 rounded-lg transition-colors"
                  >
                    ACI Platform RUS <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Classes List */}
      <div className="max-w-[800px] mx-auto px-6">
        {sortedClasses.length > 0 ? (
          <div className="space-y-3">
            {sortedClasses.map((cls, idx) => {
              const isReview = cls.class_number === 'review';
              const classLabel = isReview ? t.courses.reviewClass : t.courses.classLabel(cls.class_number);
              
              return (
                <AnimatedSection key={cls.class_number} delay={idx * 0.05}>
                  <Link href={`/aci-courses/${course.id}/class-${cls.class_number}`}>
                    <div className="group bg-white border border-[#E5E2DF] rounded-xl p-5 md:p-6 flex items-center justify-between cursor-pointer hover:shadow-md hover:border-[#E5E2DF] transition-all duration-300" style={{ borderLeft: `4px solid ${isReview ? '#C4973B' : '#7A1B2E'}` }}>
                      <div>
                        <div className="font-inter text-[13px] font-bold text-[#7A1B2E] tracking-wide uppercase mb-1">
                          {classLabel}
                        </div>
                        <div className="font-inter text-base text-[#1A1A1A] font-medium">
                          {classLabel}
                        </div>
                      </div>
                      <div className="font-inter text-sm font-medium text-[#7A1B2E] group-hover:translate-x-1 transition-transform">
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
