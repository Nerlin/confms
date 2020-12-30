import { EntitySchema } from "typeorm";
import { IUserSession } from "../../types/User";

export const SessionSchema = new EntitySchema<IUserSession>({
  name: "session",
  columns: {
    id: {
      type: Number,
      primary: true,
      generated: true,
    },
    refreshToken: {
      type: String,
    },
  },
  relations: {
    email: {
      type: "many-to-one",
      target: "user",
      joinColumn: {
        name: "email"
      }
    },
  },
});
