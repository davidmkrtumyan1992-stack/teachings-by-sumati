import { AnimatedSection } from "@/components/AnimatedSection";

const RETREATS = [
  {
    id: 1,
    title: "Armenia Retreat",
    year: "2025",
    description: "An upcoming deep immersion into the teachings of the Diamond Cutter Sutra in the peaceful mountains of Armenia.",
    duration: "14 Days",
  },
  {
    id: 2,
    title: "Nepal Journey",
    year: "2023",
    description: "A pilgrimage and study retreat exploring the historical roots of the Mahayana tradition.",
    duration: "21 Days",
  },
  {
    id: 3,
    title: "Diamond Mountain",
    year: "2022",
    description: "Foundational practice retreat focusing on meditation and the ethical life.",
    duration: "10 Days",
  }
];

export default function RetreatsPage() {
  return (
    <div className="min-h-screen bg-white pt-10 pb-24 px-6">
      <div className="max-w-[800px] mx-auto">
        <AnimatedSection className="text-center mb-16">
          <h1 className="font-playfair text-3xl md:text-[42px] mb-4">Retreats</h1>
          <p className="font-inter text-[#6B6B6B] text-base max-w-2xl mx-auto">
            Immersive study and practice environments
          </p>
        </AnimatedSection>

        <div className="space-y-6">
          {RETREATS.map((retreat, idx) => (
            <AnimatedSection key={retreat.id} delay={idx * 0.1}>
              <div className="group bg-white border border-[#E5E2DF] rounded-2xl overflow-hidden flex flex-col md:flex-row hover:shadow-lg transition-all duration-300">
                <div 
                  className="w-full md:w-2/5 aspect-[4/3] md:aspect-auto"
                  style={{ background: 'linear-gradient(135deg, #F8F6F4 0%, #E5E2DF 100%)' }}
                >
                  {/* Placeholder for real retreat images */}
                </div>
                
                <div className="p-6 md:p-8 flex-1 flex flex-col justify-center">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="font-inter text-sm font-bold text-[#7A1B2E] tracking-wide uppercase">{retreat.year}</span>
                    <span className="w-1 h-1 rounded-full bg-[#E5E2DF]" />
                    <span className="font-inter text-sm text-[#6B6B6B]">{retreat.duration}</span>
                  </div>
                  
                  <h3 className="font-playfair text-2xl text-[#1A1A1A] mb-3">{retreat.title}</h3>
                  <p className="font-inter text-sm text-[#4A4A4A] leading-relaxed mb-6">
                    {retreat.description}
                  </p>
                  
                  <button className="font-inter text-sm font-medium text-[#7A1B2E] group-hover:underline self-start">
                    View Details &rarr;
                  </button>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </div>
  );
}
