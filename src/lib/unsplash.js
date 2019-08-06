import get from "lodash-es/get";

const cache = new Map();

const searchUnsplash = async query => {
  const cached = cache.get(query);
  if (cached) {
    return cached;
  }

  if (query && query.length > 1) {
    const results = await fetch(
      `https://modus.app/unsplash?search=${window.encodeURI(query)}`
    ).then(res => res.json());
    const first = get(results, "results[0].urls.regular", null);
    cache.set(query, first);
    return first;
  }

  return null;
};

export default searchUnsplash;
