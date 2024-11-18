"use server";

import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";
import { z } from "zod";

import { db } from "~/server/db";
import { users } from "~/server/db/schema";

const userSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(3, "Password must be at least 3 characters")
    .max(20, "Password must be at most 20 characters"),
});

export async function registerUser(formData: FormData) {
  const validatedFields = userSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validatedFields.success) {
    return { error: validatedFields.error.flatten().fieldErrors };
  }

  const { name, email, password } = validatedFields.data;

  try {
    const existingUser = await db
      .select()
      .from(users)
      .where(eq(users.email, email));

    if (existingUser.length > 0) {
      return { error: { email: ["Email already in use"] } };
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    await db.insert(users).values({
      email,
      name,
      password: hashedPassword,
    });

    return { success: true };
  } catch (error) {
    console.error("Error registering user:", error);
    return {
      error: {
        server: ["An error occurred while registering. Please try again."],
      },
    };
  }
}
