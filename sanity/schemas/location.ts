import { defineType, defineField } from "sanity";

export const location = defineType({
  name: "location",
  title: "Location",
  type: "document",
  fields: [
    defineField({
      name: "locationTitle",
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
