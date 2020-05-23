import { Arg, Ctx, Field, InputType, Mutation, ObjectType, Resolver } from 'type-graphql';

import { Context } from '../../apollo';
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
