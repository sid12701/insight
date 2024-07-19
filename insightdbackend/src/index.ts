import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { sign } from "hono/jwt";
import {userRouter} from "./routes/user"
import {journalRouter} from "./routes/journal"


const app = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string; 
  }
}>() 


app.route("/api/v1/user", userRouter)
app.route("/api/v1/journal", journalRouter)




export default app