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

async function getBookings() {
    const res = await fetch('http://host.docker.internal:5000/api/bookings', { cache: 'no-store', mode: 'no-cors' })
    console.log(res);
    
    // if (!res.ok) {
    //     throw new Error('Failed to fetch data')
    // }

    return res.json()
}

const BookingList: React.FC = () => {

    const [bookings, setBookings] = useState<BookingType[] | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                axios.get("http://host.docker.internal:5000/api/bookings").then((res) => {
                    setBookings(res.data);
                })
                //const bookingData = await getBookings();
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    return (
        <div>
            {
                bookings != null ? bookings.map(item => {
                    return (
                        <div key={item.id}>
                            <Link href={"booking/" + item.id}>A Booking on {item.date} starting at {item.start_time}</Link>
                        </div>
                    )
                }) : (
                    <p>No bookings found</p>
                )
            }
        </div>
    );
};

export default BookingList;
