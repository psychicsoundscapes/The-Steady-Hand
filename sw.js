const CACHE_NAME = 'tsh-cache-v24';
const ASSETS = [
  './',
  './index.html',
  './app.js',
  './styles.css',
  './manifest.json',
  './translations.js',
  './translations2.js',
  './translations3.js',
  './translationprivacy.js',
  './translationtos.js',
  './verses.js',
  './trophies.js',
  './vendor/lucide-0.468.0.js',
  './privacy.html',
  './tos.html',
  './picture/tsh.PNG'
];

// Install event: cache assets
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    }).then(() => self.skipWaiting())
  );
});

// Activate event: clean up old caches
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch event: network first falling back to cache
self.addEventListener('fetch', (e) => {
  const url = new URL(e.request.url);
  
  // Do not intercept or cache API requests to the Cloudflare Worker
  if (url.pathname.startsWith('/api/') || e.request.method !== 'GET') {
    return;
  }

  e.respondWith(
    fetch(e.request)
      .then((response) => {
        // If valid response, clone and update cache
        if (response && response.status === 200 && response.type === 'basic') {
          const responseToCache = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(e.request, responseToCache)).catch(() => {});
        }
        return response;
      })
      .catch(async () => {
        // Fallback to cache if network fails
        const cachedResponse = await caches.match(e.request, { ignoreSearch: true });
        if (cachedResponse) return cachedResponse;
        if (e.request.mode === 'navigate') return caches.match('./index.html');
        return Response.error();
      })
  );
});
