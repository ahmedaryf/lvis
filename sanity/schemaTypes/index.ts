import { type SchemaTypeDefinition } from "sanity";
import { hero } from "../schemas/hero";
import { accordions } from "../schemas/accordions";
import { properties } from "../schemas/properties";
import { aboutus } from "../schemas/aboutus";
import { activities } from "../schemas/activities";
import { dinning } from "../schemas/dinning";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [hero, aboutus, accordions, properties, activities, dinning],
};
