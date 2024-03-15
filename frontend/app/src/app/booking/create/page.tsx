"use client"
import { Button, DatePicker, DatePickerProps, Input, TimePicker, message, notification } from "antd";
import { UserOutlined, FieldTimeOutlined, CalendarOutlined, ProductOutlined } from '@ant-design/icons';
import axios, { AxiosResponse } from "axios";
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
        axios.post("http://host.docker.internal:5000/api/bookings", booking).then((res : AxiosResponse) => {
            openNotification("success", "Booked Successfully!");
            setTimeout(() => {
                router.push("/booking");
            }, 2000);
        }).catch((e : any) => {
            openNotification("error", e.response.data.error)
        })
    }

    const onChangeDatePicker: DatePickerProps['onChange'] = (date : Dayjs) => {
        setDate(date)
        if (date == null)
            setBooking({ ...booking, date: '' })
        else
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
                        onChange={(e : React.ChangeEvent<HTMLInputElement>) => setBooking({ ...booking, service: e.target.value })}
                        prefix={<ProductOutlined onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} />}
                    />
                    <Input size="large"
                        placeholder="Doctor Name" value={booking?.doctor_name}
                        onChange={(e : React.ChangeEvent<HTMLInputElement>) => setBooking({ ...booking, doctor_name: e.target.value })}
                        prefix={<UserOutlined onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} />}
                    />
                    <DatePicker
                        size="large"
                        format={{
                            format: 'YYYY-MM-DD',
                            type: 'mask',
                        }}
                        value={date}
                        onChange={onChangeDatePicker}
                        minDate={dayjs(dayjs().format('YYYY-MM-DD'), "YYYY-MM-DD")}
                    />
                    <div>
                        <TimePicker
                            placeholder="Start Time"
                            size="large"
                            format="hh:mm a"
                            onChange={(time : any, timeString : string | string[]) => {
                                setBooking({ ...booking, start_time: timeString.toString().toUpperCase() }),
                                    setStart_time(time),
                                    console.log(timeString);
                            }}
                            needConfirm={false}
                            value={start_time}
                        />
                        <TimePicker
                            placeholder="End Time"
                            size="large"
                            format="hh:mm a"
                            onChange={(time : any, timeString : string | string[]) => {
                                setBooking({ ...booking, end_time: timeString.toString().toUpperCase() }),
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
