/* FretMaster — service worker: offline po instalacji (PWA).
   Rejestracja odbywa się w index.html TYLKO przy https/localhost
   (z file:// apka działa normalnie, ale bez service workera).

   WAŻNE (dla developera): przy każdej istotnej zmianie aplikacji
   podnieś CACHE_VERSION — stara pamięć podręczna zostanie usunięta,
   a użytkownicy dostaną świeże pliki. Format: data wydania. */
const CACHE_VERSION = 'fretmaster-cache-2026-09-10';
const ASSETS = [
  './',
  './index.html',
  './manifest.webmanifest',
  './icons/icon-32.png',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/icon-192-maskable.png',
  './icons/icon-512-maskable.png',
  './icons/apple-touch-icon.png'
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_VERSION)
      .then((c) => c.addAll(ASSETS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE_VERSION).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== location.origin) return;

  const cachePut = (res) => {
    const copy = res.clone();
    caches.open(CACHE_VERSION).then((c) => c.put(req, copy)).catch(() => {});
    return res;
  };

  // Nawigacja (otwarcie apki): najpierw sieć (żeby docierały aktualizacje),
  // a bez sieci — kopia z cache albo awaryjnie index.html.
  if (req.mode === 'navigate' || (req.headers.get('accept') || '').includes('text/html')) {
    e.respondWith(
      fetch(req)
        .then(cachePut)
        .catch(() =>
          caches.match(req, { ignoreSearch: true })
            .then((hit) => hit || caches.match('./index.html'))
        )
    );
    return;
  }

  // Pozostałe zasoby (ikony, manifest): najpierw cache, potem sieć (+zapis do cache).
  e.respondWith(
    caches.match(req, { ignoreSearch: true })
      .then((hit) => hit || fetch(req).then(cachePut))
  );
});
