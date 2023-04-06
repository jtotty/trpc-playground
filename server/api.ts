import express from 'express';
import cors from 'cors';

import { initTRPC } from '@trpc/server';
import { createExpressMiddleware } from '@trpc/server/adapters/express';

export const t = initTRPC.create();
const router = t.router;
const publicProcedure = t.procedure;

const appRouter = router({
    sayHi: publicProcedure.query(() => {
        return 'Hi!';
    }),
    logToServer: publicProcedure.input((v) => {
        if (typeof v !== 'string') {
            throw new Error('Not a string');
        }
        return v;
    }).mutation((req) => {
        console.log(`Client says: ${req.input}`);
        return true;
    }),
});

const app = express();

app.use(cors({ origin: 'http://localhost:5173' }));
app.use('/trpc', createExpressMiddleware({ router: appRouter }));

app.listen(3000);

export type AppRouter = typeof appRouter;
