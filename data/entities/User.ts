import { EntitySchema } from "typeorm";
import { IUser } from "../../types/User";

export const UserSchema = new EntitySchema<IUser>({
  name: "user",
  columns: {
    email: {
      type: String,
      primary: true,
    },
    password: {
      type: String,
    },
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
  },
});
