export default function AnalyticsPage() {
  return (
    <div className="container mx-auto px-4 py-10 text-gray-900">
      <div className="page-hero mb-8 p-6 md:p-10">
        <span className="badge">Analytics</span>
        <h1 className="text-3xl md:text-4xl font-extrabold mt-2 text-gray-900">Learning Analytics</h1>
        <p className="text-gray-700 mt-1 max-w-2xl">Overview of engagement, completion, and mastery trends.</p>
      </div>
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow">
          <div className="text-sm text-gray-500">Weekly Active Learners</div>
          <div className="text-3xl font-extrabold">1,248</div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow">
          <div className="text-sm text-gray-500">Avg. Session Length</div>
          <div className="text-3xl font-extrabold">23m</div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow">
          <div className="text-sm text-gray-500">Completion Rate</div>
          <div className="text-3xl font-extrabold">78%</div>
        </div>
      </div>
    </div>
  );
}


