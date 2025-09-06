import BackButton from "@/components/BackButton";

export default function InspirationPage() {
  return (
    <div className="container mx-auto px-4 py-10 text-gray-900">
      <div className="page-hero mb-8 p-6 md:p-10">
        <div className="flex items-start justify-between mb-6">
          <BackButton className="mt-1" />
        </div>
        <span className="badge">Inspiration</span>
        <h1 className="text-3xl md:text-4xl font-extrabold mt-2 text-gray-900">Stories & Ideas</h1>
        <p className="text-gray-700 mt-1 max-w-2xl">Success stories, best practices, and creative ideas from the community.</p>
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow">
          <div className="text-sm text-gray-500">Case Study</div>
          <div className="text-xl font-bold text-gray-900">Village school boosts math outcomes by 35%</div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow">
          <div className="text-sm text-gray-500">Idea</div>
          <div className="text-xl font-bold text-gray-900">Peer study circles with downloadable packs</div>
        </div>
      </div>
    </div>
  );
}


