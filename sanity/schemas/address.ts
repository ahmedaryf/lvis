import { defineType, defineField } from "sanity";

export const address = defineType({
  name: "address",
  title: "Address",
  type: "document",
  fields: [
    defineField({
      name: "propertyAddress",
      title: "Property Address",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "city",
      title: "City | Island",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "postcode",
      title: "Postcode",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "country",
      title: "Country",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
  ],
});
