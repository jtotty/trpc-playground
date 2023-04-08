import { createTRPCProxyClient, httpBatchLink, loggerLink } from "@trpc/client";
import type { AppRouter } from '../../server/api';

const client = createTRPCProxyClient<AppRouter>({
    links: [
        loggerLink(),
        httpBatchLink({
            url: 'http://localhost:3000/trpc',
        }),
    ],
});

async function main() {
    const getUserResult = await client.users.get.query({ userId: '1285' });
    console.log(getUserResult);

    const updateUserResult = await client.users.update.mutate({
        userId: '1283',
        name: 'James',
    });
    console.log(updateUserResult);

    const secretStuffResult = await client.secretStuff.query();
    console.log(secretStuffResult);
}

main();
