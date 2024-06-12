export type CreateOrderDto = {
    from: string;
    to: string;
    fulladressstart: string;
    fulladressend: string;
    date: string;
    time: string;
    tariffId: string;
    isUrgent : boolean;
    additional?: any;
    countPeople: string;
    isBagage: string;
    isBaby: boolean;
    isBuster: boolean;
    isAnimal: boolean;
    comment: string;
    full_price?: string;
    phone_number: string;
 
}