import { router, publicProcedure } from '../trpc';
import { z } from 'zod';

interface User {
    userId: string;
    name: string;
}

const users: User[] = [
    {
        userId: '1283',
        name: 'James',
    },
    {
        userId: '1284',
        name: 'John',
    },
    {
        userId: '1285',
        name: 'Jane',
    },
];

const userProcedure = publicProcedure.input(z.object({ userId: z.string() }));

export const userRouter = router({
    get: userProcedure.query(({ input }) => {
        const user = users.find((u) => u.userId === input.userId);
        return user;
    }),
    update: userProcedure
        .input(z.object({ name: z.string() }))
        .output(z.object({ userId: z.string(), name: z.string() }))
        .mutation((req) => {
            console.log(`Updating user ${req.input.userId} to have the name ${req.input.name}`);
            return {
                userId: req.input.userId,
                name: req.input.name,
                password: 'woopsMyPasswordIsHere',
                token: 'woopsMyTokenIsHere',
            }
        })
});
