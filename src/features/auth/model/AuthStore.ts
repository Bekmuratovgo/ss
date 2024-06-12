import { createEvent, createStore } from "effector";
import { Profile } from "src/types/profile";

interface AuthState {
    isLogged: boolean;
    code: string;
    phone: string;
}

export const setLoggedState = createEvent<boolean>();
export const setAuthCode = createEvent<string>();
export const setAuthPhone = createEvent<string>();

export const $auth = createStore<AuthState>({
    isLogged: false,
    code: "",
    phone: "+996997129102",
})
    .on(setLoggedState, (state, isLogged) => ({...state, isLogged}))
    .on(setAuthCode, (state, code) => ({...state, code}))
    .on(setAuthPhone, (state, phone) => ({...state, phone}))
