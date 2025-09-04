"use client";

import { useEffect, useState } from "react";

export default function OfflinePage() {
  const [isSupported, setIsSupported] = useState(false);
  const [status, setStatus] = useState("Checking service worker...");

  useEffect(() => {
    if (typeof window !== "undefined" && "serviceWorker" in navigator) {
      setIsSupported(true);
      navigator.serviceWorker.getRegistration().then((reg) => {
        if (reg) setStatus(`Service worker registered (scope: ${reg.scope})`);
        else setStatus("Service worker not registered yet.");
      });
    } else {
      setIsSupported(false);
      setStatus("Service workers are not supported in this browser.");
    }
  }, []);

  return (
    <div className="container mx-auto px-4 py-10 text-gray-900">
      <div className="page-hero mb-8 p-6 md:p-10">
        <span className="badge badge-warning">Offline</span>
        <h1 className="text-3xl md:text-4xl font-extrabold mt-2 text-gray-900">
          Offline Support
        </h1>
        <p className="text-gray-700 mt-1 max-w-2xl">
          Check service worker status and cache key materials for
          low-connectivity use.
        </p>
      </div>
      <div className="bg-white p-6 rounded-2xl shadow space-y-3">
        <div className="text-gray-900">
          <span className="font-semibold">Service Worker:</span> {status}
        </div>
        <div className="text-gray-900">
          <span className="font-semibold">Guide:</span> This app caches assets
          via a service worker. When online, visit key pages so they are
          available offline later.
        </div>
        <div className="text-gray-900">
          <span className="font-semibold">Tip:</span> Add to Home Screen for a
          fullscreen, app-like experience.
        </div>
      </div>
      <div className="mt-8 bg-white p-6 rounded-2xl shadow">
        <h2 className="text-2xl font-extrabold text-gray-900 mb-4">
          Offline Materials
          <span className="ml-3 badge badge-success">PWA Ready</span>
        </h2>
        <ul className="list-disc ml-6 space-y-2 text-gray-900">
          <li className="flex items-center justify-between">
            <span>Python Basics (TXT)</span>
            <div className="flex gap-2">
              <a
                href="/materials/python-basics.txt"
                download
                className="px-4 py-2 rounded-full bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700"
              >
                Download
              </a>
              <button
                onClick={async () => {
                  try {
                    const cache = await caches.open("manual-materials");
                    await cache.add("/materials/python-basics.txt");
                    alert("Cached for offline use!");
                  } catch (e) {
                    alert(
                      "Failed to cache. Please ensure service worker is active."
                    );
                  }
                }}
                className="px-4 py-2 rounded-full border border-gray-300 text-sm font-semibold hover:bg-gray-50"
              >
                Cache for Offline
              </button>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}
