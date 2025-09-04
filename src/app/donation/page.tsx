"use client";

import { useState } from "react";

export default function DonationPage() {
  const [amount, setAmount] = useState<number>(10);
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [status, setStatus] = useState<string | null>(null);

  function pay() {
    setStatus("Processing payment...");
    setTimeout(() => {
      setStatus(
        `Thank you! Your donation of $${amount.toFixed(2)} was received.`
      );
    }, 1000);
  }

  return (
    <div className="container mx-auto px-4 py-10 text-gray-900">
      <div className="page-hero mb-8 p-6 md:p-10">
        <span className="badge badge-success">Donation</span>
        <h1 className="text-3xl md:text-4xl font-extrabold mt-2 text-gray-900">
          Support Digital Inclusion
        </h1>
        <p className="text-gray-700 mt-1 max-w-2xl">
          Your donation helps bring accessible learning to everyone.
        </p>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow max-w-xl">
        <div className="grid gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-900">
              Name
            </label>
            <input
              className="mt-1 w-full rounded-lg border border-gray-300 p-2"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-900">
              Email
            </label>
            <input
              className="mt-1 w-full rounded-lg border border-gray-300 p-2"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-900">
              Amount (USD)
            </label>
            <div className="flex gap-2 mt-1">
              {[5, 10, 25, 50].map((v) => (
                <button
                  key={v}
                  onClick={() => setAmount(v)}
                  className={`px-4 py-2 rounded-full border text-sm font-semibold ${
                    amount === v
                      ? "bg-blue-600 text-white border-blue-600"
                      : "border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  ${v}
                </button>
              ))}
            </div>
            <input
              type="number"
              min={1}
              step={1}
              className="mt-2 w-full rounded-lg border border-gray-300 p-2"
              value={amount}
              onChange={(e) => setAmount(parseFloat(e.target.value || "0"))}
            />
          </div>
          <button
            onClick={pay}
            className="bg-blue-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-blue-700"
          >
            Donate
          </button>
          {status && (
            <div className="text-sm text-green-700 bg-green-50 border border-green-200 rounded-lg p-3">
              {status}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
