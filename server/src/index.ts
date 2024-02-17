import express, { Express, Request, Response } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { initTRPC } from "@trpc/server";
import * as trpcExpress from "@trpc/server/adapters/express";
import { z } from "zod";

const createContext = ({
  req,
  res,
}: trpcExpress.CreateExpressContextOptions) => ({}); // no context
type Context = Awaited<ReturnType<typeof createContext>>;
const t = initTRPC.context<Context>().create();

export const appRouter = t.router({
  getUser: t.procedure.input(z.object({ name: z.string() })).query((opts) => {
    return { hi: opts.input.name.toLowerCase() };
  }),
  createUser: t.procedure
    .input(z.object({ name: z.string().min(5), age: z.number().min(1) }))
    .mutation(async (opts) => {
      // use your ORM of choice
      return true;
    }),
});

// export type definition of API
export type AppRouter = typeof appRouter;

const app: Express = express();
app.use(cors());

app.use(
  "/trpc",
  trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext,
  })
);

const port = process.env.PORT || 3000;

// Parse URL-encoded data
app.use(bodyParser.urlencoded({ extended: false }));

// Parse JSON data
app.use(bodyParser.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
