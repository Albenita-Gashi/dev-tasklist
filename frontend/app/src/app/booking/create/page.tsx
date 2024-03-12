"use client"
import { Button, DatePicker, DatePickerProps, Input, TimePicker } from "antd";
import { UserOutlined, FieldTimeOutlined, CalendarOutlined, ProductOutlined } from '@ant-design/icons';
import axios from "axios";
import { useState } from 'react';
import dayjs, { Dayjs } from "dayjs";


type BookingType1 = {
    id: number,
    doctor_name: string,
    end_time: string,
    service: string
    date: Date,
    start_time: string
}

export class BookingType {
    constructor(
        public doctor_name: string,
        public service: string,
        public date: Date,
        public start_time: string,
        public end_time: string
        ) { }
}

const BookingList: React.FC = () => {
    const [booking, setBooking] = useState<BookingType>(new BookingType('', '', '', '', ''));
    const [start_time, setStart_time] = useState<Dayjs>();
    const [end_time, setEnd_time] = useState<Dayjs>();
    const [date, setDate] = useState<Dayjs>();
    const [status, setStatus] = useState();

    const insertData = () => {
        axios.post("http://host.docker.internal:5000/api/bookings", booking).then((res) => {
            console.log(res);
        }).catch(e =>
            console.error('Error inserting data:', e)
        )
    }
    
    const onChangeDatePicker: DatePickerProps['onChange'] = (date, dateString) => {
        setDate(date)
        setBooking({ ...booking, date: date.format('YYYY-MM-DD')})
    };

    return (
        <section>
            <Input size="large"
                placeholder="Service" value={booking?.service}
                onChange={(e) => setBooking({ ...booking, service: e.target.value })}
                prefix={<ProductOutlined />}
            />
            <Input size="large"
                placeholder="Doctor Name" value={booking?.doctor_name}
                onChange={(e) => setBooking({ ...booking, doctor_name: e.target.value })}
                prefix={<UserOutlined />}
            />
            <TimePicker 
                placeholder="Start Time"
                size="large" 
                format="h:mm a" 
                onChange={(time: Dayjs, timeString: string) => {
                    setBooking({ ...booking, start_time: timeString}),
                    setStart_time(time)
                }}
                value = {start_time}
            />
            <TimePicker 
                placeholder="End Time"
                size="large" 
                format="h:mm a"
                onChange={(time: Dayjs, timeString: string) => {
                    setBooking({ ...booking, end_time: timeString }),
                    setEnd_time(time)
                }}
                value={end_time}
            />
            <DatePicker
                size="large"
                format={{
                    format: 'YYYY-MM-DD',
                    type: 'mask',
                }}
                value={date}
                onChange={onChangeDatePicker}
            />
            <Button type="primary" onClick={() => insertData()}>Book Appointment</Button>
        </section>
    );
};

export default BookingList;
