import { Arg, Ctx, Field, InputType, Mutation, ObjectType, Resolver } from 'type-graphql';

import { Context } from '../../apollo';
import DBTeam from '../../entities/team';
import User from '../../entities/user';

import GQLTeam from './team';

@InputType()
class RegisterTeamInput {
	@Field()
	name: string;

	@Field(() => [String])
	players: string[];

	@Field()
	tournamentId: string;
}

@ObjectType()
class RegisterTeamPayload {
	@Field()
	team: GQLTeam;
}

@Resolver()
export default class RegisterTeamMutationResolver {
	@Mutation(() => RegisterTeamPayload)
	async registerTeam(
		@Arg('input') { name, players: playerIds, tournamentId }: RegisterTeamInput,
		@Ctx() { repositories }: Context,
	): Promise<RegisterTeamPayload> {
		const tournament = await repositories.tournamentRepository.findOne(tournamentId, {
			relations: ['teams'],
		});
		if (!tournament) {
			throw new Error('That tournament does not exist');
		}

		if (tournament.started) {
			throw new Error('This tournament has already started');
		}

		if (tournament.teams.length >= tournament.maxTeams) {
			throw new Error('This tournament is full');
		}

		if (tournament.playersPerTeam != playerIds.filter(playerId => playerId !== '').length) {
			throw new Error('Not the correct number of players >:(');
		}

		const players = await Promise.all(
			playerIds.map(
				playerId =>
					new Promise<User>((resolve, reject) => {
						repositories.userRepository.findOne(playerId).then(player => {
							if (!player) {
								reject('No user found with id ' + playerId);
							}

							resolve(player);
						});
					}),
			),
		);

		const teamsWithPlayers = await Promise.all(
			tournament.teams.map(
				({ id }) =>
					new Promise<DBTeam>((resolve, reject) => {
						return repositories.teamRepository
							.findOne(id, {
								relations: ['players'],
							})
							.then(team => {
								if (!team) {
									reject('Team with id ' + id + ' not found');
								}

								resolve(team);
							});
					}),
			),
		);

		for (const player of players) {
			for (const team of teamsWithPlayers) {
				if (team.players.find(p => p.id === player.id)) {
					throw new Error(
						'Player with id ' + player.id + ' is already in a team in the tournament',
					);
				}
			}
		}

		let team = repositories.teamRepository.create({
			name,
			players,
			tournament,
		});

		team = await repositories.teamRepository.save(team);

		return {
			team,
		};
	}
}
