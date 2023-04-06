import { t } from '../trpc';

const router = t.router;
const publicProcedure = t.procedure;

export const userRouter = router({
    getUser: publicProcedure.query(() => {
        return { id: 1, name: 'James' };
    }),
});
