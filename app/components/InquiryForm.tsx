"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
  roomType: z.string().nonempty("Room Type is required"),
  checkIn: z.coerce.date({ error: "Checkin date is required" }),
  checkOut: z.coerce.date({ error: "Checkout date is required" }),
  guestName: z.string().nonempty("Name is required"),
});

type formType = z.input<typeof schema>;

export default function InquiryForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<formType>({ resolver: zodResolver(schema) });

  const [success, setSuccess] = useState("");

  const onSubmit: SubmitHandler<formType> = async (data) => {
    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const result = await res.json();

      if (res.ok) {
        setSuccess("Request Submitted Successfully!");
        reset();
      }
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className=''>
      <h5 className='text-xl md:text-3xl text-zinc-400 text-center  uppercase body-font mb-2 md:mb-6'>
        Inquery Form
      </h5>
      <div className=' '>
        {success && <div className='text-green-500'>{success}</div>}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className='flex flex-col gap-6 w-full mx-auto'>
          <div className='flex flex-col gap-1'>
            <label className='text-zinc-500 body-font'>Guest Name </label>
            <input
              {...register("guestName")}
              type='text'
              placeholder=''
              className='border px-2 body-font'
            />
            {errors.guestName && (
              <div className='text-red-300 body-font'>
                {errors.guestName.message}
              </div>
            )}
          </div>
          <div className='flex flex-col gap-1'>
            <label className='text-zinc-500 body-font'>Room Type</label>
            <select
              {...register("roomType")}
              className='border px-2 text-zinc-400'>
              <option value=''>-Select-</option>
              <option value='standard'>Standard</option>
              <option value='deluxe'>Deluxe</option>
              <option value='family'>Family</option>
            </select>
            {errors.roomType && (
              <div className='text-red-300 body-font'>
                {errors.roomType.message}
              </div>
            )}
          </div>
          <div className='flex flex-col gap-1'>
            <label className='text-zinc-500 body-font'>Checkin Date</label>
            <input
              {...register("checkIn")}
              type='date'
              placeholder='Checkin Date'
              className='border px-2 text-zinc-400'
            />
            {errors.checkIn && (
              <div className='text-red-300 body-font'>
                {errors.checkIn.message}
              </div>
            )}
          </div>
          <div className='flex flex-col gap-1'>
            <label className='text-zinc-500 body-font'>Checkout Date</label>
            <input
              {...register("checkOut")}
              type='date'
              placeholder='Checkout Date'
              className='border px-2 text-zinc-400'
            />
            {errors.checkOut && (
              <div className='text-red-300 body-font'>
                {errors.checkOut.message}
              </div>
            )}
          </div>
          <button
            disabled={isSubmitting}
            className='bg-zinc-400 text-white py-1 body-font cursor-pointer'
            type='submit'>
            {isSubmitting ? "Loading..." : "Send"}
          </button>
        </form>
      </div>
    </div>
  );
}
