import { MailIcon } from "lucide-react";
import Link from "next/link";
import { AiFillFacebook, AiFillInstagram } from "react-icons/ai";

import { FaPhone } from "react-icons/fa6";
import { ThemeToggler } from "./ThemeToggler";
// import { IoIosMail } from "react-icons/io";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className='min-h-[60vh] w-screen duration-500 dark:border-t border-white  flex flex-col justify-between py-6 '>
      <div className=' md:flex justify-between items-start px-10'>
        <div className='flex md:hidden gap-2 md:gap-4 justify-center items-center'>
          <Link href={""}>
            <AiFillFacebook size={24} />
          </Link>
          <Link href={""}>
            <AiFillInstagram size={26} />
          </Link>
        </div>
        <div className='mt-12 md:mt-0'>
          <h1 className='text-xl font-bold mb-2 md:mb-4 tracking-wider'>
            Contact us
          </h1>
          <div className='flex flex-col gap-2'>
            <div className='flex gap-2 items-center mb-2'>
              <FaPhone size={16} />
              <Link href={"tel:"}>
                <p className='text-xs md:text-sm'>Phone: +960 </p>
              </Link>
            </div>
            <div className='flex gap-2 items-center mb-2'>
              <MailIcon size={16} />
              <Link href={"tel:"}>
                <p className='text-xs md:text-sm'>Email:</p>
              </Link>
            </div>
          </div>
        </div>

        <div className='hidden md:flex gap-2 md:gap-4 justify-center items-center'>
          <Link href={""}>
            <AiFillFacebook size={24} />
          </Link>
          <Link href={""}>
            <AiFillInstagram size={26} />
          </Link>
        </div>

        <div className='mt-12 md:mt-0 mb-24 md:mb-0'>
          <h1 className='text-xl font-bold mb-2 md:mb-4 tracking-wider'>
            Quick Links
          </h1>
          <div></div>
        </div>
      </div>
      <div className='text-center self-center'>
        <div className=''>
          <ThemeToggler />
          <h5 className='text-sm'>© {year} LVIS Hotels</h5>
        </div>

        <h5 className='text-xs text-gray-300 dark:text-gray-600 mt-2'>
          Developed by Ahmed Areef
        </h5>
      </div>
    </footer>
  );
}
