import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { sign } from "hono/jwt";
import { registerInput } from "../../../common/src/index";
import bcrypt from "bcrypt";

export const userRouter = new Hono<{
  Bindings: { DATABASE_URL: string; JWT_SECRET: string };
}>();

userRouter.post("/register", async (c) => {
  const body = await c.req.json();
  const { success } = registerInput.safeParse(body);
  if (!success) {
    c.status(400);
    return c.json({ message: "Invalid input" });
  }

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const { email, password } = body;
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      c.status(409);
      return c.json({ message: "User already exists" });
    }

    // Hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword, // Store the hashed password
      },
    });

    const payload = { id: user.id };
    const token = await sign(payload, c.env.JWT_SECRET);
    c.status(201);
    return c.json({ message: "User created", token });
  } catch (e) {
    console.error(e);
    c.status(500);
    return c.json({ message: "Error while creating user" });
  } finally {
    await prisma.$disconnect();
  }
});

userRouter.post("/login", async (c) => {
  const body = await c.req.json();
  const { success } = registerInput.safeParse(body);
  if (!success) {
    c.status(400);
    return c.json({ message: "Invalid input" });
  }

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const { email, password } = body;
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      c.status(404);
      return c.json({ message: "User not found" });
    }

    // Compare the provided password with the stored hash
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      c.status(401);
      return c.json({ message: "Invalid password" });
    }

    const payload = { id: user.id };
    const token = await sign(payload, c.env.JWT_SECRET);
    c.status(200); // OK
    return c.json({ message: "User logged in", token });
  } catch (e) {
    console.error(e);
    c.status(500);
    return c.json({ message: "Error while logging in" });
  } finally {
    await prisma.$disconnect();
  }
});
