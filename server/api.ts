import express from 'express';
import cors from 'cors';

import { initTRPC } from '@trpc/server';

const trpc = initTRPC.create();

const app = express();
app.use(cors({ origin: 'http://localhost:5173' }));

app.listen(3000);
