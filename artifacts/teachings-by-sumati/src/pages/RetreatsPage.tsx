import { Link } from "wouter";
import { Mountain } from "lucide-react";
import { AnimatedSection } from "@/components/AnimatedSection";
import { useT } from "@/i18n/translations";
import { useLanguage } from "@/components/layout/LanguageContext";
import armeniaData from "@/data/armenia-retreat.json";

const BASE = import.meta.env.BASE_URL.replace(/\/$/, "");

const ARMENIA_YEAR = "2026";
const ARMENIA_DURATION_EN = "10 Days";
const ARMENIA_DURATION_RU = "10 дней";

// First sentence of description only (for card preview)
function firstSentence(text: string): string {
  const dot = text.indexOf(". ");
  return dot !== -1 ? text.slice(0, dot + 1) : text;
}

export default function RetreatsPage() {
  const t = useT();
  const { lang } = useLanguage();

  const armeniaTitle   = lang === "ru" ? armeniaData.title.ru       : armeniaData.title.en;
  const armeniaDesc    = lang === "ru"
    ? firstSentence(armeniaData.description.ru)
    : firstSentence(armeniaData.description.en);
  const armeniaDuration = lang === "ru" ? ARMENIA_DURATION_RU : ARMENIA_DURATION_EN;

  return (
    <div className="min-h-screen bg-white pt-10 pb-24 px-6">
      <div className="max-w-[800px] mx-auto">
        <AnimatedSection className="text-center mb-16">
          <h1 className="font-playfair text-3xl md:text-[42px] mb-4">{t.retreats.heading}</h1>
          <p className="font-inter text-[#6B6B6B] text-base max-w-2xl mx-auto">
            {t.retreats.subheading}
          </p>
        </AnimatedSection>

        <div className="space-y-6">
          {/* Armenia Retreat — data from armenia-retreat.json */}
          <AnimatedSection>
            <div className="group bg-white border border-[#E5E2DF] rounded-2xl overflow-hidden flex flex-col md:flex-row hover:shadow-lg transition-all duration-300">
              <div
                className="w-full md:w-2/5 shrink-0 overflow-hidden rounded-xl"
                style={{ aspectRatio: "3/2" }}
              >
                <img
                  src={`${BASE}/retreat-armenia.png`}
                  alt={armeniaTitle}
                  loading="lazy"
                  className="w-full h-full object-cover object-center"
                />
              </div>

              <div className="p-6 md:p-8 flex-1 flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-2">
                  <span className="font-inter text-sm font-bold text-[#7A1B2E] tracking-wide uppercase">
                    {ARMENIA_YEAR}
                  </span>
                  <span className="w-1 h-1 rounded-full bg-[#E5E2DF]" />
                  <span className="font-inter text-sm text-[#6B6B6B]">{armeniaDuration}</span>
                </div>

                <h3 className="font-playfair text-2xl text-[#1A1A1A] mb-3">{armeniaTitle}</h3>
                <p className="font-inter text-sm text-[#4A4A4A] leading-relaxed mb-6">{armeniaDesc}</p>

                <Link
                  href="/retreats/armenia"
                  className="font-inter text-sm font-medium text-[#7A1B2E] group-hover:underline self-start rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7A1B2E] focus-visible:ring-offset-2"
                >
                  {t.retreats.viewDetails} &rarr;
                </Link>
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.08}>
            <div className="rounded-2xl border border-dashed border-[#E5E2DF] p-6 flex items-center gap-4 text-center sm:text-left sm:flex-row flex-col">
              <div className="w-10 h-10 rounded-full bg-[#7A1B2E]/10 flex items-center justify-center shrink-0">
                <Mountain className="w-5 h-5 text-[#7A1B2E]" strokeWidth={1.5} />
              </div>
              <p className="font-inter text-sm text-[#9A9A9A]">{t.retreats.moreComingSoon}</p>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </div>
  );
}
