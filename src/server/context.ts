import * as trpc from '@trpc/server';
import * as trpcNext from '@trpc/server/adapters/next';
import { NodeHTTPCreateContextFnOptions } from '@trpc/server/adapters/node-http';
import { IncomingMessage } from 'http';
import { getSession } from 'next-auth/react';
import ws from 'ws';

interface CreateContextInner {
  opts:
    | trpcNext.CreateNextContextOptions
    | NodeHTTPCreateContextFnOptions<IncomingMessage, ws>;
}

export const createContextInner = async (opts: CreateContextInner) => {
  const session = await getSession(opts);

  console.log('createContext for', session?.user?.name ?? 'unknown user');

  return {
    session,
  };
};

/**
 * Creates context for an incoming request
 * @link https://trpc.io/docs/context
 */
export const createContext = async (opts: CreateContextInner) => {
  return await createContextInner(opts);
};

export type Context = trpc.inferAsyncReturnType<typeof createContext>;
