export interface Trips {
    _id?: string;
    order_id: number,
    order_start: string
    order_end: string
    order_start_full:string
    order_end_full: string
    order_tarif:string
    isUrgent: boolean
    order_count_peeple: number
    order_count_bags: number
    order_create_date:string
    order_date: string
    order_time: string
    order_comment: string
    order_clien_phone: string
    order_price: number
    order_commission: string
    order_additional: string[]
    order_buster: boolean,
    order_animals: boolean,
    order_baby_chair: boolean,
    order_status: string
    order_dispatcher:number
    order_driver: any
    __v: number
  }
  