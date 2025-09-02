import Header from '@/components/Header';
import Hero from '@/components/Hero';
import { LowBandwidthFeature, DeviceAgnosticFeature, PersonalizedLearningFeature } from '@/components/FeatureSection';
import MissionSection from '@/components/MissionSection';
import TeamSection from '@/components/TeamSection';
import Footer from '@/components/Footer';
import AgentStatus from '@/components/AgentStatus';

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
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
