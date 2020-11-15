import { ApolloServer, PubSub } from "apollo-server";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
import { typeDefs } from "./graphql/typeDefs";
import { resolvers } from "./graphql/resolvers";

const pubSub = new PubSub();

const server = new ApolloServer({
	typeDefs,
	resolvers,
	context: ({ req }) => ({ req, pubSub }),
});

const PORT = process.env.PORT || 4000;
const MONGODB = process.env.MONGODB || "";

mongoose
	.connect(MONGODB, { useNewUrlParser: true, useUnifiedTopology: true })
	.then(() => {
		console.log("MongoDB Connected");
		return server.listen({ port: PORT }).then((res) => {
			console.log(`🚀 Server ready at ${res.url}`);
		});
	});
