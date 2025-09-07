"use client";

import { useEffect, useState, useCallback } from "react";
import BackButton from "@/components/BackButton";

interface OfflineMaterial {
  id: string;
  title: string;
  description: string;
  type: 'pdf' | 'txt' | 'video' | 'interactive';
  size: string;
  cached: boolean;
  downloadUrl: string;
  icon: string;
}

export default function OfflinePage() {
  const [mounted, setMounted] = useState(false);
  const [isSupported, setIsSupported] = useState(false);
  const [status, setStatus] = useState("Checking service worker...");
  const [cacheSize, setCacheSize] = useState(0);
  const [isOnline, setIsOnline] = useState(true);
  const [materials, setMaterials] = useState<OfflineMaterial[]>([
    {
      id: '1',
      title: 'Python Basics Guide',
      description: 'Complete introduction to Python programming fundamentals',
      type: 'txt',
      size: '2.3 MB',
      cached: false,
      downloadUrl: '/materials/python-basics.txt',
      icon: '🐍'
    },
    {
      id: '2',
      title: 'JavaScript Fundamentals',
      description: 'Essential JavaScript concepts and syntax',
      type: 'pdf',
      size: '4.1 MB',
      cached: false,
      downloadUrl: '/materials/javascript-fundamentals.pdf',
      icon: '⚡'
    },
    {
      id: '3',
      title: 'Web Development Cheat Sheet',
      description: 'Quick reference for HTML, CSS, and JavaScript',
      type: 'pdf',
      size: '1.8 MB',
      cached: false,
      downloadUrl: '/materials/web-dev-cheatsheet.pdf',
      icon: '🌐'
    },
    {
      id: '4',
      title: 'Data Structures & Algorithms',
      description: 'Common data structures and algorithm patterns',
      type: 'pdf',
      size: '5.2 MB',
      cached: false,
      downloadUrl: '/materials/dsa-guide.pdf',
      icon: '📊'
    }
  ]);

  const checkCacheStatus = useCallback(async () => {
    try {
      const cacheNames = await caches.keys();
      let totalSize = 0;
      
      for (const cacheName of cacheNames) {
        const cache = await caches.open(cacheName);
        const keys = await cache.keys();
        totalSize += keys.length;
      }
      
      setCacheSize(totalSize);
      
      // Check which materials are cached
      const updatedMaterials = await Promise.all(
        materials.map(async (material) => {
          try {
            const cache = await caches.open('offline-materials');
            const response = await cache.match(material.downloadUrl);
            return { ...material, cached: !!response };
          } catch {
            return material;
          }
        })
      );
      
      setMaterials(updatedMaterials);
    } catch (error) {
      console.error('Error checking cache status:', error);
    }
  }, [materials]);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    
    // Set initial online status
    setIsOnline(navigator.onLine);
    
    // Listen for online/offline events
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    if (typeof window !== "undefined" && "serviceWorker" in navigator) {
      setIsSupported(true);
      navigator.serviceWorker.getRegistration().then((reg) => {
        if (reg) {
          setStatus(`Service worker active (scope: ${reg.scope})`);
          checkCacheStatus();
        } else {
          setStatus("Service worker not registered yet.");
        }
      });
    } else {
      setIsSupported(false);
      setStatus("Service workers are not supported in this browser.");
    }
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [mounted, checkCacheStatus]);

  const cacheMaterial = async (material: OfflineMaterial) => {
    try {
      const cache = await caches.open('offline-materials');
      await cache.add(material.downloadUrl);
      
      // Update material status
      setMaterials(prev => 
        prev.map(m => 
          m.id === material.id ? { ...m, cached: true } : m
        )
      );
      
      alert(`${material.title} has been cached for offline use!`);
      checkCacheStatus();
    } catch (error) {
      alert(`Failed to cache ${material.title}. Please ensure you're online and try again.`);
    }
  };

  const clearCache = async () => {
    try {
      const cacheNames = await caches.keys();
      await Promise.all(
        cacheNames.map(cacheName => caches.delete(cacheName))
      );
      
      setMaterials(prev => prev.map(m => ({ ...m, cached: false })));
      setCacheSize(0);
      alert('Cache cleared successfully!');
    } catch (error) {
      alert('Failed to clear cache. Please try again.');
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'pdf': return '📄';
      case 'txt': return '📝';
      case 'video': return '🎥';
      case 'interactive': return '🎮';
      default: return '📁';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'pdf': return 'bg-red-100 text-red-600';
      case 'txt': return 'bg-blue-100 text-blue-600';
      case 'video': return 'bg-purple-100 text-purple-600';
      case 'interactive': return 'bg-green-100 text-green-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <div className="container mx-auto px-3 sm:px-4 py-6 sm:py-8 md:py-10 text-gray-900">
      <div className="page-hero mb-6 sm:mb-8 p-4 sm:p-6 md:p-10">
        <div className="flex items-start justify-between mb-4 sm:mb-6">
          <BackButton className="mt-1" />
        </div>
        <span className="badge badge-warning text-xs sm:text-sm">Offline</span>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mt-2 text-gray-900">
          Offline Learning Hub
        </h1>
        <p className="text-sm sm:text-base text-gray-700 mt-1 max-w-2xl">
          Download and cache learning materials for offline access. Perfect for low-connectivity environments.
        </p>
      </div>

      <div className="max-w-6xl mx-auto space-y-6 sm:space-y-8">
        {/* Service Worker Status */}
        <div className="bg-white p-4 sm:p-6 rounded-2xl shadow">
          <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">Offline Capabilities</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
            <div className="text-center p-4 bg-gray-50 rounded-xl">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">🔧</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Service Worker</h3>
              <p className={`text-sm ${isSupported ? 'text-green-600' : 'text-red-600'}`}>
                {mounted ? status : "Loading..."}
              </p>
            </div>
            
            <div className="text-center p-4 bg-gray-50 rounded-xl">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">💾</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Cache Status</h3>
              <p className="text-sm text-gray-600">
                {cacheSize} items cached
              </p>
            </div>
            
            <div className="text-center p-4 bg-gray-50 rounded-xl">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">📱</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">PWA Ready</h3>
              <p className="text-sm text-gray-600">
                Install for app-like experience
              </p>
            </div>
          </div>
        </div>

        {/* Offline Materials */}
        <div className="bg-white p-6 rounded-2xl shadow">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Learning Materials</h2>
            <button
              onClick={clearCache}
              className="px-4 py-2 bg-gray-600 text-white rounded-lg text-sm font-medium hover:bg-gray-700 transition-colors"
            >
              Clear Cache
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {materials.map((material) => (
              <div
                key={material.id}
                className={`p-6 rounded-xl border-2 transition-all duration-200 ${
                  material.cached
                    ? 'border-green-200 bg-green-50'
                    : 'border-gray-200 bg-white hover:border-gray-300'
                }`}
              >
                <div className="flex items-start space-x-4">
                  <div className="text-3xl">{material.icon}</div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h3 className="font-semibold text-gray-900">{material.title}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(material.type)}`}>
                        {getTypeIcon(material.type)} {material.type.toUpperCase()}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">{material.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">{material.size}</span>
                      <div className="flex space-x-2">
                        <a
                          href={material.downloadUrl}
                          download
                          className="px-3 py-1 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
                        >
                          Download
                        </a>
                        <button
                          onClick={() => cacheMaterial(material)}
                          disabled={material.cached}
                          className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                            material.cached
                              ? 'bg-green-600 text-white cursor-not-allowed'
                              : 'bg-gray-600 text-white hover:bg-gray-700'
                          }`}
                        >
                          {material.cached ? '✓ Cached' : 'Cache'}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Offline Tips */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-2xl border border-blue-200">
          <h2 className="text-xl font-bold text-gray-900 mb-4">💡 Offline Learning Tips</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Before Going Offline</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Download all materials you need</li>
                <li>• Complete any online assessments</li>
                <li>• Sync your progress</li>
                <li>• Check your device storage</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">While Offline</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Read downloaded materials</li>
                <li>• Practice with offline exercises</li>
                <li>• Take notes in a notebook</li>
                <li>• Review previous lessons</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Installation Guide */}
        <div className="bg-white p-6 rounded-2xl shadow">
          <h2 className="text-xl font-bold text-gray-900 mb-4">📱 Install as App</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Mobile (iOS/Android)</h3>
              <ol className="text-sm text-gray-600 space-y-1 list-decimal list-inside">
                <li>Open this page in your browser</li>
                <li>Tap the share button</li>
                <li>Select &quot;Add to Home Screen&quot;</li>
                <li>Tap &quot;Add&quot; to install</li>
              </ol>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Desktop (Chrome/Edge)</h3>
              <ol className="text-sm text-gray-600 space-y-1 list-decimal list-inside">
                <li>Click the install icon in address bar</li>
                <li>Or go to menu → &quot;Install app&quot;</li>
                <li>Click &quot;Install&quot; when prompted</li>
                <li>Launch from your desktop</li>
              </ol>
            </div>
          </div>
        </div>

        {/* Network Status */}
        <div className="bg-white p-6 rounded-2xl shadow">
          <h2 className="text-xl font-bold text-gray-900 mb-4">🌐 Network Status</h2>
          <div className="flex items-center space-x-4">
            <div className={`w-4 h-4 rounded-full ${isOnline ? 'bg-green-500' : 'bg-red-500'}`}></div>
            <span className="text-gray-700">
              {isOnline ? 'You are online' : 'You are offline'}
            </span>
            {!isOnline && (
              <span className="text-sm text-gray-500">
                - Offline mode active, using cached content
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}