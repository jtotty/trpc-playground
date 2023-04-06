import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";
import type { AppRouter } from '../../server/api';

const client = createTRPCProxyClient<AppRouter>({
    links: [
        httpBatchLink({
            url: 'http://localhost:3000/trpc',
        }),
    ],
});

async function main() {
    const result = await client.logToServer.mutate('Hello from the client!');
    const user = await client.users.getUser.query();
    console.log(result);
    console.log(user);
}

main();
