// @ts-check

/**
 * @template T
 * @param {T[]} arr Array
 * @return {T} Random item from the array
 */
const randomItem = arr => arr[Math.floor(Math.random() * arr.length)];

/**
 * @return {"on" | "off"} Random on/off
 */
const onOrOff = () => (Math.random() < 0.5 ? "off" : "on");

/**
 * @return {number} Random temperature in F
 */
const randomTemp = () => Math.floor(Math.random() * 60 + 60);

/**
 * @param {number} max Maximum number
 * @return {number} Random number lower than or equal to max
 */
const randomPositive = max => Math.ceil(Math.random() * max);

export { onOrOff, randomTemp, randomPositive, randomItem };
