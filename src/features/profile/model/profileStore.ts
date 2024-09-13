import { createEvent, createStore } from "effector";
import { Profile } from "src/types/profile";

type ProfileState = {
    profile: Profile | null
}

const initialState: ProfileState = {
    profile: {
        _id: "66e01cb0ddb56add00f1379c", 
        code: null, 
        firstName: "N",
        lastName: "B", 
        middleName: "", 
        phone_number: "+7500400403"
    }
}

export const setProfile = createEvent<Profile>();

export const $profile = createStore<ProfileState>(initialState)
    .on(setProfile, (state, profile) => ({...state, profile}));