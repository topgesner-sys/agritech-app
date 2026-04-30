// AgriTech Service Worker v5 - Smart Update Handler
const CACHE = 'agritech-v8';
const ASSETS = ['/', '/index.html'];

self.addEventListener('install', function(e){
  self.skipWaiting();
  e.waitUntil(
    caches.open(CACHE).then(function(cache){
      return cache.addAll(ASSETS).catch(function(){});
    })
  );
});

self.addEventListener('activate', function(e){
  e.waitUntil(
    caches.keys().then(function(keys){
      return Promise.all(keys.filter(function(k){ return k !== CACHE; }).map(function(k){ return caches.delete(k); }));
    })
  );
  self.clients.claim();
  // Notify all clients that app was updated
  self.clients.matchAll().then(function(clients){
    clients.forEach(function(client){
      client.postMessage({ type: 'APP_UPDATED' });
    });
  });
});

// Network first, cache fallback
self.addEventListener('fetch', function(e){
  if(e.request.method !== 'GET') return;
  e.respondWith(
    fetch(e.request).then(function(response){
      var clone = response.clone();
      caches.open(CACHE).then(function(cache){ cache.put(e.request, clone); });
      return response;
    }).catch(function(){
      return caches.match(e.request);
    })
  );
});
