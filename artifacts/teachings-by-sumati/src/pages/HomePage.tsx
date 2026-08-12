import { useEffect, useState } from "react";
import { ChevronDown, ArrowRight } from "lucide-react";
import { AnimatedSection } from "@/components/AnimatedSection";
import { useLanguage } from "@/components/layout/LanguageContext";
import { useT } from "@/i18n/translations";
import type { Course, Project, CoursesData } from "@/data/types";
import coursesRaw from "@/data/courses.json";
import { toEmbedUrl } from "@/lib/youtube";

const coursesData = coursesRaw as CoursesData;
const BASE = import.meta.env.BASE_URL.replace(/\/$/, "");
const videoPoster = `${BASE}/hero-bg-poster.jpg`;
const video1080p = `${BASE}/hero-bg-1080p.mp4`;
const video720p = `${BASE}/hero-bg-720p.mp4`;

export default function HomePage() {
  const { lang } = useLanguage();
  const t = useT();
  const [scrollY, setScrollY] = useState(0);
  const [windowHeight, setWindowHeight] = useState(1000);
  const [randomVideo, setRandomVideo] = useState<{ url: string, courseTitle: string } | null>(null);
  const [isFinding, setIsFinding] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);
    const handleChange = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  useEffect(() => {
    setWindowHeight(window.innerHeight);
    const handleScroll = () => setScrollY(window.scrollY);
    const handleResize = () => setWindowHeight(window.innerHeight);

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const heroOpacity = Math.max(0, 1 - (scrollY / (windowHeight * 0.8)));
  const heroTranslate = scrollY * 0.3;

  const findRandomTeaching = () => {
    setIsFinding(true);
    setTimeout(() => {
      const videoField = lang === 'ru' ? 'video_ru' : 'video_en';
      const validCourses = coursesData.courses.filter(c => c.classes && c.classes.some(cl => cl[videoField]));
      if (validCourses.length === 0) {
        setIsFinding(false);
        return;
      }

      const randomCourse = validCourses[Math.floor(Math.random() * validCourses.length)];
      const validClasses = (randomCourse.classes ?? []).filter(cl => cl[videoField]);
      const randomClass = validClasses[Math.floor(Math.random() * validClasses.length)];
      const embedUrl = toEmbedUrl(randomClass[videoField], lang);
      if (!embedUrl) {
        setIsFinding(false);
        return;
      }

      setRandomVideo({
        url: embedUrl,
        courseTitle: lang === 'en' ? randomCourse.title_en : (randomCourse.title_ru || randomCourse.title_en)
      });
      setIsFinding(false);
    }, 600);
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* SECTION 1 - HERO */}
      <section className="relative h-[100dvh] w-full overflow-hidden bg-black flex flex-col items-center justify-center">
        <div 
          className="absolute inset-0 w-full h-full"
          style={{ transform: `translateY(${heroTranslate}px)` }}
        >
          {prefersReducedMotion ? (
            <img
              src={videoPoster}
              alt=""
              className="absolute inset-0 w-full h-full object-cover opacity-80"
            />
          ) : (
            <video
              autoPlay
              loop
              muted
              playsInline
              poster={videoPoster}
              className="absolute inset-0 w-full h-full object-cover opacity-80"
            >
              <source src={video1080p} type="video/mp4" media="(min-width: 1024px)" />
              <source src={video720p} type="video/mp4" />
            </video>
          )}
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.1) 50%, rgba(0,0,0,0.5) 100%)' }} />
        </div>

        <div 
          className="relative z-10 flex flex-col items-center justify-center text-center px-6"
          style={{ opacity: heroOpacity }}
        >
          <h1 className="font-playfair text-[36px] md:text-[48px] lg:text-[72px] font-light text-white tracking-[0.05em] mb-4 animate-fade-in-up" style={{ textShadow: '0 2px 20px rgba(0,0,0,0.3)' }}>
            Teachings By Sumati
          </h1>
          <p className="font-inter text-[18px] font-light text-white/80 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            {t.home.heroSubtitle}
          </p>
        </div>

        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center animate-bounce-scroll opacity-60">
          <ChevronDown className="w-8 h-8 text-white" />
        </div>
      </section>

      {/* SECTION 2 - BIOGRAPHY */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-[1100px] w-full mx-auto grid grid-cols-1 lg:grid-cols-[55%_45%] gap-0 lg:gap-12 items-center">
          <AnimatedSection>
            <div className="w-full overflow-hidden rounded-2xl shadow-[0_24px_64px_rgba(0,0,0,0.12)] ring-1 ring-black/5">
              <img
                src={`${BASE}/lama-sumati-bio.jpg`}
                alt="Lama Sumati"
                className="w-full h-auto md:max-h-[400px] lg:max-h-none object-contain object-center"
              />
            </div>
          </AnimatedSection>
          <AnimatedSection className="space-y-6 self-start pt-6 md:pt-8 lg:pt-0 lg:pl-12" delay={0.2}>
            <div>
              <h2 className="font-playfair text-3xl md:text-4xl text-[#1A1A1A] mb-2">Lama Sumati</h2>
              <p className="font-inter text-sm text-[#9A9A9A] tracking-wide uppercase">{t.home.teacherSubtitle}</p>
            </div>
            <div className="font-inter text-base text-[#4A4A4A] leading-[1.8] space-y-4 whitespace-pre-wrap">
              {lang === 'ru' && coursesData.biography?.ru
                ? coursesData.biography.ru
                : coursesData.biography?.en}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* SECTION 3 - FIND A TEACHING */}
      <section className="min-h-[60vh] py-24 px-6 bg-[#F8F6F4] flex items-center justify-center text-center">
        <div className="max-w-2xl mx-auto w-full">
          <AnimatedSection>
            <h2 className="font-playfair text-3xl md:text-4xl mb-4">{t.home.findATeaching}</h2>
            <p className="font-inter text-base text-[#6B6B6B] max-w-[480px] mx-auto mb-10">
              {t.home.findDescription}
            </p>

            {!randomVideo && (
              <button 
                onClick={findRandomTeaching}
                disabled={isFinding}
                className="bg-[#7A1B2E] hover:bg-[#8F2540] text-white px-10 h-14 rounded-full font-inter text-base font-medium transition-all duration-300 hover:scale-105 hover:shadow-[0_4px_20px_rgba(122,27,46,0.3)] flex items-center justify-center mx-auto"
                data-testid="btn-find-teaching"
              >
                {isFinding ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  t.common.findForMe
                )}
              </button>
            )}

            {randomVideo && (
              <div className="animate-fade-in-up mt-8">
                <div className="aspect-video w-full max-w-3xl mx-auto rounded-xl overflow-hidden shadow-xl mb-6 bg-black">
                  <iframe 
                    src={randomVideo.url} 
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowFullScreen
                  />
                </div>
                <h3 className="font-inter font-medium text-lg text-[#1A1A1A] mb-6">{randomVideo.courseTitle}</h3>
                <button 
                  onClick={findRandomTeaching}
                  disabled={isFinding}
                  className="bg-white border border-[#E5E2DF] hover:bg-[#F8F6F4] text-[#1A1A1A] px-8 h-12 rounded-full font-inter text-sm font-medium transition-colors inline-flex items-center justify-center"
                  data-testid="btn-find-another"
                >
                  {isFinding ? (
                    <div className="w-4 h-4 border-2 border-[#1A1A1A]/30 border-t-[#1A1A1A] rounded-full animate-spin" />
                  ) : (
                    t.common.anotherOne
                  )}
                </button>
              </div>
            )}
          </AnimatedSection>
        </div>
      </section>

      {/* SECTION 4 - PROJECTS */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-[1200px] mx-auto">
          <AnimatedSection className="text-center mb-16">
            <h2 className="font-playfair text-3xl md:text-4xl">{t.home.projects}</h2>
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
                <div className={`bg-white border border-[#E5E2DF] rounded-2xl overflow-hidden h-full flex flex-col ${project.url ? 'group cursor-pointer hover:-translate-y-1 hover:shadow-lg transition-all duration-300' : ''}`}>
                  <div className={`w-full aspect-[16/9] relative p-6 flex flex-col justify-end ${project.url ? '' : 'opacity-60'}`} style={{ background: bgGradient }}>
                    <h3 className="font-playfair text-2xl text-white drop-shadow-md">{title}</h3>
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <p className="font-inter text-sm text-[#6B6B6B] leading-relaxed mb-6 flex-1">
                      {desc}
                    </p>
                    {project.url ? (
                      <div className="font-inter text-sm font-medium text-[#7A1B2E] flex items-center gap-1 group-hover:gap-2 transition-all">
                        {t.common.go} <ArrowRight className="w-4 h-4" />
                      </div>
                    ) : (
                      <div className="font-inter text-sm font-medium text-[#9A9A9A]">
                        {t.projects.comingSoon}
                      </div>
                    )}
                  </div>
                </div>
              );

              return (
                <AnimatedSection key={project.id} delay={idx * 0.1}>
                  {project.url ? (
                    <a href={project.url} target="_blank" rel="noopener noreferrer" className="block h-full rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7A1B2E] focus-visible:ring-offset-2" data-testid={`project-link-${project.id}`}>
                      {CardContent}
                    </a>
                  ) : (
                    <div className="block h-full" data-testid={`project-link-${project.id}`}>
                      {CardContent}
                    </div>
                  )}
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
