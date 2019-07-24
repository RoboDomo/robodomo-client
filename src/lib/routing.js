// @ts-check

/**
 * Convert a string to a routing-compatible version
 * Only alphabet, numbers, and hyphens are acceptable
 * Returns lowercase, without spaces and symbols
 * @param {string} str
 * @return {string}
 */
const toRoute = str => str.replace(/[^a-zA-Z0-9/-]+/, "").toLowerCase();

export { toRoute };
