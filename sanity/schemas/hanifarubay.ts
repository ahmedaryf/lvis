import { defineType, defineField } from "sanity";

export const hanifarubay = defineType({
  name: "hanifarubay",
  title: "Hanifarubay",
  type: "document",
  fields: [
    defineField({
      name: "hanifarubayTitle",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "subTitle",
      title: "Sub Title",
      type: "string",
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "array",
      of: [{ type: "block" }],
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "coverPhoto",
      title: "Cover Photo",
      type: "image",
      options: { hotspot: true },
    }),
  ],
});
