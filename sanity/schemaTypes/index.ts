import { type SchemaTypeDefinition } from "sanity";
import { hero } from "../schemas/hero";
import { accordions } from "../schemas/accordions";
import { properties } from "../schemas/properties";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [hero, accordions, properties],
};
