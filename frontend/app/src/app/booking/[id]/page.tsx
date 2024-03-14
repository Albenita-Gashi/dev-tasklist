"use client";
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { BookingType } from '@/types/ModelTypes';
import { Button, Card } from 'antd';

const BookingList: React.FC = ({ params }: any) => {
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
        router.push("/booking");
    };

    if (!booking) {
        return <p>Loading...</p>;
    }

    return (
        <div className='bookedCard'>
            <div className='book-backgroundImg'></div>
            <Card
                title={"Doctor: " + booking.doctor_name}
                bordered={false}
                actions={[
                    <Button type='primary' className='book-button' key={booking.id} onClick={() => handleBack()}>Back</Button>
                ]}>
                <p className='bookedCard-description'>This Booking is with <b>{booking.doctor_name}</b> For <b>{booking.service}</b> and it ends on <b>{booking.end_time}</b></p>
            </Card>
        </div>
    );
};

export default BookingList;
