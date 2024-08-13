import { z } from "zod";

export const loginFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6, {
    message: "Password should be minimum 06 character's",
  }),
});
