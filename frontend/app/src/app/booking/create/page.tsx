"use client"
import { Input } from "antd";
import { UserOutlined, FieldTimeOutlined, CalendarOutlined, ProductOutlined } from '@ant-design/icons';
import axios from "axios";
import Link from "next/link";
import { useState, useEffect } from 'react';


type BookingType = {
    id: number,
    doctor_name: string,
    end_time: string,
    service: string
    date: string,
    start_time: string
}

const BookingList: React.FC = () => {

    const [bookings, setBookings] = useState<BookingType[] | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            axios.get("http://host.docker.internal:5000/api/bookings").then((res) => {
                setBookings(res.data);
            }).catch(e =>
                console.error('Error fetching data:', e)
            )
        };
        fetchData();
    }, []);

    return (
        <section>
            <Input size="large" placeholder="service" prefix={<ProductOutlined />} />
            <Input size="large" placeholder="doctor_name" prefix={<UserOutlined />} />
            <Input size="large" placeholder="start_time" prefix={<FieldTimeOutlined />} />
            <Input size="large" placeholder="end_time" prefix={<FieldTimeOutlined />} />
            <Input size="large" placeholder="date" prefix={<CalendarOutlined />} />
        </section>
    );
};

export default BookingList;
