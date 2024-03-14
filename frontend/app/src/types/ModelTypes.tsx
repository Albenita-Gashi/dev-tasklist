import { LinkProps } from "next/link";

export class BookingType {
    constructor(
        public id : number,
        public doctor_name: string,
        public service: string,
        public date: string,
        public start_time: string,
        public end_time: string
    ) { }
}

export class BookingTableType {
    constructor(
        public key: number,
        public message: string,
    ) { }
}

export type NotificationType = 'success' | 'info' | 'warning' | 'error';