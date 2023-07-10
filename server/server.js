import express from "express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import bodyParser from "body-parser";
import cors from "cors";

async function startServer() {
  const app = express();
  app.use(bodyParser.json());
  app.use(cors());

  const messages = [];

  const typeDefs = `
    type Message {
      id: ID!
      content: String!
    }

    type Query {
      messages: [Message]
    }

    type Mutation {
      addMessage(content: String!): Message
    }
  `;

  const resolvers = {
    Query: {
      messages: () => messages,
    },
    Mutation: {
      addMessage: (_, { content }) => {
        const message = {
          id: String(messages.length + 1),
          content: content,
        };
        messages.push(message);
        return message;
      },
    },
  };

  const server = new ApolloServer({ typeDefs, resolvers });

  await server.start();

  app.use("/graphql", expressMiddleware(server));

  app.listen(5000, () => console.log("Server Started at PORT 5000"));
}

startServer();
