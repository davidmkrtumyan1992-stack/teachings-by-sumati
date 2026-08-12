import { Link } from "wouter";
import { Compass } from "lucide-react";
import { useT } from "@/i18n/translations";

export default function NotFound() {
  const t = useT();

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-white px-6 text-center">
      <div className="max-w-md">
        <div className="w-14 h-14 rounded-full bg-[#7A1B2E]/10 flex items-center justify-center mx-auto mb-6">
          <Compass className="w-7 h-7 text-[#7A1B2E]" />
        </div>
        <h1 className="font-playfair text-3xl text-[#1A1A1A] mb-3">{t.notFound.title}</h1>
        <p className="font-inter text-sm text-[#6B6B6B] mb-8">{t.notFound.desc}</p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-[#7A1B2E] text-white font-inter text-sm font-medium px-6 py-3 rounded-xl hover:bg-[#5C0E1F] transition-colors"
        >
          {t.notFound.backHome}
        </Link>
      </div>
    </div>
  );
}
