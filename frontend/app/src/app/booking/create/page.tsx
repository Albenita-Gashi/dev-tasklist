"use client"
import { Button, DatePicker, DatePickerProps, Input, TimePicker, message, notification } from "antd";
import { UserOutlined, FieldTimeOutlined, CalendarOutlined, ProductOutlined } from '@ant-design/icons';
import axios from "axios";
import { useEffect, useState } from 'react';
import dayjs, { Dayjs } from "dayjs";
import { BookingType, NotificationType } from "@/types/ModelTypes";
import { useRouter } from "next/navigation";

const BookAppointment: React.FC = () => {
    const [booking, setBooking] = useState<BookingType>(new BookingType(1, '', '', '', '', ''));
    const [start_time, setStart_time] = useState<Dayjs>();
    const [end_time, setEnd_time] = useState<Dayjs>();
    const [date, setDate] = useState<Dayjs>();
    const router = useRouter();

    const openNotification = (type: NotificationType, title: string) => {
        notification.open({
            message: title,
            type: type
        });
    };

    const insertData = () => {
        axios.post("http://host.docker.internal:5000/api/bookings", booking).then((res) => {
            openNotification("success", "Booked Successfully!");
            setTimeout(() => {
                router.push("/booking");
            }, 2000);
        })
            .catch(e => {
                openNotification("error", "Something Went wrong! Please try again")
            })
    }

    const onChangeDatePicker: DatePickerProps['onChange'] = (date, dateString) => {
        setDate(date)
        setBooking({ ...booking, date: date.format('YYYY-MM-DD') })
    };
    return (
        <section className="book-wrapper">
            <div className="book">
                <div className="book-backgroundImg"></div>
                <p className="book-title">Book Appointment</p>
                <div className="book-inputs">
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
                    <DatePicker
                        size="large"
                        format={{
                            format: 'YYYY-MM-DD',
                            type: 'mask',
                        }}
                        value={date}
                        onChange={onChangeDatePicker}
                    />
                    <div>
                        <TimePicker
                            placeholder="Start Time"
                            size="large"
                            format="h:mm a"
                            onChange={(time, timeString) => {
                                setBooking({ ...booking, start_time: timeString[0] }),
                                    setStart_time(time)
                            }}
                            needConfirm={false}
                            value={start_time}
                        />
                        <TimePicker
                            placeholder="End Time"
                            size="large"
                            format="h:mm a"
                            onChange={(time, timeString) => {
                                setBooking({ ...booking, end_time: timeString[0] }),
                                    setEnd_time(time)
                            }}
                            needConfirm={false}
                            value={end_time}
                        />
                    </div>
                </div>
                <Button type="primary" size="large" className="book-button" onClick={() => insertData()}>Book Appointment</Button>
            </div>
        </section>
    );
};

export default BookAppointment;
