import { createEvent, createStore } from "effector";
// import { ISubscription } from 'src/types/subsciption';
import { ISubscriptionType } from "src/screens/subscription/subscription-response";

interface ISubscriptionState {
    data: ISubscriptionType[]
};

const initialState: ISubscriptionState = {
    data: []
}

export const setSubscriptionTypes = createEvent<ISubscriptionType[]>();

export const $subscription = createStore<ISubscriptionState>(initialState)
.on(setSubscriptionTypes, (state, data) => ({ ...state, data }));