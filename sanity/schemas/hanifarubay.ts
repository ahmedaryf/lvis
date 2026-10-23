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
      name: "detailDescription",
      title: "Detail Description",
      type: "array",
      of: [{ type: "block" }],
    }),

    defineField({
      name: "coverPhoto",
      title: "Cover Photo",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "images",
      title: "Images",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "gallaryImages",
              title: "Images",
              type: "image",
            }),
            defineField({
              name: "imageTitle",
              title: "Image Title",
              type: "string",
            }),
          ],
        },
      ],
    }),
  ],
});
