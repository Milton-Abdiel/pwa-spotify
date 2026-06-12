const CACHE_NAME = 'spotify-cache-v1';

const urlsToCache = [

    './',

    'style.css',

    'app.js',

    'manifest.json',

    'playlist.jpg',

    'portada1.jpg',
    'portada2.jpg',
    'portada3.jpg',
    'portada4.jpg',
    'portada5.jpg',

    'cancion1.mp3',
    'cancion2.mp3',
    'cancion3.mp3',
    'cancion4.mp3',
    'cancion5.mp3',

    'iico-192.png',
    'iico-512.png'

];

self.addEventListener('install', event => {

    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(urlsToCache))
    );

});

self.addEventListener('fetch', event => {

    event.respondWith(
        caches.match(event.request)
            .then(response => response || fetch(event.request))
    );

});