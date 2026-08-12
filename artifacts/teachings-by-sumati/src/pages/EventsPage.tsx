import { Bell, ArrowRight } from "lucide-react";
import { Link } from "wouter";
import { AnimatedSection } from "@/components/AnimatedSection";
import { useT } from "@/i18n/translations";

export default function EventsPage() {
  const t = useT();

  return (
    <div className="min-h-screen bg-white pt-10 pb-24 px-6">
      <div className="max-w-[800px] mx-auto">
        <AnimatedSection className="text-center mb-16">
          <h1 className="font-playfair text-3xl md:text-[42px] mb-4">{t.events.heading}</h1>
          <p className="font-inter text-[#6B6B6B] text-base max-w-2xl mx-auto">
            {t.events.subheading}
          </p>
        </AnimatedSection>

        <AnimatedSection delay={0.1}>
          <div className="relative bg-[#F8F6F4] border border-[#E5E2DF] rounded-2xl p-12 md:p-20 text-center flex flex-col items-center overflow-hidden">
            <div
              className="absolute inset-0 pointer-events-none"
              style={{ background: 'radial-gradient(circle at 50% 0%, rgba(196,151,59,0.10), transparent 60%)' }}
            />
            <div className="relative w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-md mb-6 animate-breathe">
              <Bell className="w-7 h-7 text-[#7A1B2E]" strokeWidth={1.5} />
            </div>
            <h3 className="relative font-playfair text-2xl md:text-3xl text-[#1A1A1A] mb-3">{t.events.noEvents}</h3>
            <p className="relative font-inter text-[#6B6B6B] mb-8 max-w-md">
              {t.events.noEventsDesc}
            </p>
            <Link
              href="/aci-courses"
              className="relative inline-flex items-center gap-2 font-inter text-sm font-medium text-[#7A1B2E] hover:gap-3 transition-all group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7A1B2E] focus-visible:ring-offset-2 rounded"
            >
              {t.events.exploreCta}
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
}
