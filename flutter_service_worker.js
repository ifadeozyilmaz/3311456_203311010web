'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';
const RESOURCES = {
  "assets/AssetManifest.json": "74d080c9dc56aac1ae4246b61bbd3900",
"assets/assets/images/ABD.jpg": "fec1b6bc7c2e38a8425c9ca38f6c7375",
"assets/assets/images/Ala%25C3%25A7at%25C4%25B1.jpg": "325308c984688132f745518e6a5e3e77",
"assets/assets/images/Antalya.jpg": "308d57c68b107922ab393738fcee8c1d",
"assets/assets/images/Barcelona.jpg": "d4fdeeadaea088bd8cd52f8d176c2131",
"assets/assets/images/Bodrum.jpg": "c2fb411f3fdd2732fac8ea418f95d7cc",
"assets/assets/images/Brazil.jpg": "5a3adb8b9fda67ab1b8d2fad2daa5ea0",
"assets/assets/images/Cave%2520Hotel.jpg": "9fafdfcabf56ef1d9be951163283c31a",
"assets/assets/images/France.jpg": "23421ed04f916ca2624eb2db6c8d1dbe",
"assets/assets/images/Hillside.jpg": "2538b55a86959ca1c41bf1b98bd7fc5e",
"assets/assets/images/images2.jpg": "9cb554ed4433fa8285301deef5930847",
"assets/assets/images/istanbul.jpg": "91d48b8e6c90d083369ecf3e992af04d",
"assets/assets/images/Italy.jpg": "3af6ce37570e940bf1b6ca6e5cdc1625",
"assets/assets/images/izmir.jpg": "a1e858a90a75aef7431426a29841c950",
"assets/assets/images/Japan.jpg": "69428aa4d22de8cf35a706cdf2903cfe",
"assets/assets/images/Kapadokya.jpg": "f71c302438f38620dd96f24c80846423",
"assets/assets/images/Liberty%2520Hotel.jpg": "3104f838ecb5fdb21efa8160d7835ec9",
"assets/assets/images/login.jpeg": "94a5c0a60a367aa94e230275d14fabe2",
"assets/assets/images/Los%2520Angeles.jpg": "f607cb9d06cdac7d723c84fc010967d9",
"assets/assets/images/Maldives.jpg": "7dc111fe11cbd23751dbf48a70cc0edb",
"assets/assets/images/Milano.jpg": "0041afe36b6ea6ee8f2c45df39bf1799",
"assets/assets/images/Rif%2520Sapanca.jpg": "50982fb4e064855e2b5fe21d009f4c20",
"assets/assets/images/Salvador.jpg": "2510f7bb9205fef588adab0f38a67998",
"assets/assets/images/Sapanca.jpg": "5e5a9b04c9e16875b747f5937dba629c",
"assets/assets/images/Titanic%2520Hotel.jpg": "a7f8750a93764dcba71d119353f8341c",
"assets/assets/images/Tokyo.jpg": "c288b0adc2440e00a3146cd67c675712",
"assets/assets/images/turkey.jpg": "e0a9d1728c48371c914c215cdde4a3dc",
"assets/FontManifest.json": "dc3d03800ccca4601324923c0b1d6d57",
"assets/fonts/MaterialIcons-Regular.otf": "e7069dfd19b331be16bed984668fe080",
"assets/NOTICES": "1c1af7a96477dd23b121bf6b33c55714",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "6d342eb68f170c97609e9da345464e5e",
"canvaskit/canvaskit.js": "97937cb4c2c2073c968525a3e08c86a3",
"canvaskit/canvaskit.wasm": "3de12d898ec208a5f31362cc00f09b9e",
"canvaskit/profiling/canvaskit.js": "c21852696bc1cc82e8894d851c01921a",
"canvaskit/profiling/canvaskit.wasm": "371bc4e204443b0d5e774d64a046eb99",
"favicon.png": "5dcef449791fa27946b3d35ad8803796",
"flutter.js": "a85fcf6324d3c4d3ae3be1ae4931e9c5",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"icons/Icon-maskable-192.png": "c457ef57daa1d16f64b27b786ec2ea3c",
"icons/Icon-maskable-512.png": "301a7604d45b3e739efc881eb04896ea",
"index.html": "e657afe8a436f3166d75502d8e0555e5",
"/": "e657afe8a436f3166d75502d8e0555e5",
"main.dart.js": "cee4d3ba190bad1dea72e75c5b0d067c",
"manifest.json": "dc88405e281481033141c7407d24915a",
"version.json": "36e775b3019e846cc2f9d0a4a274c916"
};

// The application shell files that are downloaded before a service worker can
// start.
const CORE = [
  "main.dart.js",
"index.html",
"assets/AssetManifest.json",
"assets/FontManifest.json"];
// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});

// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});

// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache only if the resource was successfully fetched.
        return response || fetch(event.request).then((response) => {
          if (response && Boolean(response.ok)) {
            cache.put(event.request, response.clone());
          }
          return response;
        });
      })
    })
  );
});

self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});

// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}

// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
