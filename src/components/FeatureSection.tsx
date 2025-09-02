import { DownloadIcon, LayersIcon, TrendingUpIcon } from './icons';

interface FeatureSectionProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  reverse?: boolean;
  bgColor?: string;
  iconBgColor?: string;
}

export default function FeatureSection({ 
  title, 
  description, 
  icon, 
  reverse = false, 
  bgColor = "bg-white",
  iconBgColor = "bg-blue-100"
}: FeatureSectionProps) {
  const containerClass = reverse 
    ? "md:flex md:flex-row-reverse md:items-center md:space-x-12"
    : "md:flex md:items-center md:space-x-12";

  const sectionClass = bgColor === "bg-gray-100" 
    ? "container mx-auto px-4 py-24 bg-gray-100 rounded-[60px] my-12 shadow-inner"
    : "container mx-auto px-4 py-24";

  return (
    <section className={sectionClass}>
      <div className={containerClass}>
        <div className="md:w-1/2">
          <h2 className="text-3xl font-bold text-gray-900 leading-tight">
            {title}
          </h2>
          <p className="mt-4 text-gray-600 leading-relaxed">
            {description}
          </p>
        </div>
        <div className="md:w-1/2 mt-8 md:mt-0 relative section-card">
          <div className="bg-white p-6 rounded-3xl border border-gray-200">
            <div className={`flex items-center justify-center p-8 ${iconBgColor} rounded-2xl`}>
              {icon}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Pre-configured feature sections
export function LowBandwidthFeature() {
  return (
    <FeatureSection
      title="Access education, even with weak internet."
      description="The Progressive Web App (PWA) architecture ensures that learning materials are cached and accessible offline. Our agentic system proactively downloads and prioritizes content based on the student's learning plan, making the most of every connection opportunity."
      icon={<DownloadIcon className="text-blue-500" size={100} />}
      iconBgColor="bg-blue-100"
    />
  );
}

export function DeviceAgnosticFeature() {
  return (
    <FeatureSection
      title="Works seamlessly on affordable devices."
      description="The app is built to be lightweight and efficient, minimizing resource usage. It intelligently adapts to screen sizes and processing power, providing a smooth and responsive experience on cheap smartphones and tablets, without the need for expensive hardware."
      icon={<LayersIcon className="text-purple-500" size={100} />}
      reverse={true}
      bgColor="bg-gray-100"
      iconBgColor="bg-purple-100"
    />
  );
}

export function PersonalizedLearningFeature() {
  return (
    <FeatureSection
      title="A personalized education agent for every student."
      description="The agentic system understands the student's progress and suggests the next best steps. It acts as a personal tutor, recommending relevant topics, providing feedback, and generating a dynamic learning plan that adapts to their needs and environment."
      icon={<TrendingUpIcon className="text-yellow-500" size={100} />}
      iconBgColor="bg-yellow-100"
    />
  );
}
