import { createEvent, createStore } from "effector";
import { Profile } from "src/types/profile";

type ProfileState = {
    profile: Profile | null
}

const initialState: ProfileState = {
    profile: null
}

export const setProfile = createEvent<Profile>();

export const $profile = createStore<ProfileState>(initialState)
    .on(setProfile, (state, profile) => ({...state, profile}));