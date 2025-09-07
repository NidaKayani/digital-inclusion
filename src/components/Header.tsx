"use client";

import { useState } from "react";
import Link from "next/link";
import { HeartIcon } from "./icons";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <nav className="container mx-auto px-3 sm:px-4 py-2 sm:py-3">
        <div className="flex justify-between items-center">
          <Link
            href="/"
            className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 flex items-center space-x-1 sm:space-x-2"
          >
            <HeartIcon className="text-blue-500" size={20} />
            <span className="hidden xs:inline">Digital Inclusion</span>
            <span className="xs:hidden">DI</span>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden lg:flex space-x-2">
            <a
              href="/ai-learning"
              className="nav-link px-4 py-2 font-medium text-gray-700 rounded-full hover:bg-blue-50 transition-colors"
            >
              AI Learning
            </a>
           
            <a
              href="/offline"
              className="nav-link px-4 py-2 font-medium text-gray-700 rounded-full hover:bg-blue-50 transition-colors"
            >
              Offline
            </a>
            <a
              href="/progress"
              className="nav-link px-4 py-2 font-medium text-gray-700 rounded-full hover:bg-blue-50 transition-colors"
            >
              Progress
            </a>
            <a
              href="/assessment"
              className="nav-link px-4 py-2 font-medium text-gray-700 rounded-full hover:bg-blue-50 transition-colors"
            >
              Assessment
            </a>
            <a
              href="/analytics"
              className="nav-link px-4 py-2 font-medium text-gray-700 rounded-full hover:bg-blue-50 transition-colors"
            >
              Analytics
            </a>
            <a
              href="/takeoff"
              className="nav-link px-4 py-2 font-medium text-gray-700 rounded-full hover:bg-blue-50 transition-colors"
            >
              Takeoff
            </a>
          </div>

          {/* Right side buttons */}
          <div className="flex items-center space-x-1 sm:space-x-2">
            <a
              href="/inspiration"
              className="hidden md:block nav-link px-3 sm:px-4 py-2 font-medium text-gray-700 rounded-full hover:bg-blue-50 transition-colors text-sm sm:text-base"
            >
              Inspiration
            </a>
            <a
              href="/donation"
              className="bg-blue-600 text-white px-3 sm:px-4 md:px-6 py-1.5 sm:py-2 rounded-full font-semibold shadow-md hover:bg-blue-700 transition-colors text-xs sm:text-sm md:text-base"
            >
              <span className="hidden sm:inline">DONATION</span>
              <span className="sm:hidden">DONATE</span>
            </a>
            
            {/* Mobile menu button */}
            <button
              onClick={toggleMobileMenu}
              className="lg:hidden p-1.5 sm:p-2 text-gray-700 hover:bg-gray-100 rounded-full transition-colors"
            >
              <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden mt-3 pb-3 border-t border-gray-200">
            <div className="flex flex-col space-y-1 pt-3">
              <a
                href="/ai-learning"
                className="nav-link px-3 py-2 font-medium text-gray-700 rounded-full hover:bg-blue-50 transition-colors text-sm"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                AI Learning
              </a>
              <a
                href="/learning"
                className="nav-link px-3 py-2 font-medium text-gray-700 rounded-full hover:bg-blue-50 transition-colors text-sm"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Learning
              </a>
              <a
                href="/offline"
                className="nav-link px-3 py-2 font-medium text-gray-700 rounded-full hover:bg-blue-50 transition-colors text-sm"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Offline
              </a>
              <a
                href="/progress"
                className="nav-link px-3 py-2 font-medium text-gray-700 rounded-full hover:bg-blue-50 transition-colors text-sm"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Progress
              </a>
              <a
                href="/assessment"
                className="nav-link px-3 py-2 font-medium text-gray-700 rounded-full hover:bg-blue-50 transition-colors text-sm"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Assessment
              </a>
              <a
                href="/analytics"
                className="nav-link px-3 py-2 font-medium text-gray-700 rounded-full hover:bg-blue-50 transition-colors text-sm"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Analytics
              </a>
              <a
                href="/takeoff"
                className="nav-link px-3 py-2 font-medium text-gray-700 rounded-full hover:bg-blue-50 transition-colors text-sm"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Takeoff
              </a>
              <a
                href="/inspiration"
                className="md:hidden nav-link px-3 py-2 font-medium text-gray-700 rounded-full hover:bg-blue-50 transition-colors text-sm"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Inspiration
              </a>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
