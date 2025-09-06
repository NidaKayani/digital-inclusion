import BackButton from "@/components/BackButton";

export default function ProgressPage() {
  return (
    <div className="container mx-auto px-4 py-10 text-gray-900">
      <div className="page-hero mb-8 p-6 md:p-10">
        <div className="flex items-start justify-between mb-6">
          <BackButton className="mt-1" />
        </div>
        <span className="badge">Progress</span>
        <h1 className="text-3xl md:text-4xl font-extrabold mt-2 text-gray-900">Student Progress</h1>
        <p className="text-gray-700 mt-1 max-w-2xl">Track milestones, streaks, and module completions.</p>
      </div>
      <div className="bg-white p-6 rounded-2xl shadow">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm text-gray-500">Current Streak</div>
            <div className="text-2xl font-extrabold">7 days</div>
          </div>
          <div>
            <div className="text-sm text-gray-500">Modules Completed</div>
            <div className="text-2xl font-extrabold">14</div>
          </div>
          <div>
            <div className="text-sm text-gray-500">Mastery</div>
            <div className="text-2xl font-extrabold">Level 3</div>
          </div>
        </div>
      </div>
    </div>
  );
}


