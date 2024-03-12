"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import axios from 'axios';

type BookingType = {
    doctor_name: string,
    end_time: string,
    service: string
}

const BookingList: React.FC = ({ params }: { params: { id: number } }) => {
    const router = useRouter();
    const { id } = params;
    const [booking, setBooking] = useState<BookingType | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            axios.get('http://host.docker.internal:5000/api/booking/' + id).then((res) => {
                setBooking(res.data);
            }).catch(e =>
                console.error('Error fetching data:', e)
            )
        };
        if (id) {
            fetchData();
        }
    }, [id]);

    const handleBack = () => {
        router.push("/");
    };

    if (!booking) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            <p>This Booking is with {booking.doctor_name} For {booking.service} and it ends on {booking.end_time}</p>
            <button onClick={() => handleBack()}>Back</button>
        </div>
    );
};

export default BookingList;
