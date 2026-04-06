import { Link } from "wouter";

export function Footer() {
  return (
    <footer className="bg-[#7A1B2E] text-white pt-[60px] pb-8 px-6 md:px-12 mt-auto">
      <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 text-center md:text-left">
        
        {/* Col 1 */}
        <div>
          <h2 className="font-playfair text-xl tracking-wider mb-4">TEACHINGS BY SUMATI</h2>
          <p className="text-white/60 font-inter text-sm leading-relaxed max-w-xs mx-auto md:mx-0">
            Buddhist teachings in the Mahayana tradition. Dedicated to the study and practice of the Dharma.
          </p>
        </div>

        {/* Col 2 */}
        <div>
          <h3 className="font-inter text-sm font-semibold tracking-wider text-white/90 uppercase mb-6">Navigation</h3>
          <ul className="space-y-3 font-inter text-sm">
            <li><Link href="/"><span className="text-white/70 hover:text-white transition-colors cursor-pointer" data-testid="footer-link-home">Home</span></Link></li>
            <li><Link href="/aci-courses"><span className="text-white/70 hover:text-white transition-colors cursor-pointer" data-testid="footer-link-courses">ACI Courses</span></Link></li>
            <li><Link href="/practice-modules"><span className="text-white/70 hover:text-white transition-colors cursor-pointer" data-testid="footer-link-practices">Practices</span></Link></li>
            <li><Link href="/retreats"><span className="text-white/70 hover:text-white transition-colors cursor-pointer" data-testid="footer-link-retreats">Retreats</span></Link></li>
            <li><Link href="/events"><span className="text-white/70 hover:text-white transition-colors cursor-pointer" data-testid="footer-link-events">Events</span></Link></li>
            <li><Link href="/projects"><span className="text-white/70 hover:text-white transition-colors cursor-pointer" data-testid="footer-link-projects">Projects</span></Link></li>
          </ul>
        </div>

        {/* Col 3 */}
        <div>
          <h3 className="font-inter text-sm font-semibold tracking-wider text-white/90 uppercase mb-6">Resources</h3>
          <ul className="space-y-3 font-inter text-sm">
            <li><a href="https://asianclassicsinstitute.org/" target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-white transition-colors" data-testid="footer-link-aci-online">ACI Online ↗</a></li>
            <li><a href="https://www.tbooklists.com/" target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-white transition-colors" data-testid="footer-link-book-lists">Book Lists ↗</a></li>
            <li><a href="https://www.teachingsbysarahni.org/" target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-white transition-colors" data-testid="footer-link-sarahni">Teachings by Sarahni ↗</a></li>
            <li><span className="text-white/70 hover:text-white transition-colors cursor-pointer">6-Times Diary</span></li>
          </ul>
        </div>

        {/* Col 4 */}
        <div>
          <h3 className="font-inter text-sm font-semibold tracking-wider text-white/90 uppercase mb-6">Contact</h3>
          <p className="text-white/70 font-inter text-sm mb-4">
            For inquiries regarding teachings, retreats, or general questions.
          </p>
          <a href="mailto:info@teachingsbysumati.org" className="inline-block border border-white/30 rounded-full px-6 py-2 text-sm font-inter hover:bg-white/10 transition-colors" data-testid="footer-link-contact">
            Contact Us
          </a>
        </div>

      </div>

      <div className="max-w-[1200px] mx-auto mt-16 pt-8 border-t border-white/15 text-center">
        <p className="font-inter text-[13px] text-white/40">
          © {new Date().getFullYear()} Teachings By Sumati. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
