import { Calendar, Bell } from "lucide-react";
import { AnimatedSection } from "@/components/AnimatedSection";

export default function EventsPage() {
  return (
    <div className="min-h-screen bg-white pt-10 pb-24 px-6">
      <div className="max-w-[800px] mx-auto">
        <AnimatedSection className="text-center mb-16">
          <h1 className="font-playfair text-3xl md:text-[42px] mb-4">Upcoming Events</h1>
          <p className="font-inter text-[#6B6B6B] text-base max-w-2xl mx-auto">
            Live teachings, Q&A sessions, and study groups
          </p>
        </AnimatedSection>

        {/* Empty State */}
        <AnimatedSection delay={0.1}>
          <div className="bg-[#F8F6F4] border border-[#E5E2DF] rounded-2xl p-12 text-center flex flex-col items-center">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm mb-6">
              <Bell className="w-6 h-6 text-[#7A1B2E]" />
            </div>
            <h3 className="font-playfair text-2xl text-[#1A1A1A] mb-2">No upcoming events</h3>
            <p className="font-inter text-[#6B6B6B] mb-8 max-w-md">
              There are no live events scheduled at this moment. Stay tuned for future announcements.
            </p>
          </div>
        </AnimatedSection>

        {/* Placeholder Example (Hidden by default, just showing structure if needed) */}
        <div className="hidden space-y-4 mt-8">
          <div className="bg-white border border-[#E5E2DF] rounded-xl p-4 flex gap-6 items-center">
            <div className="w-[72px] h-[80px] bg-[#7A1B2E] rounded-lg text-white flex flex-col items-center justify-center shrink-0">
              <span className="font-inter text-sm font-medium opacity-80 uppercase">Oct</span>
              <span className="font-playfair text-2xl">14</span>
            </div>
            <div>
              <h4 className="font-inter font-medium text-lg text-[#1A1A1A] mb-1">Live Q&A: Guide to Bodhisattva's Way</h4>
              <p className="font-inter text-sm text-[#6B6B6B] flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" /> 10:00 AM EST • Zoom
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
