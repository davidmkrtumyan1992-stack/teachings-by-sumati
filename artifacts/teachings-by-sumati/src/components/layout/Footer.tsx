import { Link } from "wouter";
import { useT } from "@/i18n/translations";

export function Footer() {
  const t = useT();

  const brandContent = (
    <div>
      <h2 className="font-playfair text-xl tracking-wider mb-4">TEACHINGS BY SUMATI</h2>
      <p className="text-white/60 font-inter text-sm leading-relaxed max-w-xs mx-auto md:mx-0">
        {t.footer.description}
      </p>
    </div>
  );

  const navContent = (
    <div>
      <h3 className="font-inter text-sm font-semibold tracking-wider text-white/90 uppercase mb-6">{t.footer.navigation}</h3>
      <ul className="space-y-3 font-inter text-sm">
        <li><Link href="/"><span className="text-white/70 hover:text-white transition-colors cursor-pointer" data-testid="footer-link-home">{t.nav.home}</span></Link></li>
        <li><Link href="/aci-courses"><span className="text-white/70 hover:text-white transition-colors cursor-pointer" data-testid="footer-link-courses">{t.nav.aciCourses}</span></Link></li>
        <li><Link href="/practice-modules"><span className="text-white/70 hover:text-white transition-colors cursor-pointer" data-testid="footer-link-practices">{t.nav.practiceModules}</span></Link></li>
        <li><Link href="/retreats"><span className="text-white/70 hover:text-white transition-colors cursor-pointer" data-testid="footer-link-retreats">{t.nav.retreats}</span></Link></li>
        <li><Link href="/events"><span className="text-white/70 hover:text-white transition-colors cursor-pointer" data-testid="footer-link-events">{t.nav.events}</span></Link></li>
        <li><Link href="/projects"><span className="text-white/70 hover:text-white transition-colors cursor-pointer" data-testid="footer-link-projects">{t.nav.projects}</span></Link></li>
      </ul>
    </div>
  );

  const resourcesContent = (
    <div>
      <h3 className="font-inter text-sm font-semibold tracking-wider text-white/90 uppercase mb-6">{t.footer.resources}</h3>
      <ul className="space-y-3 font-inter text-sm">
        <li><a href="https://asianclassicsinstitute.org/" target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-white transition-colors" data-testid="footer-link-aci-online">ACI Online ↗</a></li>
        <li><a href="https://www.tbooklists.com/" target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-white transition-colors" data-testid="footer-link-book-lists">Book Lists ↗</a></li>
        <li><a href="https://www.teachingsbysarahni.org/" target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-white transition-colors" data-testid="footer-link-sarahni">Teachings by Sarahni ↗</a></li>
        <li><span className="text-white/70 hover:text-white transition-colors cursor-pointer">6-Times Diary</span></li>
      </ul>
    </div>
  );

  const contactContent = (
    <div>
      <h3 className="font-inter text-sm font-semibold tracking-wider text-white/90 uppercase mb-6">{t.footer.contact}</h3>
      <p className="text-white/70 font-inter text-sm mb-4">
        {t.footer.contactDesc}
      </p>
      <a href="mailto:dkarlstumpf@gmail.com" className="block text-white/90 font-inter text-sm mb-4 hover:text-white hover:underline transition-colors">
        dkarlstumpf@gmail.com
      </a>
      <a href="mailto:dkarlstumpf@gmail.com" className="inline-block border border-white/30 rounded-full px-6 py-2 text-sm font-inter hover:bg-white/10 transition-colors" data-testid="footer-link-contact">
        {t.common.contactUs}
      </a>
    </div>
  );

  return (
    <footer className="bg-[#7A1B2E] text-white pt-[60px] pb-8 px-6 md:px-12 mt-auto">
      <div className="max-w-[1200px] mx-auto">
        {/* Desktop: original 4-column row */}
        <div className="hidden md:grid md:grid-cols-4 md:gap-12 md:text-left">
          {brandContent}
          {navContent}
          {resourcesContent}
          {contactContent}
        </div>

        {/* Mobile: brand full-width, nav/resources 2-col with divider, contact full-width */}
        <div className="md:hidden space-y-10 text-center">
          {brandContent}
          <div className="grid grid-cols-2 divide-x divide-white/15 text-left">
            <div className="pr-4">{navContent}</div>
            <div className="pl-4">{resourcesContent}</div>
          </div>
          {contactContent}
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto mt-16 pt-8 border-t border-white/15 text-center">
        <p className="font-inter text-[13px] text-white/40">
          © {new Date().getFullYear()} Teachings By Sumati. {t.footer.allRightsReserved}
        </p>
      </div>
    </footer>
  );
}
