import { Hono } from "hono"

export const aiRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
    AI:Ai;
  }
}>()

aiRouter.post("/ai",async(c)=>{
})