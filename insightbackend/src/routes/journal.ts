import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { decode, verify } from "hono/jwt";

export const journalRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
    AI: Ai;
  };
  Variables: {
    newJournal: string;
    journal: string;
    userId: string;
  };
}>();

export async function processJournalWithAI(
  journal: string,
  ai: Ai
): Promise<string> {
  const prompt = `As an empathetic and insightful AI journaling assistant, your task is to analyze the following journal entry and provide meaningful insights. Focus on:

  1. Emotional patterns and underlying themes
  2. Personal growth opportunities
  3. Potential actions or reflections that could benefit the user
  
  Present your insights in a clear, bulleted format. Be supportive and constructive in your analysis. Here's the journal entry:
  
  ${journal}
  
  Based on this entry, provide 3-5 bullet points of insights, each followed by a brief explanation.`  
  const response = await ai.run("@cf/meta/llama-3-8b-instruct", {
    stream: true,
    prompt,
  });
  //@ts-ignore
  return response;
}

journalRouter.use("/*", async (c, next) => {
  const journal = await c.req.json();
  c.set("journal", journal);
  await next();
});

journalRouter.use("/*", async (c, next) => {
  const authHeader = c.req.header("Authorization");
  const token = authHeader?.split(" ")[1];
  if (!token) {
    c.status(401);
    return c.json({ message: "Unauthorized" });
  }
  try {
    const user = await verify(token, c.env.JWT_SECRET);
    const userId = user.id;
    c.set("userId", userId as string);
    await next();
  } catch (e) {
    c.status(401);
    return c.json({ message: "Unauthorized" });
  }
});

journalRouter.post("/", async (c) => {
  const body = await c.req.json();
  const { journal, title, date } = body;
  try {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    const userId = c.get("userId");
    const newJournal = await prisma.journal.create({
      data: {
        journal,
        title,
        authorId: userId,
        date,
      },
    });

    return c.json({ message: "Journal created", newJournal });
  } catch (e) {
    console.error(e);
    c.status(500);
    return c.json({ message: "Error while creating journal" });
  }
});

journalRouter.post("/ai", async (c) => {
  const newJournal = c.get("journal");
  //@ts-ignore
  const journal = newJournal.journal;
  const ai = c.env.AI;

  try {
    const insights = await processJournalWithAI(journal, ai);
    return c.json({ message: "Insights generated", insights });
  } catch (error) {
    console.error("Error processing journal with AI:", error);
    return c.json({ error: "Failed to process journal" }, 500);
  }
});

journalRouter.get("/", async (c) => {
  try {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    const userId = c.get("userId");
    const journals = await prisma.journal.findMany({
      where: {
        authorId: userId,
      },
    });
    return c.json({ journals });
  } catch (e) {
    console.error(e);
    c.status(500);
    return c.json({ message: "Error while fetching journal" });
  }
});

journalRouter.get("/:id", async (c) => {
  try {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    const userId = c.get("userId");
    const id = c.req.param("id");
    const journal = await prisma.journal.findUnique({
      where: {
         id: parseInt(id),
        authorId: userId
        },
    });
    return c.json({ journal });
  } catch (e) {
    console.log(e);
    return c.json({ message: "Error while fetching journal" });
  }
});

journalRouter.get("/date", async (c) => {
  try {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    const body = await c.req.json();
    const userId = c.get("userId");
    const { date } = body;
    const journal = await prisma.journal.findMany({
      where: { date: date , authorId: userId},
    });
    return c.json({ journal });
  } catch (e) {
    console.log(e);
    return c.json({ message: "Error while fetching journal" });
  }
});
