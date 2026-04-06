import { AnimatedSection } from "@/components/AnimatedSection";

export default function PracticeModulesPage() {
  return (
    <div className="min-h-screen bg-white pt-10 pb-24 px-6">
      <div className="max-w-[1200px] mx-auto">
        <AnimatedSection className="text-center mb-16">
          <h1 className="font-playfair text-3xl md:text-[42px] mb-4">Practice Modules</h1>
          <p className="font-inter text-[#6B6B6B] text-base max-w-2xl mx-auto">
            Deepen your practice with structured modules
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((idx) => (
            <AnimatedSection key={idx} delay={idx * 0.1}>
              <div className="bg-white border border-[#E5E2DF] rounded-2xl overflow-hidden opacity-70">
                <div 
                  className="w-full aspect-[16/10] relative flex items-center justify-center p-6" 
                  style={{ background: 'linear-gradient(135deg, #5C0E1F 0%, #7A1B2E 100%)' }}
                >
                  <div className="font-playfair text-2xl text-white/50 tracking-wider">
                    Coming Soon
                  </div>
                </div>
                <div className="p-6">
                  <div className="h-4 bg-[#F8F6F4] rounded w-1/3 mb-3"></div>
                  <div className="h-6 bg-[#F8F6F4] rounded w-3/4 mb-6"></div>
                  <div className="h-10 bg-[#F8F6F4] rounded-lg w-full"></div>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </div>
  );
}
