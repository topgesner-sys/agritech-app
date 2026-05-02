// AgriTech Service Worker v10 - SELF DESTRUCT
// This version unregisters itself to force fresh page loads
self.addEventListener('install', function(e){
  self.skipWaiting();
});

self.addEventListener('activate', function(e){
  e.waitUntil(
    // Clear ALL caches
    caches.keys().then(function(keys){
      return Promise.all(keys.map(function(key){ return caches.delete(key); }));
    }).then(function(){
      // Unregister this service worker
      return self.registration.unregister();
    }).then(function(){
      // Force all clients to reload
      return self.clients.matchAll({ type: 'window' });
    }).then(function(clients){
      clients.forEach(function(client){ client.navigate(client.url); });
    })
  );
});

// Pass all requests through without caching
self.addEventListener('fetch', function(e){
  e.respondWith(fetch(e.request));
});
