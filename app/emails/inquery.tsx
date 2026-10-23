import {
  Section,
  Container,
  Text,
  Html,
  Head,
  Body,
} from "@react-email/components";
import * as React from "react";

type InqueryProps = {
  property: string;
  guestName: string;
  guestEmail: string;
  pax: number;
  checkIn: string;
  checkOut: string;
  message: string;
};

export default function Inquery({
  guestName,
  guestEmail,
  pax,
  property,
  checkIn,
  checkOut,
  message,
}: InqueryProps) {
  return (
    <Html>
      <Head />
      <Body>
        <Container>
          <Section>
            <Text style={{ fontSize: "20px", fontWeight: "bold" }}>
              Could you please check availability for these dates?
            </Text>
            <Text>Name: {guestName}</Text>
            <Text>Email: {guestEmail}</Text>
            <Text>Pax: {pax}</Text>
            <Text>Property: {property}</Text>
            <Text>Checkin: {checkIn}</Text>
            <Text>Checkout: {checkOut}</Text>
            <Text>Message: {message}</Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}
