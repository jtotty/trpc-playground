import { TRPCError, inferAsyncReturnType, initTRPC } from '@trpc/server';
import { createContext } from './context';

export const t = initTRPC
    .context<inferAsyncReturnType<typeof createContext>>()
    .create();

export const router = t.router;
export const publicProcedure = t.procedure;

const isAdminMiddleware = t.middleware(({ ctx, next }) => {
    if (!ctx.isAdmin) {
        throw new TRPCError({ code: 'UNAUTHORIZED' });
    }

    return next();
});

export const adminProcedure = publicProcedure.use(isAdminMiddleware);
