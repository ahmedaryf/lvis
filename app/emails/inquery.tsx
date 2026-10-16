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
  roomType: string;
  checkIn: string;
  checkOut: string;
};

export default function Inquery({ roomType, checkIn, checkOut }: InqueryProps) {
  return (
    <Html>
      <Head />
      <Body>
        <Container>
          <Section>
            <Text style={{ fontSize: "20px", fontWeight: "bold" }}>
              I would like to check availability for these dates!
            </Text>
            <Text>Room Type: {roomType}</Text>
            <Text>Checkin: {checkIn}</Text>
            <Text>Checkout: {checkOut}</Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}
