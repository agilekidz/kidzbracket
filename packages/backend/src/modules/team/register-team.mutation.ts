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
		const tournament = await tournamentRepository.findOne(tournamentId, { relations: ['teams'] });
		if (!tournament) {
			throw new Error('That tournament does not exist');
		}

		console.log(tournament.teams.length);
		if (tournament.teams.length >= tournament.maxTeams) {
			throw new Error('This tournament is full');
		}

		if (tournament.playersPerTeam != players.filter(player => player !== '').length) {
			throw new Error('Not the correct number of players >:(');
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
