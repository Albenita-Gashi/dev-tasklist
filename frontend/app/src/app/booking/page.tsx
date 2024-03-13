"use client"
import BookingTable from "@/components/booking-table";
import { BookingTableType, BookingType } from "@/types/ModelTypes";
import axios from "axios";
import Link from "next/link";
import { useState, useEffect } from 'react';


const BookingList: React.FC = () => {

    const [bookings, setBookings] = useState<BookingType[] | []>([]);

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
    const buildData = () => {
        const data: BookingTableType[] = [];
        // if (bookings == null)
        //     return data;
        for (var item of bookings) {
            data.push(new BookingTableType(item.id, `A Booking on ${item.date} starting at ${item.start_time}`))
        }
        console.log(data);

        return data;
    }
    return (
        <section>
            <BookingTable data={buildData()} />
            {
                bookings != null ? bookings.map(item => {
                    return (
                        <div key={item.id}>

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
