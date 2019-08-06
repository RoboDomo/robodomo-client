import { useState, useEffect } from "react";
import get from "lodash-es/get";

const cache = new Map();

const useUnsplash = query => {
  const [result, setResult] = useState(null);

  useEffect(() => {
    const cached = cache.get(query);
    if (cached) {
      return cached;
    }

    if (!result && query && query.length > 1) {
      fetch(`https://modus.app/unsplash?search=${window.encodeURI(query)}`)
        .then(res => res.json())
        .then(res => {
          const first = get(res, "results[0].urls.regular", null);
          setResult(first);
          cache.set(query, first);
        });
    }
  }, [query, result]);

  return result;
};

export default useUnsplash;
