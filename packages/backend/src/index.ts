import 'reflect-metadata';

import RedisSession from 'connect-redis';
import dotenv from 'dotenv';
import express from 'express';
import session from 'express-session';
import redis from 'redis';
import { createConnection, getRepository } from 'typeorm';

import createApolloServer from './apollo';
import Team from './entities/team';
import Tournament from './entities/tournament';
import { generateBracket } from './generate-bracket';
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

		const app = express();

		app.get('/', async (_req, res) => {
			const tournamentRepository = getRepository(Tournament);
			const teamRepository = getRepository(Team);


			const name = 'Cool Tournament';
			const description = 'Very nice tournament with good description';
			const game = 'League of Legends';
			let tournament = tournamentRepository.create({ name, description, game });
			tournament = await tournamentRepository.save(tournament);

			const teams: Team[] = [];
			for (let i = 0; i < 15; i++) {
				let team = teamRepository.create({
					name: 'team' + i,
					players: ['player 1', 'player 2'],
					tournament,
				});
				team = await teamRepository.save(team);
				teams.push(team);
			}

			const matches = await generateBracket(teams, tournament);

			return res.send({ tournament, teams, matches });
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
