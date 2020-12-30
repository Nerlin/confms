import { EntitySchema } from "typeorm";
import { IConference } from "../../types/Conference";

export const ConferenceSchema = new EntitySchema<IConference>({
  name: "conference",
  columns: {
    id: {
      type: Number,
      primary: true,
      generated: true,
    },
    slug: {
      type: String,
      unique: true,
    },
    name: {
      type: String,
    },
    date: {
      type: String,
    },
    shortDescription: {
      type: String
    }
  }
})