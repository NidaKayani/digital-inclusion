import BackButton from "@/components/BackButton";

export default function TakeoffPage() {
  return (
    <div className="container mx-auto px-4 py-10 text-gray-900">
      <div className="page-hero mb-8 p-6 md:p-10">
        <div className="flex items-start justify-between mb-6">
          <BackButton className="mt-1" />
        </div>
        <span className="badge">Takeoff</span>
        <h1 className="text-3xl md:text-4xl font-extrabold mt-2 text-gray-900">Get Started</h1>
        <p className="text-gray-700 mt-1 max-w-2xl">Kickstart your program with onboarding steps and checklists.</p>
      </div>
      <ol className="bg-white p-6 rounded-2xl shadow list-decimal ml-6 space-y-2">
        <li>Set up classes and add learners</li>
        <li>Download offline packs</li>
        <li>Assign first modules</li>
      </ol>
    </div>
  );
}


