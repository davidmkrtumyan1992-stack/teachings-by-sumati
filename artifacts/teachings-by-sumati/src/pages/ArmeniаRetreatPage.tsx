import { Link } from "wouter";
import { ArrowLeft, MapPin, Calendar, Users, Building2, Phone } from "lucide-react";
import { AnimatedSection } from "@/components/AnimatedSection";
import { useLanguage } from "@/components/layout/LanguageContext";
import retreatData from "@/data/armenia-retreat.json";

const BASE = import.meta.env.BASE_URL.replace(/\/$/, "");

type Lang = "en" | "ru";

function t(field: { en: string; ru: string }, lang: Lang) {
  return field[lang];
}

export default function ArmeniaRetreatPage() {
  const { lang } = useLanguage();
  const l = lang as Lang;

  const backLabel = lang === "ru" ? "Назад к ретритам" : "Back to Retreats";
  const highlightsLabel = lang === "ru" ? "Программа" : "Highlights";
  const teachersLabel = lang === "ru" ? "Учителя" : "Teachers";
  const accommodationLabel = lang === "ru" ? "Размещение" : "Accommodation";
  const pricingLabel = lang === "ru" ? "Стоимость участия" : "Pricing";
  const contactLabel = lang === "ru" ? "Контакты" : "Contact";
  const telegramLabel = lang === "ru" ? "Написать в Telegram" : "Contact on Telegram";
  const coOrgLabel = t(retreatData.coOrganizer.role as { en: string; ru: string }, l);

  return (
    <div className="min-h-screen bg-white pb-24">
      {/* Hero Image */}
      <div className="w-full bg-[#1A1A1A] overflow-hidden" style={{ maxHeight: "70vh" }}>
        <img
          src={`${BASE}/retreats/armenia-poster.jpg`}
          alt={t(retreatData.title as { en: string; ru: string }, l)}
          className="w-full h-full object-contain object-top"
          style={{ maxHeight: "70vh" }}
        />
      </div>

      {/* Header section */}
      <div className="bg-[#F8F6F4] pt-8 pb-12 px-6 rounded-b-[24px] mb-12">
        <div className="max-w-[800px] mx-auto">
          <Link
            href="/retreats"
            className="inline-flex items-center gap-2 text-[#6B6B6B] hover:text-[#1A1A1A] font-inter text-sm mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> {backLabel}
          </Link>

          <h1 className="font-playfair text-3xl md:text-[40px] leading-tight text-[#1A1A1A] mb-6">
            {t(retreatData.title as { en: string; ru: string }, l)}
          </h1>

          <div className="flex flex-col sm:flex-row gap-4 sm:gap-8">
            <div className="flex items-center gap-2 text-[#6B6B6B]">
              <Calendar className="w-4 h-4 text-[#7A1B2E] shrink-0" />
              <span className="font-inter text-sm">{t(retreatData.dates as { en: string; ru: string }, l)}</span>
            </div>
            <div className="flex items-center gap-2 text-[#6B6B6B]">
              <MapPin className="w-4 h-4 text-[#7A1B2E] shrink-0" />
              <span className="font-inter text-sm">{t(retreatData.location as { en: string; ru: string }, l)}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[800px] mx-auto px-6 space-y-14">

        {/* Description */}
        <AnimatedSection>
          <p className="font-inter text-base text-[#4A4A4A] leading-relaxed">
            {t(retreatData.description as { en: string; ru: string }, l)}
          </p>
        </AnimatedSection>

        {/* Highlights */}
        <AnimatedSection delay={0.07}>
          <h2 className="font-playfair text-2xl text-[#1A1A1A] mb-6">{highlightsLabel}</h2>
          <ul className="space-y-3">
            {(retreatData.highlights[l] as string[]).map((item, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#7A1B2E] mt-2 shrink-0" />
                <span className="font-inter text-base text-[#4A4A4A] leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </AnimatedSection>

        {/* Teachers */}
        <AnimatedSection delay={0.1}>
          <div className="border-t border-[#E5E2DF] pt-10">
            <div className="flex items-center gap-2 mb-5">
              <Users className="w-4 h-4 text-[#7A1B2E]" />
              <h2 className="font-playfair text-2xl text-[#1A1A1A]">{teachersLabel}</h2>
            </div>
            <div className="flex flex-wrap gap-3 mb-4">
              {retreatData.teachers.map((teacher, i) => (
                <span
                  key={i}
                  className="font-inter text-sm font-medium text-[#7A1B2E] bg-[#7A1B2E]/8 px-4 py-2 rounded-full"
                >
                  {t(teacher.name as { en: string; ru: string }, l)}
                </span>
              ))}
            </div>
            <p className="font-inter text-sm text-[#6B6B6B] leading-relaxed">
              {t(retreatData.teachersBio as { en: string; ru: string }, l)}
            </p>
          </div>
        </AnimatedSection>

        {/* Accommodation */}
        <AnimatedSection delay={0.13}>
          <div className="border-t border-[#E5E2DF] pt-10">
            <div className="flex items-center gap-2 mb-4">
              <Building2 className="w-4 h-4 text-[#7A1B2E]" />
              <h2 className="font-playfair text-2xl text-[#1A1A1A]">{accommodationLabel}</h2>
            </div>
            <p className="font-inter text-base text-[#4A4A4A] leading-relaxed">
              {t(retreatData.accommodation as { en: string; ru: string }, l)}
            </p>
          </div>
        </AnimatedSection>

        {/* Pricing */}
        <AnimatedSection delay={0.16}>
          <div className="border-t border-[#E5E2DF] pt-10">
            <h2 className="font-playfair text-2xl text-[#1A1A1A] mb-6">{pricingLabel}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {retreatData.pricing.map((tier, i) => (
                <div
                  key={i}
                  className="bg-[#F8F6F4] border border-[#E5E2DF] rounded-xl p-5 text-center"
                >
                  <div className="font-inter text-sm text-[#6B6B6B] mb-3">
                    {t(tier.type as { en: string; ru: string }, l)}
                  </div>
                  <div className="font-playfair text-2xl text-[#7A1B2E] font-semibold">
                    ${tier.price}
                  </div>
                  <div className="font-inter text-xs text-[#9A9A9A] mt-1">{retreatData.currency}</div>
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>

        {/* Contact */}
        <AnimatedSection delay={0.19}>
          <div className="border-t border-[#E5E2DF] pt-10">
            <div className="flex items-center gap-2 mb-6">
              <Phone className="w-4 h-4 text-[#7A1B2E]" />
              <h2 className="font-playfair text-2xl text-[#1A1A1A]">{contactLabel}</h2>
            </div>

            <div className="bg-[#F8F6F4] border border-[#E5E2DF] rounded-2xl p-6 md:p-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
              <div>
                <div className="font-inter text-base font-semibold text-[#1A1A1A] mb-1">
                  {retreatData.contact.name}
                </div>
                <div className="font-inter text-sm text-[#6B6B6B]">{retreatData.contact.telegram}</div>
              </div>
              <a
                href={retreatData.contact.telegramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#7A1B2E] text-white font-inter text-sm font-medium px-6 py-3 rounded-xl hover:bg-[#5C0E1F] transition-colors shrink-0"
              >
                {telegramLabel} →
              </a>
            </div>

            {/* Co-organizer */}
            <div className="mt-5 font-inter text-sm text-[#9A9A9A] text-center">
              {coOrgLabel}: {retreatData.coOrganizer.name}
            </div>
          </div>
        </AnimatedSection>

      </div>
    </div>
  );
}
