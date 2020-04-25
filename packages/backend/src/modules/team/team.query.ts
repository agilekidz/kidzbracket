import { Arg, Query, Resolver } from 'type-graphql';
import { getRepository } from 'typeorm';

import DBTeam from '../../entities/team';

import GQLTeam from './team';

@Resolver()
export default class TeamQueryResolver {
	@Query(() => GQLTeam)
	async team(@Arg('id', { description: 'Identifier of the team' }) id: string): Promise<GQLTeam> {
		const teamRepository = getRepository(DBTeam);
		const team = await teamRepository.findOne({ where: { id } });
		if (team == undefined) {
			throw new Error('Team does not exist');
		}

		return team;
	}
}
