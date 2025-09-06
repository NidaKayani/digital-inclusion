"use client";

import { useState } from "react";
import BackButton from "@/components/BackButton";

type LessonPlanRequest = {
  subject: string;
  grade_level: string;
  duration_minutes: number;
  learning_objectives: string[];
  constraints?: string;
  language?: string;
};

type Activity = {
  title: string;
  description: string;
  duration_minutes: number;
  materials?: string[];
};

type Assessment = {
  description?: string;
  criteria?: string[];
};

type LessonPlanResponse = {
  subject: string;
  grade_level: string;
  duration_minutes: number;
  learning_objectives: string[];
  outline?: string[];
  activities?: Activity[];
  assessment?: Assessment;
};

export default function LearningPage() {
  const [subject, setSubject] = useState("Python Programming");
  const [gradeLevel, setGradeLevel] = useState("Beginner");
  const [duration, setDuration] = useState(45);
  const [objectives, setObjectives] = useState(
    "Understand variables and data types; Write simple expressions; Use input and print"
  );
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<LessonPlanResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);

    const payload: LessonPlanRequest = {
      subject,
      grade_level: gradeLevel,
      duration_minutes: duration,
      learning_objectives: objectives
        .split(";")
        .map((s) => s.trim())
        .filter(Boolean),
      language: "en",
    };

    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
      if (!baseUrl) {
        throw new Error(
          "API base URL not configured. Set NEXT_PUBLIC_API_BASE_URL."
        );
      }
      const res = await fetch(
        `${baseUrl.replace(/\/$/, "")}/api/lessons/plan`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );
      if (!res.ok) throw new Error(await res.text());
      const data = await res.json();
      setResult(data);
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Failed to generate lesson plan";
      setError(message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container mx-auto px-4 py-10 text-gray-900">
      <div className="page-hero mb-8 p-6 md:p-10">
        <div className="flex items-start justify-between mb-6">
          <BackButton className="mt-1" />
        </div>
        <span className="badge badge-success">Learning</span>
        <h1 className="text-3xl md:text-4xl font-extrabold mt-2 text-gray-900">
          Python Lesson Planner
        </h1>
        <p className="text-gray-700 mt-1 max-w-2xl">
          Generate structured lesson plans tailored to your class needs and
          time.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-2xl shadow space-y-4"
      >
        <div>
          <label className="block text-sm font-semibold text-gray-900">
            Subject
          </label>
          <input
            className="mt-1 w-full rounded-lg border border-gray-300 p-2 text-gray-900 placeholder-gray-500"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-900">
              Grade Level
            </label>
            <input
              className="mt-1 w-full rounded-lg border border-gray-300 p-2 text-gray-900 placeholder-gray-500"
              value={gradeLevel}
              onChange={(e) => setGradeLevel(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-900">
              Duration (minutes)
            </label>
            <input
              type="number"
              className="mt-1 w-full rounded-lg border border-gray-300 p-2 text-gray-900 placeholder-gray-500"
              value={duration}
              onChange={(e) => setDuration(parseInt(e.target.value || "0", 10))}
              min={15}
              max={120}
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-900">
            Learning Objectives (semicolon separated)
          </label>
          <textarea
            className="mt-1 w-full rounded-lg border border-gray-300 p-2 text-gray-900 placeholder-gray-500"
            rows={3}
            value={objectives}
            onChange={(e) => setObjectives(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-blue-700"
          disabled={loading}
        >
          {loading ? "Generating..." : "Generate Lesson Plan"}
        </button>
      </form>

      {error && <div className="mt-4 text-red-600 font-medium">{error}</div>}

      {result && (
        <div className="mt-8 space-y-4">
          <div className="bg-white p-6 rounded-2xl shadow">
            <h2 className="text-2xl font-extrabold text-gray-900">
              Lesson Overview
            </h2>
            <p className="text-gray-800">Subject: {result.subject}</p>
            <p className="text-gray-800">Grade: {result.grade_level}</p>
            <p className="text-gray-800">
              Duration: {result.duration_minutes} min
            </p>
            <div className="mt-2">
              <h3 className="font-semibold text-gray-900">
                Learning Objectives
              </h3>
              <ul className="list-disc ml-6 text-gray-900">
                {result.learning_objectives?.map((o: string, i: number) => (
                  <li key={i}>{o}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow">
            <h3 className="text-xl font-semibold mb-2 text-gray-900">
              Outline
            </h3>
            <ol className="list-decimal ml-6 space-y-1 text-gray-900">
              {result.outline?.map((o: string, i: number) => (
                <li key={i}>{o}</li>
              ))}
            </ol>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow">
            <h3 className="text-xl font-semibold mb-2 text-gray-900">
              Activities
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              {result.activities?.map((a: Activity, i: number) => (
                <div key={i} className="border border-gray-200 rounded-xl p-4">
                  <div className="font-semibold text-gray-900">{a.title}</div>
                  <div className="text-sm text-gray-800">{a.description}</div>
                  <div className="text-sm mt-1 text-gray-900">
                    ⏱ {a.duration_minutes} min
                  </div>
                  {a.materials?.length ? (
                    <div className="text-sm mt-1 text-gray-900">
                      🧰 {a.materials.join(", ")}
                    </div>
                  ) : null}
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow">
            <h3 className="text-xl font-semibold mb-2 text-gray-900">
              Assessment
            </h3>
            <div className="text-gray-900">
              {result.assessment?.description}
            </div>
            <ul className="list-disc ml-6 mt-2 text-gray-900">
              {result.assessment?.criteria?.map((c: string, i: number) => (
                <li key={i}>{c}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
