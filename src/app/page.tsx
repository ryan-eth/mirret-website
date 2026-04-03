import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AgentBuilderSection from "@/components/AgentBuilderSection";
import ControlSection from "@/components/ControlSection";
import TimelineSection from "@/components/TimelineSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main id="main-content" className="mirret-page-gradient min-h-screen">
      <Navbar />
      <HeroSection />
      <AgentBuilderSection />
      <ControlSection />
      <TimelineSection />
      <CTASection />
      <Footer />
    </main>
  );
}
