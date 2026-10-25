"use client";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import RoomType from "./RoomType";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";

export function DialogComponentRoomType({ data }: any) {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 gap-8 px-6 md:px-0 w-full'>
      {data.roomTypes?.map((room: any, index: number) => (
        <Dialog key={index}>
          <DialogTrigger asChild>
            <button
              type='button'
              className=' py-1 rounded-md cursor-pointer w-full'>
              <Image
                src={urlFor(room.roomCoverPhoto)}
                width={600}
                height={500}
                alt={room.roomType || "Room cover photo"}
                className='aspect-[4/3] object-cover rounded-md w-full'
              />

              <h5 className='text-base md:text-xl text-zinc-400 body-font text-center mt-2 capitalize'>
                {room.roomType}
              </h5>
            </button>
          </DialogTrigger>

          <DialogContent className='!fixed !left-0 !top-[5vh] !translate-x-0 !translate-y-0 !w-screen  !max-w-none !h-[90vh] md:!h-[95vh] !max-h-[95vh] !rounded-none p-6 overflow-y-auto'>
            <DialogHeader>
              <DialogTitle className='body-font text-center pt-6 text-base md:text-2xl text-zinc-400  capitalize'>
                {room.roomType}
              </DialogTitle>
              <DialogDescription></DialogDescription>
            </DialogHeader>

            <div className='overflow-y-auto md:max-h-[75vh] pb-6'>
              <RoomType roomTypeData={room} />
            </div>

            <DialogFooter>
              <DialogClose className='body-font text-red-600 cursor-pointer mt-4'>
                Close
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      ))}
    </div>
  );
}
