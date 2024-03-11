import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

type BookingType = {
    doctor_name: string,
    end_time: string,
    service : string
}

async function getBooking(id) {
    const res = await fetch('http://host.docker.internal:5000/api/booking/' + id, { cache: 'no-store', mode: 'no-cors' })

    if (!res.ok) {
        throw new Error('Failed to fetch data')
    }

    return res.json()
}

const BookingList: React.FC = () => {
    const router = useRouter();
    const { id } = router.query;
    const [booking, setBooking] = useState<BookingType | null>(null);
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const bookingData = await getBooking(id);
                setBooking(bookingData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        if (id) {
            fetchData();
        }
    }, [id]);

    const handleBack = () => {
        router.push("/"); // assuming you want to go to the root page
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
