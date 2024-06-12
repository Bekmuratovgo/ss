import { PaymentMethodEnum } from "./paymentMethod.enum";

export type Order = {
    departure: {
        city: string;
        lat?: number;
        lot?: number;
        address: string;
    };
    additionalArrivals: Array<{
        city: string;
        lat?: number;
        lon?: number;
        address: string;
    }>;
    arrival: {
        city: string;
        lat?: number;
        lot?: number;
        address: string;
    };
    newArrivals: Array<{
        city: string;
        address: string;
        lat?: number;
        lot?: number;
    }>;
    params: {
        babyChair: boolean;
        buster: boolean;
        animalTransfer: boolean;
    };
    date: Date;
    carClass: number;
    baggage: string;
    index?: number;
    additional: string[];
    passangersAmount: string;
    comment: string;
    price: number | null;
    paymentMethod: PaymentMethodEnum;
    distance?: string;
    isUrgent: boolean;
};

export type EditingOrder = {
    departure: {
        city: string;
        address: string;
    };
    arrival: {
        city: string;
        address: string;
    };
};
