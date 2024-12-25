import { z } from "zod";
export const userSchema = z.object({
  GoogeleId: z.string(),
  name: z
    .string()
    .min(4, { message: "Name should be length atleast 2 character" })
    .max(30, { message: "Whoa you have really name please use small name" }),
  email: z.string().email(),
  avatar: z.string(),
});

export const urlschema = z.object({
  urlID: z.string(),
  authorID: z.string(),
  url: z.string().url(),
  shortURL: z.string().url(),
  createdAt: z.date(),
  topic: z.string().optional(),
});

export const analyticsSchema = z.object({
  clickID: z.string(),
  urlID: z.string(),
  user: z.string(),
  timeStamp: z.date(),
  osType: z.string(),
  deviceType: z.string(),
});
