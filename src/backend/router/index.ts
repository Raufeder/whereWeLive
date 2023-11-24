import * as trpc from '@trpc/server';
import { z } from 'zod';
import { prisma } from '../utils/prisma';
import { getOptionsForVote } from '../../utils/getRandomCities';

export const appRouter = trpc
  .router()
  .query("get-city-pair", {
    async resolve() {
      const [first, second] = getOptionsForVote();

      const bothCities = await prisma.city.findMany({
        where: { id: { in: [first, second] } },
      });

      if (bothCities.length !== 2)
        throw new Error("Failed to find two cities");

      return { firstCity: bothCities[0], secondCity: bothCities[1] };
    },
  })
  .query("get-city", {
    input: z.object({
      id: z.number(),
    }),
    async resolve({ input }) {

      const city = await prisma.city.findUnique({
        where: { id: input.id },
      });

      if (!city)
        throw new Error("Failed to find city");

      return city;
    },
  })
  .mutation("cast-vote", {
    input: z.object({
      votedFor: z.number(),
      votedAgainst: z.number(),
    }),
    async resolve({ input }) {
      const voteInDb = await prisma.vote.create({
        data: {
          votedAgainstId: input.votedAgainst,
          votedForId: input.votedFor,
        },
      });
      return { success: true, vote: voteInDb };
    },
  });
// export type definition of API
export type AppRouter = typeof appRouter;
