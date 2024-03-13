"use client"
import { Button, DatePicker, DatePickerProps, Input, TimePicker, message, notification } from "antd";
import { UserOutlined, FieldTimeOutlined, CalendarOutlined, ProductOutlined } from '@ant-design/icons';
import axios from "axios";
import { useEffect, useState } from 'react';
import dayjs, { Dayjs } from "dayjs";
import { BookingType } from "@/types/ModelTypes";

type NotificationType = 'success' | 'info' | 'warning' | 'error';

const BookingList: React.FC = () => {
    const [booking, setBooking] = useState<BookingType>(new BookingType(1, '', '', '', '', ''));
    const [start_time, setStart_time] = useState<Dayjs>();
    const [end_time, setEnd_time] = useState<Dayjs>();
    const [date, setDate] = useState<Dayjs>();
    const [status, setStatus] = useState<boolean>(false);
    const [statusMessage, setStatusMessage] = useState<string>("");
    const [api, contextHolder] = notification.useNotification();

    useEffect(() => {
        console.log("status");
        
        openNotification("success", "Booked Successfully!", statusMessage);
    }, [status])

    const openNotification = (type: NotificationType, title: string, message: string) => {
        notification.open({
            message: title,
            description: message,
        });
    };
    const insertData = () => {
        axios.post("http://host.docker.internal:5000/api/bookings", booking).then((res) => {
            console.log(res);
            setStatus(!status)
            setStatusMessage(res.data)
            // openNotification1();
            // openNotification("success", "Booked Successfully!", res.data);
        }).catch(e =>
            openNotification("error", "Error inserting data!", e)
        )
    }

    const onChangeDatePicker: DatePickerProps['onChange'] = (date, dateString) => {
        setDate(date)
        setBooking({ ...booking, date: date.format('YYYY-MM-DD') })
    };
    const openNotification1 = () => {
        notification.open({
          message: 'Notification Title',
          description:
            'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
          onClick: () => {
            console.log('Notification Clicked!');
          },
        });
      };
    return (
        <section>
            <Button type="primary" onClick={openNotification1}>
                Open the notification box
            </Button>
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
            <TimePicker
                placeholder="Start Time"
                size="large"
                format="h:mm a"
                onChange={(time: Dayjs, timeString: string) => {
                    setBooking({ ...booking, start_time: timeString }),
                        setStart_time(time)
                }}
                value={start_time}
            />
            <TimePicker
                placeholder="End Time"
                size="large"
                format="h:mm a"
                onChange={(time: Dayjs, timeString: string) => {
                    setBooking({ ...booking, end_time: timeString }),
                        setEnd_time(time)
                }}
                value={end_time}
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
            <Button type="primary" onClick={() => insertData()}>Book Appointment</Button>
        </section>
    );
};

export default BookingList;
