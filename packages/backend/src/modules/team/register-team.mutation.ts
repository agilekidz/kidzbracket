import { Arg, Ctx, Field, InputType, Mutation, ObjectType, Resolver } from 'type-graphql';

import { Context } from '../../apollo';

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
		@Arg('input') { name, players, tournamentId }: RegisterTeamInput,
		@Ctx() { repositories }: Context,
	): Promise<RegisterTeamPayload> {
		const tournament = await repositories.tournamentRepository.findOne(tournamentId, {
			relations: ['teams'],
		});
		if (!tournament) {
			throw new Error('That tournament does not exist');
		}

		if (tournament.teams.length >= tournament.maxTeams) {
			throw new Error('This tournament is full');
		}

		if (tournament.playersPerTeam != players.filter(player => player !== '').length) {
			throw new Error('Not the correct number of players >:(');
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
