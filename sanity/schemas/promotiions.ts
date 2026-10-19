import { defineField, defineType } from "sanity";

export const promotions = defineType({
  name: "promotions",
  title: "Promotions",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
    }),
    defineField({
      name: "coverPhoto",
      title: "Cover Photo",
      type: "image",
      options: { hotspot: true },
    }),
  ],
});
