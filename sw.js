// AgriTech Service Worker v1.0
// Permite uso offline y mejora rendimiento en móviles

const CACHE_NAME = 'agritech-v1';
const ASSETS = [
  '/',
  '/index.html',
  'https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.1/chart.umd.min.js',
  'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:wght@300;400;500;600&family=JetBrains+Mono:wght@400;600&display=swap'
];

// Instalación: cachear todos los assets
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('[SW] Cacheando assets...');
      return cache.addAll(ASSETS).catch(err => {
        console.warn('[SW] No se pudo cachear algunos assets:', err);
      });
    })
  );
  self.skipWaiting();
});

// Activación: limpiar caches viejos
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// Fetch: cache-first para assets, network-first para datos
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);
  
  // Siempre usar red para navegación principal (datos frescos)
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request).catch(() => caches.match('/index.html'))
    );
    return;
  }
  
  // Cache-first para CDN assets (Chart.js, fuentes)
  if (url.hostname.includes('cloudflare') || url.hostname.includes('googleapis')) {
    event.respondWith(
      caches.match(event.request).then(cached => {
        if (cached) return cached;
        return fetch(event.request).then(response => {
          if (response.ok) {
            const clone = response.clone();
            caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
          }
          return response;
        }).catch(() => cached);
      })
    );
    return;
  }
  
  // Network-first para todo lo demás
  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request))
  );
});
