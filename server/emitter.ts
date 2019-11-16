import EventEmitter = require("events");
const GlobalEmitter = new EventEmitter();

const WS_READY = Symbol("WS_READY");
const CREATED_ROOM = Symbol("CREATED_ROOM");

export type TEmitter = typeof GlobalEmitter;
export { WS_READY, CREATED_ROOM };

export default GlobalEmitter;
