import { type SchemaTypeDefinition } from "sanity";
import { hero } from "../schemas/hero";
import { accordions } from "../schemas/accordions";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [hero, accordions],
};
