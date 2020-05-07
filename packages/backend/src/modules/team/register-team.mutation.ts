import { Arg, Field, InputType, Mutation, ObjectType, Resolver } from 'type-graphql';
import { getRepository } from 'typeorm';

import DBTeam from '../../entities/team';
import DBTournament from '../../entities/tournament';

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
	): Promise<RegisterTeamPayload> {
		const tournamentRepository = getRepository(DBTournament);
		const tournament = await tournamentRepository.findOne({ id: tournamentId });
		if (!tournament) {
			throw new Error('That tournament does not exist');
		}

		const teamRepository = getRepository(DBTeam);
		let team = teamRepository.create({
			name,
			players,
			tournament,
		});

		team = await teamRepository.save(team);

		return {
			team,
		};
	}
}
