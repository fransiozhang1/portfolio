// sw.js
const CACHE_NAME = 'weiyu-portfolio-v1';
const ASSETS = [
  './',
  './index.html',
  './main.html',
  './bg.png',
  './bg1.png',
  './bg2.png',
  './info.png'
];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.map(k => k !== CACHE_NAME && caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (e) => {
  const { request } = e;
  // 优先缓存，网络兜底：适合静态站
  e.respondWith(
    caches.match(request).then(cached => cached || fetch(request).then(resp => {
      // 动态加入缓存（忽略非 GET）
      if (request.method === 'GET' && resp.ok) {
        const copy = resp.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(request, copy));
      }
      return resp;
    }).catch(() => cached))
  );
});
