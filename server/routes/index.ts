import { t } from '../trpc';
import { userRouter } from './users';

const router = t.router;
const publicProcedure = t.procedure;

export const appRouter = router({
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
    users: userRouter,
});
