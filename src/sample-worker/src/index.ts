import { Hono } from "hono";
import { cors } from "hono/cors";

const app = new Hono<{ Bindings: Env }>()

.use('*', (c, next) => {
  const allowedOrigins: string[] = c.env.ALLOWED_ORIGINS ?? [];
  const corsMiddlewareHandler = cors({
    origin: allowedOrigins.join(","),
    allowMethods: ['GET', 'POST'],
  })
  return corsMiddlewareHandler(c, next)
})

.get("/greet", (c) => {
  return c.json({"message": "Hello Hono!"});
})

.post("/echo", async (c) => {
  const body = await c.req.text();
  return c.text(body);
});

export type AppType = typeof app;

export default app;
