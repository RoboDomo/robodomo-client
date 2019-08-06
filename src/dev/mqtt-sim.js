import { get } from "./state";

/**
 * Get a random message
 * If filter is set (array) then filter by topics
 *
 * @param {string[]} filter  Array of topics
 */
const getRandomMessage = async filter => {
  let messages;

  if (Array.isArray(filter) && filter.length === 1) {
    // try getting value from state
    const topic = filter[0];
    const state = await get(topic);

    if (state) {
      messages = [[topic, state]];
    }
  }
  if (!messages) {
    // collect all the possible random payloads if not in state
    messages = await new Promise(resolve => {
      const getRandomMsgWorker = new Worker("./getMessageWorker.js", { type: "module" });
      getRandomMsgWorker.onmessage = event => {
        console.log(event.data);
        resolve(event.data);
      };
      getRandomMsgWorker.postMessage(filter);
    });
  }

  if (!messages.length) {
    return null;
  }

  const index = Math.floor(Math.random() * messages.length);

  const [topic, payload] = messages[index];

  const extractedPayload = typeof payload == "function" ? payload() : payload;

  if (
    ["[object Array]", "[object Object]"].includes(Object.prototype.toString.call(extractedPayload))
  ) {
    // stringify arrays and objects
    return [topic, JSON.stringify(extractedPayload)];
  }

  // call functions for value randomization
  return [topic, typeof payload == "function" ? payload() : payload];
};

export { getRandomMessage };
