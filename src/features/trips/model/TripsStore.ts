import { createEvent, createStore } from "effector";
import { Trips } from "src/types/trips";

interface TripsState {
    trips: Trips | null
};
const initialState: TripsState = {
    trips: null
}

export const setTrips = createEvent<Trips>();

export const $trips = createStore<TripsState>(initialState)
    .on(setTrips, (state, trips) => ({...state, trips}))
