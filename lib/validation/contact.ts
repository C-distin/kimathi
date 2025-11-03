import { z } from "zod"

export const contactSchema = z.object({
  name: z.string().min(2, "Name is too short").max(50, "Name is too long"),
  email: z.email("Email is invalid"),
  phone: z
    .string()
    .min(10, "Phone number is toot short")
    .max(10, "Phone number is too long")
    .regex(/^(\+?233|0)(20|23|24|25|26|27|28|50|54|55|56|57|59)[\s-]?\d{3}[\s-]?\d{4}$/),
  subject: z.string().min(2, "Subject is too short").max(50, "Subject is too long"),
  message: z.string().min(2, "Message is too short").max(500, "Message is too long"),
})

export type ContactData = z.infer<typeof contactSchema>
