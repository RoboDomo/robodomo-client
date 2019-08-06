import allMessages from "./stateBank";

/**
 * Get a random message
 * If filter is set (array) then filter by topics
 *
 * @param {string[]} filter  Array of topics
 */
const getRandomMessage = filter => {
  return Array.isArray(filter) && filter.length
    ? allMessages.filter(([topic]) => filter.includes(topic))
    : allMessages;
};

// eslint-disable-next-line no-restricted-globals
addEventListener("message", event => {
  console.log(event.data, getRandomMessage(event.data));

  // execute payload functions
  const messages = getRandomMessage(event.data).map(([topic, payload]) => [
    topic,
    typeof payload == "function" ? payload() : payload,
  ]);

  postMessage(messages);
});
