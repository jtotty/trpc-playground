import { observable } from '@trpc/server/observable';
import { router, publicProcedure } from '../trpc';
import { EventEmitter } from 'ws';
import { z } from 'zod';

interface User {
    userId: string;
    name: string;
}

const users: User[] = [
    { userId: '1283', name: 'James' },
    { userId: '1284', name: 'John' },
    { userId: '1285', name: 'Jane' },
];

const userProcedure = publicProcedure.input(z.object({ userId: z.string() }));
const eventEmiter = new EventEmitter();

const get = userProcedure.query(({ input }) => {
    const user = users.find((u) => u.userId === input.userId);
    return user;
});

const update = userProcedure.input(z.object({ name: z.string() }))
    .output(z.object({ userId: z.string(), name: z.string() }))
    .mutation((req) => {
        console.log(`Updating user ${req.input.userId} to have the name ${req.input.name}`);
        eventEmiter.emit('update', req.input.userId);

        return {
            userId: req.input.userId,
            name: req.input.name,
            password: 'woopsMyPasswordIsHere',
            token: 'woopsMyTokenIsHere',
        }
    });

const onUpdate = publicProcedure.subscription(() => {
    return observable<string>((emit) => {
        eventEmiter.on('update', emit.next);

        return () => {
            eventEmiter.off('update', emit.next);
        };
    });
});

export const userRouter = router({
    get,
    update,
    onUpdate,
});
