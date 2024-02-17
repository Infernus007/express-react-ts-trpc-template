import { createTRPCReact } from "@trpc/react-query";
import type { AppRouter } from "../../../server/src/index.ts";



export const trpc = createTRPCReact<AppRouter>();
