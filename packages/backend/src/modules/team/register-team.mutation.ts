import { Arg, Ctx, Field, InputType, Mutation, ObjectType, Query, Resolver } from 'type-graphql';
import { getRepository } from 'typeorm';

import { Context } from '../../apollo';
import DBTeam from '../../entities/team';

@InputType()
class RegisterTeamInput {
	@Field()
	name: string;
}

@ObjectType()
class RegisterTeamPayload {
	@Field()
	success: boolean;
}

@Resolver()
export default class RegisterTeamMutationResolver {
	@Mutation(() => RegisterTeamPayload)
	async registerTeam(
		@Ctx() context: Context,
		@Arg('input') { name }: RegisterTeamInput,
	): Promise<RegisterTeamPayload> {
		const teamRepository = getRepository(DBTeam);
		let team = await teamRepository.findOne(undefined, {
			where: { name },
		});

		if (team) {
			throw new Error('A team with that email already exists');
		}

		team = teamRepository.create({
			name,
		});

		team = await teamRepository.save(team);

		return {
			success: true,
		};
	}
}
