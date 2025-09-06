"use client";

import { useState } from "react";
import BackButton from "@/components/BackButton";

type AssessmentRequest = {
  topic: string;
  grade_level: string;
  num_items: number;
  difficulty: string;
  style: string;
};

type AssessmentItem = {
  question: string;
  options?: string[];
};

type AssessmentResponse = {
  items?: AssessmentItem[];
};

export default function AssessmentPage() {
  const [topic, setTopic] = useState("Python Basics");
  const [gradeLevel, setGradeLevel] = useState("Beginner");
  const [numItems, setNumItems] = useState(5);
  const [difficulty, setDifficulty] = useState("mixed");
  const [style, setStyle] = useState("formative");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AssessmentResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);

    const payload: AssessmentRequest = {
      topic,
      grade_level: gradeLevel,
      num_items: numItems,
      difficulty,
      style,
    };

    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
      if (!baseUrl) {
        throw new Error(
          "API base URL not configured. Set NEXT_PUBLIC_API_BASE_URL."
        );
      }
      const res = await fetch(
        `${baseUrl.replace(/\/$/, "")}/api/assessments/generate`,
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
        err instanceof Error ? err.message : "Failed to generate assessment";
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
        <span className="badge">Assessment</span>
        <h1 className="text-3xl md:text-4xl font-extrabold mt-2 text-gray-900">
          Assessment - Python
        </h1>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-2xl shadow space-y-4"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-900">
              Topic
            </label>
            <input
              className="mt-1 w-full rounded-lg border border-gray-300 p-2 text-gray-900"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-900">
              Grade Level
            </label>
            <input
              className="mt-1 w-full rounded-lg border border-gray-300 p-2 text-gray-900"
              value={gradeLevel}
              onChange={(e) => setGradeLevel(e.target.value)}
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-900">
              Number of Items
            </label>
            <input
              type="number"
              className="mt-1 w-full rounded-lg border border-gray-300 p-2 text-gray-900"
              value={numItems}
              min={1}
              max={20}
              onChange={(e) => setNumItems(parseInt(e.target.value || "0", 10))}
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-900">
              Difficulty
            </label>
            <select
              className="mt-1 w-full rounded-lg border border-gray-300 p-2 text-gray-900"
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
            >
              <option value="easy">easy</option>
              <option value="medium">medium</option>
              <option value="hard">hard</option>
              <option value="mixed">mixed</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-900">
              Style
            </label>
            <select
              className="mt-1 w-full rounded-lg border border-gray-300 p-2 text-gray-900"
              value={style}
              onChange={(e) => setStyle(e.target.value)}
            >
              <option value="formative">formative</option>
              <option value="summative">summative</option>
            </select>
          </div>
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-blue-700"
          disabled={loading}
        >
          {loading ? "Generating..." : "Generate Assessment"}
        </button>
      </form>

      {error && <div className="mt-4 text-red-600 font-medium">{error}</div>}

      {result && (
        <div className="mt-8 bg-white p-6 rounded-2xl shadow">
          <h2 className="text-2xl font-extrabold mb-4 text-gray-900">Items</h2>
          <ol className="list-decimal ml-6 space-y-3 text-gray-900">
            {result.items?.map((q: AssessmentItem, i: number) => (
              <li key={i}>
                <div className="font-medium text-gray-900">{q.question}</div>
                {q.options?.length ? (
                  <ul className="list-disc ml-6 text-sm text-gray-900">
                    {q.options.map((opt: string, j: number) => (
                      <li key={j}>{opt}</li>
                    ))}
                  </ul>
                ) : null}
              </li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
}
