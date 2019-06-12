
const PRECACHE = "precache-v1";
const RUNTIME = "runtime";
const PRECACHE_URLS = [
    "css/style.css",
    "css/app.css"
];

self.addEventListener("install", function(event) {
    event.waitUntil(
        caches.open(PRECACHE)
            .then(function(cache) {cache.addAll(PRECACHE_URLS)})
            .then(self.skipWaiting())
    );
});

// The activate handler takes care of cleaning up old caches.
self.addEventListener("activate", function(event) {
    const currentCaches = [PRECACHE, RUNTIME];
    event.waitUntil(
        caches.keys().then(function(cacheNames) {
            return cacheNames.filter(function(cacheName) { !currentCaches.includes(cacheName) });
        }).then(function(cachesToDelete) {
            return Promise.all(cachesToDelete.map(function(cacheToDelete) {
                return caches.delete(cacheToDelete);
            }));
        }).then(function() { self.clients.claim() })
    );
});

self.addEventListener("fetch", function(event) {
    event.respondWith(
        caches.match(event.request)
            .then(function(response) {
                if (response) {
                    return response;
                }

                var fetchRequest = event.request.clone();

                return fetch(fetchRequest).then(
                    function(response) {
                        // Check if we received a valid response
                        if (!response || response.status !== 200 || response.type !== "basic") {
                            return response;
                        }

                        var responseToCache = response.clone();

                        caches.open(PRECACHE)
                            .then(function(cache) {
                                try {
                                    cache.put(event.request, responseToCache)
                                } catch(e) {}
                            });

                        return response;
                    }
                );
            })
    );
});
