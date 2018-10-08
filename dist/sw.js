/* Code Adapted from https://developers.google.com/web/fundamentals/primers/service-workers/ */
const cacheVer = 'rr-app-v2';
const urls = [
  '/',
  'index.html',
  'restaurant.html',
  'css/styles.css',
  'js/main.js',
  'js/dbhelper.js',
  'js/restaurant_info.js',
  'data/restaurants.json',
  'https://fonts.googleapis.com/css?family=Montserrat:300,400,700',
  'img/1.jpg',
  'img/2.jpg',
  'img/3.jpg',
  'img/4.jpg',
  'img/5.jpg',
  'img/6.jpg',
  'img/7.jpg',
  'img/8.jpg',
  'img/9.jpg',
  'img/10.jpg'
];

self.addEventListener('install', function(event) {
  // Perform install steps
  event.waitUntil(
    caches.open(cacheVer)
      .then(function(cache) {
        console.log('Opened cache');
        return cache.addAll(urls);
      })
  );
});
self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames){
      return Promise.all(
        cacheNames.filter(function(cacheName){
          return cacheName.startsWith('rr-') &&
                 cacheName != cacheVer;
        }).map(function(cacheName){
          return cache.delete(cacheName);
        })
      )
    })
  )
})
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // Cache hit - return response
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    )
  );
});
