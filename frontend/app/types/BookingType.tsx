export class BookingType {
    constructor(
        public doctor_name: string,
        public service: string,
        public date: string,
        public start_time: string,
        public end_time: string
        ) { }
}