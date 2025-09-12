import { defineType, defineField } from "sanity";

export const properties = defineType({
  name: "properties",
  title: "Properties",
  type: "document",
  fields: [
    defineField({
      name: "propertyName",
      title: "Property Name",
      type: "string",
    }),
    defineField({
      name: "coverImage",
      title: "Cover Image",
      type: "image",
      options: { hotspot: true },
    }),
  ],
});
