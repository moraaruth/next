import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { PrismaClient } from "@prisma/client";
import { prisma } from "../../src/app/api/prisma/db";
import { typeDefs } from "../../graphhql/schema";
import { resolvers } from "../../graphhql/resolvers";

export type Context = {
	prisma: PrismaClient;
};

const apolloServer = new ApolloServer<Context>({ typeDefs, resolvers });

export default startServerAndCreateNextHandler(apolloServer, {
	context: async (req, res) => ({ req, res, prisma }),
});