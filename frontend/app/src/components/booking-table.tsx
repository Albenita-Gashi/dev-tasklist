import React, { useEffect } from 'react';
import { Button, Popconfirm, Space, Table, Tag } from 'antd';
import { BookingTableType } from '@/types/ModelTypes';
import Link from 'next/link';
import type { TableProps } from 'antd';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const { Column, ColumnGroup } = Table;

const BookingTable = (props: any) => {
    const { data } = props;
    const router = useRouter();
    const confirm = (id: number) => {
        axios.delete("http://host.docker.internal:5000/api/bookings/" + id).then(() => {
            props.deleted()
        }).catch((e) => console.error(e))
    };
    return (
        <Table dataSource={data}>
            <Column title="Booking"
                render={(_: any, record: BookingTableType) => (
                    <Space size="middle">
                        <Link href={"/booking/" + record.key}>{record.message}</Link>
                    </Space>
                )}
                dataIndex="message" key="message" />
            <Column
                fixed="right"
                width={100}
                title={
                    <Space align="end">
                        <Button type='primary' className='book-button' onClick={() => router.push("/booking/create")}>Book Appointment</Button>
                    </Space>
                }
                key="action"
                render={(_: any, record: BookingTableType) => (
                    <Space align="end" size="middle">
                        <Popconfirm
                            title="Cancel Booking"
                            description="Are you sure to cancel this booking?"
                            onConfirm={() => confirm(record.key)}
                            okText="Yes"
                            cancelText="No"
                        >
                            <Button danger>Delete</Button>
                        </Popconfirm>
                    </Space>
                )}
            />
        </Table>
    );
}

export default BookingTable;