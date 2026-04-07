import { Bell } from "lucide-react";
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
          <div className="bg-[#F8F6F4] border border-[#E5E2DF] rounded-2xl p-12 text-center flex flex-col items-center">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm mb-6">
              <Bell className="w-6 h-6 text-[#7A1B2E]" />
            </div>
            <h3 className="font-playfair text-2xl text-[#1A1A1A] mb-2">{t.events.noEvents}</h3>
            <p className="font-inter text-[#6B6B6B] mb-8 max-w-md">
              {t.events.noEventsDesc}
            </p>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
}
