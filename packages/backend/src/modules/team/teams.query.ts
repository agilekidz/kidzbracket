import { Query, Resolver } from 'type-graphql';
import { getRepository } from 'typeorm';

import DBTeam from '../../entities/team';

import GQLTeam from './team';

@Resolver()
export default class TeamsQueryResolver {
	@Query(() => [GQLTeam])
	async teams(): Promise<GQLTeam[]> {
		const teamRepository = getRepository(DBTeam);
		return teamRepository.find();
	}
}
