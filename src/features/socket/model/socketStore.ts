import { createEvent, createStore } from "effector";

export const setSocket = createEvent<any>();

export const $socket = createStore({ socket: null })
    .on(setSocket, (state, socket) => ({...state, socket}));