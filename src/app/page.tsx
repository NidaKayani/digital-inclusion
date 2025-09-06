import Header from "@/components/Header";
import Hero from "@/components/Hero";
import {
  LowBandwidthFeature,
  DeviceAgnosticFeature,
  PersonalizedLearningFeature,
} from "@/components/FeatureSection";
import MissionSection from "@/components/MissionSection";
import TeamSection from "@/components/TeamSection";
import Footer from "@/components/Footer";
import AgentStatus from "@/components/AgentStatus";
import OfferSection from "@/components/offer/OfferSection";
import StatsSection from "@/components/StatsSection";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="space-y-6">
        <Hero />
        <StatsSection />
        <OfferSection />
        <LowBandwidthFeature />
        <DeviceAgnosticFeature />
        <PersonalizedLearningFeature />
        <MissionSection />
        <TeamSection />
      </main>
      <Footer />
      <AgentStatus />
    </div>
  );
}
