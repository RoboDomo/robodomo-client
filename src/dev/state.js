import { Store, set as setVal, clear, keys, get as getVal } from "idb-keyval";

const state = new Store("robodomo", "robodomo-demo-state");

const set = (key, val) => setVal(key, val, state);

const get = key => getVal(key, state);

const reset = () => clear(state);

const getState = async () => {
  const topics = await keys(state);
  const messages = new Map(topics.map(async topic => [topic, await getVal(topic, state)]));
  return messages;
};

// prettier-ignore
export {
  set,
  get,
  reset,
  getState
}
