import { createTRPCProxyClient, createWSClient, httpBatchLink, splitLink, wsLink } from "@trpc/client";
import type { AppRouter } from '../../server/api';

const client = createTRPCProxyClient<AppRouter>({
    links: [
        splitLink({
            condition: (op) => {
                return op.type === 'subscription';
            },

            true: wsLink({
                client: createWSClient({
                    url: 'ws://localhost:3000/trpc',
                }),
            }),

            false: httpBatchLink({
                url: 'http://localhost:3000/trpc',
            }),
        }),
    ],
});

document.addEventListener('click', () => {
    client.users.update.mutate(({ userId: '1283', name: 'Jamie' }));
});

async function main() {
    // const getUserResult = await client.users.get.query({ userId: '1285' });
    // console.log(getUserResult);

    // const updateUserResult = await client.users.update.mutate({
    //     userId: '1283',
    //     name: 'James',
    // });
    // console.log(updateUserResult);

    // const secretStuffResult = await client.secretStuff.query();
    // console.log(secretStuffResult);

    client.users.onUpdate.subscribe(undefined, {
        onData: (id) => {
            console.log('Upodated', id);
        }
    });
}

main();
