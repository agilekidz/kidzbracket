import 'reflect-metadata';

import RedisSession from 'connect-redis';
import dotenv from 'dotenv';
import express from 'express';
import session from 'express-session';
import redis from 'redis';
import { createConnection, getRepository } from 'typeorm';

import createApolloServer from './apollo';
import User from './entities/user';
import { randomTournament, seedDatabase } from './seeder';
import typeormConfig from './typeorm-config';

dotenv.config();

const redisClient = redis.createClient({
	host: 'redis',
	password: String(process.env.REDIS_PASSWORD),
});
const RedisSessionStore = RedisSession(session);

(async function () {
	try {
		await createConnection(typeormConfig);

		const userRepository = getRepository(User);
		const users = await userRepository.find();
		if (users.length === 0) {
			await seedDatabase();
		}

		const app = express();

		app.get('/', async (_req, res) => {
			const tournament = await randomTournament();

			return res.send({ tournament });
		});

		app.use(
			session({
				store: new RedisSessionStore({ client: redisClient }),
				secret: String(process.env.SESSION_SECRET),
				resave: false,
				saveUninitialized: false,
			}),
		);

		const server = await createApolloServer();
		server.applyMiddleware({
			app,
			cors: {
				origin: String(process.env.FRONTEND_LOCATION),
				credentials: true,
			},
		});

		app.listen(3000, () => {
			console.log(`Server ready`);
		});
	} catch (e) {
		console.error(e);
	}
})();
