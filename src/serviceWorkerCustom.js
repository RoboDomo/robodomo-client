/* eslint-ignore */
/* global workbox */
// uncoment for debugging
// workbox.core.setLogLevel(workbox.core.LOG_LEVELS.debug);

// right now these are precached so this route makes no difference.
// keeping it for future use
workbox.routing.registerRoute(
  new RegExp("/static/(css|js|media)/"),
  new workbox.strategies.CacheFirst({
    cacheName: "statics",
  })
);

workbox.routing.registerRoute(new RegExp("/.(?:html)$/"), new workbox.strategies.NetworkFirst());

// use the actual API source here
// workbox.routing.registerRoute(new RegExp('^https://api.momentum.rent/'), new workbox.strategies.NetworkFirst())

workbox.precaching.precacheAndRoute(self.__precacheManifest || [], {
  offlinePage: "/index.html", //<- in case of getting offline and not have cache content , redirect here
});

workbox.routing.setCatchHandler(({ event }) => {
  // The FALLBACK_URL entries must be added to the cache ahead of time, either via runtime
  // or precaching.
  // If they are precached, then call workbox.precaching.getCacheKeyForURL(FALLBACK_URL)
  // to get the correct cache key to pass in to caches.match().
  //
  // Use event, request, and url to figure out how to respond.
  // One approach would be to use request.destination, see
  // https://medium.com/dev-channel/service-worker-caching-strategies-based-on-request-types-57411dd7652c
  switch (event.request.destination) {
    case "document":
      return caches.match("/index.html");

    default:
      // If we don't have a fallback, just return an error response.
      return Response.error();
  }
});
