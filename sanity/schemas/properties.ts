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
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "propertyName" },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "coverImage",
      title: "Cover Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "shortDescription",
      title: "Short Description",
      type: "text",
    }),
    defineField({
      name: "propertyDetails",
      title: "Property Details",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "roomTypes",
      title: "Room Types",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "roomType",
              title: "Room Type",
              type: "string",
            }),
            defineField({
              name: "roomCoverPhoto",
              title: "Room Cover Photo",
              type: "image",
              options: { hotspot: true },
            }),
            defineField({
              name: "roomPhotos",
              title: "Room Photos",
              type: "array",
              of: [
                {
                  type: "object",
                  fields: [
                    defineField({
                      name: "roomPhoto",
                      title: "Room Photo",
                      type: "image",
                      options: { hotspot: true },
                    }),
                    defineField({
                      name: "roomImageTitle",
                      title: "Image Title",
                      type: "string",
                    }),
                  ],
                },
              ],
            }),
          ],
        },
      ],
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
