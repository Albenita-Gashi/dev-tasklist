import React, { useEffect } from 'react';
import { Space, Table, Tag } from 'antd';
import { BookingTableType } from '@/types/ModelTypes';
import Link from 'next/link';
import type { TableProps } from 'antd';

const { Column, ColumnGroup } = Table;

const BookingTable = (props : any) => {
    const { data } = props;
    const columns: TableProps<BookingTableType>['columns'] = [
        {
            title: 'All Your Bookings',
            dataIndex: 'message',
            key: 'message',
            render: (text, record) => <Link href={"/booking/" + record.key}>{text}</Link>,
        },
    ]

    return (
        <Table columns={columns} dataSource={data}>
            <Column title="Booking" dataIndex="message" key="message" />
            <Column
                key="action"
                render={(_: any, record: BookingTableType) => (
                    <Space size="middle">
                        <a>Delete</a>
                    </Space>
                )}
            />
        </Table>
    );
}

export default BookingTable;