// async function getBookings() {
//   const res = await fetch('http://host.docker.internal:5000/api/bookings', { cache: 'no-store', mode: 'no-cors' })

import { Button } from "antd";
import Link from "next/link";
import image from "@/assets/images/do.jpg"
import Image from "next/image";
 
const Home: React.FC = async () => {

  return (
    <div className="home">
      <p className="home-title">Pabau Booking</p>
      <div className="home-backgroundImg"></div>
      <p className="home-subtitle">Book appointments with ease and convenience. Find the right doctor for your needs, schedule appointments hassle-free, and manage your medical visits effortlessly.</p>
      <Link href="/booking/create"><button className="home-button">Book Now</button></Link>
    </div>
  );
};

export default Home;
