import { get } from "lodash-es";
import useConfig from "./useConfig";

/**
 * @param {string} key Nested object property (e.g. "weather.locations")
 * @returns {[Object[], Object]} group (array) and default item
 */
const useConfigGroup = key => {
  const config = useConfig();
  const group = get(config, key, null);

  if (!group || !Array.isArray(group)) {
    return [null, null];
  }

  const defaultItem = group.find(loc => loc.default === true) || group[0];

  return [group, defaultItem];
};

export default useConfigGroup;
