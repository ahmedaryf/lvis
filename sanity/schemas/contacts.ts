import { defineType, defineField } from "sanity";

export const contacts = defineType({
  name: "contacts",
  title: "Contacts",
  type: "document",
  fields: [
    defineField({
      name: "contactType",
      title: "Contact Type",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "contact",
      title: "Contact",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
  ],
});
