import { defineType, defineField } from "sanity";

export const activities = defineType({
  name: "activities",
  title: "Activities",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title" },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "coverPhoto",
      title: "Cover Photo",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "items",
      title: "Items",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "itemName",
              title: "Item Name",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "itemPhoto",
              title: "Item Photo",
              type: "image",
              options: { hotspot: true },
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "itemDescription",
              title: "Item Description",
              type: "array",
              of: [{ type: "block" }],
            }),
            defineField({
              name: "itemDuration",
              title: "Item Duration",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "itemMinimumPax",
              title: "Item Minimum Pax",
              type: "number",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "itemPrice",
              title: "Item Price",
              type: "number",
              validation: (Rule) => Rule.required(),
            }),
          ],
        },
      ],
    }),
  ],
});
