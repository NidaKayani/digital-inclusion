import { LayersIcon, PersonIcon, TargetIcon } from './icons';

export default function MissionSection() {
  return (
    <section className="bg-white py-24">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Mission</h2>
        <p className="max-w-4xl mx-auto text-lg text-gray-600 leading-relaxed">
          We believe that education is a fundamental right, not a privilege. Our mission is to bridge the digital divide by leveraging cutting-edge technology to provide quality, accessible, and personalized learning experiences for every student, regardless of their geographical or economic circumstances. We are dedicated to creating an educational ecosystem that empowers individuals and strengthens communities.
        </p>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div>
            <LayersIcon className="h-16 w-16 mx-auto text-blue-500 mb-4" size={64} />
            <h3 className="font-bold text-xl">Accessible</h3>
            <p className="text-gray-500 text-sm">Learning for everyone, everywhere.</p>
          </div>
          <div>
            <PersonIcon className="h-16 w-16 mx-auto text-purple-500 mb-4" size={64} />
            <h3 className="font-bold text-xl">Personalized</h3>
            <p className="text-gray-500 text-sm">Tailored to individual needs.</p>
          </div>
          <div>
            <TargetIcon className="h-16 w-16 mx-auto text-yellow-500 mb-4" size={64} />
            <h3 className="font-bold text-xl">Effective</h3>
            <p className="text-gray-500 text-sm">Proven to improve outcomes.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
