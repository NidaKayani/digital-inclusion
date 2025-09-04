"use client";

import { HeartIcon } from "./icons";

export default function Header() {
  return (
    <header className="bg-white shadow-sm">
      <nav className="container mx-auto px-4 py-3 flex justify-between items-center">
        <a
          href="#"
          className="text-2xl font-bold text-gray-900 flex items-center space-x-2"
        >
          <HeartIcon className="text-blue-500" size={24} />
          <span>Digital Inclusion</span>
        </a>
        <div className="hidden md:flex space-x-2">
          <a
            href="/learning"
            className="nav-link px-4 py-2 font-medium text-gray-700 rounded-full hover:bg-blue-50 transition-colors"
          >
            Learning
          </a>
          <a
            href="/offline"
            className="nav-link px-4 py-2 font-medium text-gray-700 rounded-full hover:bg-blue-50 transition-colors"
          >
            Offline
          </a>
          <a
            href="/assessment"
            className="nav-link px-4 py-2 font-medium text-gray-700 rounded-full hover:bg-blue-50 transition-colors"
          >
            Progress
          </a>
          <a
            href="#"
            className="nav-link px-4 py-2 font-medium text-gray-700 rounded-full hover:bg-blue-50 transition-colors"
          >
            Assessment
          </a>
          <a
            href="#"
            className="nav-link px-4 py-2 font-medium text-gray-700 rounded-full hover:bg-blue-50 transition-colors"
          >
            Analytics
          </a>
          <a
            href="#"
            className="nav-link px-4 py-2 font-medium text-gray-700 rounded-full hover:bg-blue-50 transition-colors"
          >
            Takeoff
          </a>
        </div>
        <a
          href="/inspiration"
          className="nav-link px-4 py-2 font-medium text-gray-700 rounded-full hover:bg-blue-50 transition-colors"
        >
          Inspiration
        </a>
        <a
          href="/donation"
          className="bg-blue-600 text-white px-6 py-2 rounded-full font-semibold shadow-md hover:bg-blue-700 transition-colors"
        >
          DONATION
        </a>
      </nav>
    </header>
  );
}
