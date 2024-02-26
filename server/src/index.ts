import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from "@apollo/server/express4";
import express, { Request, Response } from "express";
import cors from "cors";
import 'dotenv/config'
import typeDefs from './graphql/typeDefs.js';
import resolvers from './graphql/resolvers.js';
import connectMongoose from './config/mongoDB.js';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const app = express();

const addMiddlewares = () => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cors());
};

const startServer = async () => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  await server.start();
  app.use(
    "/graphql",
    expressMiddleware(server)
  );
  app.use("/images/:character", (req: Request, res: Response) => {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);
    const character = req.params.character.toLowerCase().replaceAll(" ", "_");
    res.sendFile(__dirname + "/images/" + character + ".jpg");
  })

  const port = process.env.PORT || 4000;
  app.listen(port, () => {
    console.log(`Server is running in port ${port} `);
  });
};

(async function () {
  addMiddlewares();
  await connectMongoose();
  await startServer();
}) ();