'use client';

import { useEffect } from 'react';

export function usePWA() {
  useEffect(() => {
    // Check if the browser supports Service Workers
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        // Register the service worker, which handles offline capabilities
        navigator.serviceWorker.register('/service-worker.js')
          .then(registration => {
            console.log('Service Worker registered with scope:', registration.scope);
          })
          .catch(error => {
            console.error('Service Worker registration failed:', error);
          });
      });
    } else {
      console.log('Service Workers are not supported by this browser.');
    }
  }, []);
}
