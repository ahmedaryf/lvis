import Inquery from "@/app/emails/inquery";
import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { property, guestEmail, pax, checkIn, checkOut, guestName, message } =
      body;

    const arrivalDate = new Date(checkIn).toLocaleDateString("en-uk", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
    const departueDate = new Date(checkOut).toLocaleDateString("en-uk", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

    await resend.emails.send({
      from: `${guestName} <noreply@resend.maldiveslocaltourism.com>`,
      to: "ahmd.areef@gmail.com",
      bcc: "ahmedlisham@gmail.com",
      subject: "Availability Request",
      react: Inquery({
        property,
        guestName,
        guestEmail,
        pax,
        checkIn: arrivalDate,
        checkOut: departueDate,
        message,
      }),
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { error: "Email failed to send" },
      { status: 500 },
    );
  }
}
// import { render } from "@react-email/render";
// import React from "react";
// import Inquery from "@/app/emails/inquery";
// import { Resend } from "resend";
// import { NextResponse } from "next/server";

// const resend = new Resend(process.env.RESEND_API_KEY);

// export async function POST(req: Request) {
//   try {
//     const { roomType, checkIn, checkOut } = await req.json();

//     const html = await render(
//       React.createElement(Inquery, {
//         roomType,
//         checkIn,
//         checkOut,
//       }),
//     );

//     const { data, error } = await resend.emails.send({
//       from: "Availability Request <noreply@resend.maldiveslocaltourism.com>",
//       to: "ahmd.areef@gmail.com",
//       subject: "Availability Request",
//       html,
//     });

//     if (error) {
//       console.error(error);
//       return NextResponse.json({ error }, { status: 500 });
//     }

//     return NextResponse.json({ success: true, data });
//   } catch (error) {
//     console.error(error);
//     return NextResponse.json(
//       { error: "Email failed to send" },
//       { status: 500 },
//     );
//   }
// }
