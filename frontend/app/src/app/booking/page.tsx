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
        for (var item of bookings) {
            data.push(new BookingTableType(item.id, `A Booking on ${item.date.split("T")[0]} starting at ${item.start_time}`))
        }
        return data;
    }
    return (
        <section className="bookings">
            <div>
                <BookingTable data={buildData()} />
            </div>
        </section>
    );
};

export default BookingList;
