import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import express from "express";
import http from 'http';
import cors from "cors";
import 'dotenv/config';
import typeDefs from './graphql/typeDefs.js';
import resolvers from './graphql/resolvers.js';
import connectMongoose from './config/mongoDB.js';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { authenticate } from './utils/jwt.js';
import userModel from './models/user.js';
import { preFetch } from './utils/fetchFunctions/preFetchAll.js';
const app = express();
// const addMiddlewares = (app: Express) => {
//   app.use(express.json());
//   app.use(express.urlencoded({ extended: true }));
//   app.use(cors());
// };
const startServer = async (app) => {
    const httpServer = http.createServer(app);
    const server = new ApolloServer({
        typeDefs,
        resolvers,
        plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    });
    await server.start();
    app.get("/", (req, res) => {
        res.status(200).json("hello world");
    });
    app.use("/api/graphql", cors(), express.json(), expressMiddleware(server, {
        context: async ({ req }) => {
            const token = req.headers.authorization;
            if (token) {
                const status = authenticate(token);
                if (status) {
                    const user = await userModel.findById(status);
                    if (user)
                        return { user };
                    return { user: null };
                }
                return { user: null };
            }
            return { user: null };
        }
    }));
    app.use("/api/images/:character", (req, res) => {
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = dirname(__filename);
        const character = req.params.character.toLowerCase().replaceAll(" ", "_");
        res.sendFile(__dirname + "/images/" + character + ".jpg");
    });
    // const port = process.env.PORT || 4000;
    app.listen(4000, () => {
        console.log(`Explorer: ${process.env.BASE_URL}/graphql`);
    });
};
(async function () {
    // addMiddlewares(app);
    await connectMongoose();
    await preFetch();
    await startServer(app);
})();
export default app;
//# sourceMappingURL=index.js.map