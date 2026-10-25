import { client } from "@/sanity/lib/client";
import { MailIcon } from "lucide-react";
import Link from "next/link";
import { AiFillFacebook, AiFillInstagram } from "react-icons/ai";
import { FaWhatsapp } from "react-icons/fa";

import { IoLogoYoutube } from "react-icons/io";

import { FaPhone } from "react-icons/fa6";
// import { ThemeToggler } from "./ThemeToggler";
// import { IoIosMail } from "react-icons/io";

async function getContacts() {
  const query = `*[_type == "contacts"]{
    contactType,
    contact
  }`;
  const data = await client.fetch(query, {}, { next: { revalidate: 60 } });
  return data;
}

async function getAddress() {
  const query = `*[_type == "address"]{
    propertyAddress,
    city,
    country,
    postcode
  }`;
  const data = await client.fetch(query, {}, { next: { revalidate: 60 } });
  return data;
}

export default async function Footer() {
  const year = new Date().getFullYear();
  const contacts = await getContacts();
  const addressData = await getAddress();

  return (
    <footer className='min-h-[60vh] w-screen bg-zinc-50 duration-500 dark:border-t border-white  flex flex-col justify-between py-6 '>
      <div className=' md:flex justify-between items-start px-10 w-full md:w-[80vw] mx-auto mt-12 '>
        <div className='flex md:hidden gap-2 md:gap-4 justify-center items-center'>
          <Link href={"https://www.facebook.com/LVISblancura"}>
            <AiFillFacebook size={24} />
          </Link>
          <Link href={"https://www.instagram.com/lvishotels"}>
            <AiFillInstagram size={26} />
          </Link>
          <Link href={"https://www.youtube.com/@LVISMaldives"}>
            <IoLogoYoutube size={26} />
          </Link>
        </div>
        <div className='mt-12 md:mt-0'>
          <h1 className='text-zinc-600 text-base md:text-xl body-font mb-2 border-b-2 border-b-zinc-200 text-center '>
            Contact us
          </h1>
          <div className='flex flex-col items-center md:items-start gap-1'>
            <div className='flex gap-2 items-center mb-2'>
              <FaPhone size={16} />
              <Link href={`tel:${contacts[0].contact}`}>
                <p className='text-zinc-600 text-sm md:text-base body-font'>
                  Phone: {contacts[0].contact}
                </p>
              </Link>
            </div>
            <div className='flex gap-2 items-center mb-2'>
              <MailIcon size={16} />
              <Link href={`mailto:${contacts[1].contact}`}>
                <p className='text-zinc-600 text-sm md:text-base body-font'>
                  Email: {contacts[1].contact}
                </p>
              </Link>
            </div>

            <div className='flex gap-2 items-center mb-2'>
              <FaWhatsapp size={18} />

              <p className='text-zinc-600 text-sm md:text-base body-font'>
                WhatsApp: {contacts[2]?.contact}
              </p>
            </div>
          </div>
        </div>

        <div className='hidden md:flex gap-2 md:gap-4 justify-center items-center'>
          <Link href={"https://www.facebook.com/LVISblancura"}>
            <AiFillFacebook size={24} />
          </Link>
          <Link href={"https://www.instagram.com/lvishotels"}>
            <AiFillInstagram size={26} />
          </Link>
          <Link href={"https://www.youtube.com/@LVISMaldives"}>
            <IoLogoYoutube size={26} />
          </Link>
        </div>

        <div className='mt-12 md:mt-0 mb-24 md:mb-0'>
          <h1 className='text-zinc-600 text-base md:text-xl body-font mb-2 border-b-2 border-b-zinc-200  text-center md:text-start'>
            Address
          </h1>
          <div className=''>
            {addressData.map((address: any, index: number) => (
              <div
                key={index}
                className='flex flex-col gap-0 items-center md:items-start'>
                <p className='text-zinc-600 text-sm md:text-base body-font'>
                  {address.propertyAddress}
                </p>
                <p className='text-zinc-500 text-sm md:text-base body-font'>
                  {address.city}
                </p>
                <p className='text-zinc-500 text-sm md:text-base body-font'>
                  {address.country}
                </p>
                <p className='text-zinc-500 text-sm md:text-base body-font'>
                  {address.postcode}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className='text-center self-center '>
        <div className=''>
          {/* <ThemeToggler /> */}
          <h5 className='text-sm body-font'>© {year} LVIS Hotels</h5>
        </div>

        <h5 className='text-xs text-gray-300 dark:text-gray-600 mt-2'>
          Developed by Ahmed Areef
        </h5>
      </div>
    </footer>
  );
}
