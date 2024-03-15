"use client";
import React, { useState } from 'react';
import { BookOutlined, HomeOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import Link from 'next/link';

const items: MenuProps['items'] = [
    {
        label: (
            <Link href="/">
                Home
            </Link>
        ),
        key: 'home',
        icon: <HomeOutlined onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} />
    },
    {
        label: (
            <Link href="/booking" >
                Bookings
            </Link>
        ),
        key: 'bookings',
        icon: <BookOutlined onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} />,
    },
];

const NavMenu: React.FC = () => {
    const [current, setCurrent] = useState('mail');

    const onClick: MenuProps['onClick'] = (e) => {
        setCurrent(e.key);
    };

    return <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />;
};
const NavMenu1: React.FC = () => {
    return <div>Hi</div>
};
export default NavMenu;