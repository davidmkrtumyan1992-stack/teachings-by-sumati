import { Link } from "wouter";
import { AnimatedSection } from "@/components/AnimatedSection";
import { useLanguage } from "@/components/layout/LanguageContext";
import type { CoursesData } from "@/data/types";
import coursesRaw from "@/data/courses.json";

const coursesData = coursesRaw as CoursesData;

export default function CoursesPage() {
  const { lang } = useLanguage();

  return (
    <div className="min-h-screen bg-white pt-10 pb-24 px-6">
      <div className="max-w-[1200px] mx-auto">
        <AnimatedSection className="text-center mb-16">
          <h1 className="font-playfair text-3xl md:text-[42px] mb-4">18 ACI Foundation Courses</h1>
          <p className="font-inter text-[#6B6B6B] text-base max-w-2xl mx-auto">
            Foundation Courses of the Asian Classics Institute
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {coursesData.courses.filter(c => c.number > 0).map((course, idx) => {
            const title = lang === 'en' ? course.title_en : (course.title_ru || course.title_en);
            const badgeText = course.number > 0 ? `ACI ${course.number}` : "Special";
            
            return (
              <AnimatedSection key={course.id} delay={(idx % 6) * 0.05}>
                <Link href={`/aci-courses/${course.id}`}>
                  <div 
                    className="bg-white border border-[#E5E2DF] rounded-2xl overflow-hidden group cursor-pointer hover:-translate-y-1 hover:shadow-lg transition-all duration-300 h-full flex flex-col"
                    data-testid={`course-card-${course.id}`}
                  >
                    <div 
                      className="w-full aspect-[16/10] relative flex items-center justify-center p-6" 
                      style={{ background: 'linear-gradient(135deg, #7A1B2E 0%, #C4973B 100%)' }}
                    >
                      <div className="font-playfair text-4xl md:text-5xl text-white opacity-90 tracking-wider">
                        {badgeText}
                      </div>
                    </div>
                    <div className="p-6 flex flex-col flex-1">
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
                          Learn more &rarr;
                        </div>
                      </div>
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
