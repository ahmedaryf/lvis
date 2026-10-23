"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
  property: z.enum(["pool villa", "blancura", "village"], {
    error: "Property Required",
  }),
  checkIn: z.coerce.date({ error: "Checkin date is required" }),
  checkOut: z.coerce.date({ error: "Checkout date is required" }),
  guestName: z.string().nonempty("Name is required"),
  guestEmail: z.string().nonempty("Email is required"),
  pax: z.coerce
    .number()
    .int({ error: "Must be a whole number" })
    .min(1, { error: "Pax Required" }),
  message: z.string().optional(),
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
      <h5 className='text-xl md:text-2xl text-zinc-400 text-center  uppercase body-font mb-2 md:mb-6'>
        Inquiry Form
      </h5>
      <div className=''>
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
              className='border px-2 body-font py-1 rounded'
            />
            {errors.guestName && (
              <div className='text-red-300 body-font text-sm'>
                {errors.guestName.message}
              </div>
            )}
          </div>
          <div className='flex flex-col gap-1'>
            <label className='text-zinc-500 body-font'>Guest Email </label>
            <input
              {...register("guestEmail")}
              type='email'
              placeholder=''
              className='border px-2 body-font py-1 rounded'
            />
            {errors.guestEmail && (
              <div className='text-red-300 body-font text-sm'>
                {errors.guestEmail.message}
              </div>
            )}
          </div>
          <div className='flex gap-4'>
            <div className='flex flex-col gap-1 w-2/3'>
              <label className='text-zinc-500 body-font'>Property</label>
              <select
                {...register("property")}
                className='border px-2 text-zinc-400 py-1 rounded body-font'>
                <option value=''>-Select-</option>
                <option value='blancura'>Blancura</option>
                <option value='pool villa'>Pool Villa</option>
                <option value='village'>Village</option>
              </select>
              {errors.property && (
                <div className='text-red-300 body-font text-sm'>
                  {errors.property.message}
                </div>
              )}
            </div>
            <div className='flex flex-col gap-1 w-1/3'>
              <label className='text-zinc-500 body-font'>Pax </label>
              <input
                {...register("pax")}
                type='number'
                placeholder=''
                className='border px-2 body-font py-1 rounded'
              />
              {errors.pax && (
                <div className='text-red-300 body-font text-sm'>
                  {errors.pax.message}
                </div>
              )}
            </div>
          </div>
          <div className='flex flex-col gap-1'>
            <label className='text-zinc-500 body-font'>Checkin Date</label>
            <input
              {...register("checkIn")}
              type='date'
              placeholder='Checkin Date'
              className='border px-2 text-zinc-400 py-1 rounded'
            />
            {errors.checkIn && (
              <div className='text-red-300 body-font text-sm'>
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
              className='border px-2 text-zinc-400 py-1 rounded'
            />
            {errors.checkOut && (
              <div className='text-red-300 body-font text-sm'>
                {errors.checkOut.message}
              </div>
            )}
          </div>
          <div className='flex flex-col gap-1'>
            <label className='text-zinc-500 body-font'>Message</label>
            <textarea
              cols={10}
              rows={5}
              {...register("message")}
              placeholder=''
              className='border px-2 body-font py-1 rounded'
            />
            {errors.message && (
              <div className='text-red-300 body-font text-sm'>
                {errors.message.message}
              </div>
            )}
          </div>
          <button
            disabled={isSubmitting}
            className='bg-zinc-400 hover:bg-zinc-500 text-white py-1 body-font cursor-pointer rounded'
            type='submit'>
            {isSubmitting ? "Loading..." : "Send"}
          </button>
        </form>
      </div>
    </div>
  );
}
