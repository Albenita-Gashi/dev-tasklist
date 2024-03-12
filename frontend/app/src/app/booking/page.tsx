"use client"
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
            {
                bookings != null ? bookings.map(item => {
                    return (
                        <div key={item.id}>
                            <Link href={"/booking/" + item.id}>A Booking on {item.date} starting at {item.start_time}</Link>
                        </div>
                    )
                }) : (
                    <p>No bookings found</p>
                )
            }
        </section>
    );
};

export default BookingList;
