import { defineType, defineField } from "sanity";

export const aboutus = defineType({
  name: "aboutus",
  title: "About us",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
    }),
    defineField({
      name: "intro",
      title: "Intro",
      type: "text",
      validation: (Rule) => Rule.required(),
    }),
  ],
});
