import { useEffect } from 'react';

import { useApolloClient, useSubscription } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import { AppHooksTournamentFragment } from './__generated__/AppHooksTournamentFragment';
import { AppHooksTournamentQuery } from './__generated__/AppHooksTournamentQuery';
import {
	AppHooksTournamentTeamsQuery,
	AppHooksTournamentTeamsQueryVariables,
} from './__generated__/AppHooksTournamentTeamsQuery';
import { MatchFinalizedSubscription } from './__generated__/MatchFinalizedSubscription';
import { MatchFragment } from './__generated__/MatchFragment';
import { TeamRegisteredSubscription } from './__generated__/TeamRegisteredSubscription';
import { TournamentCreatedSubscription } from './__generated__/TournamentCreatedSubscription';

const TEAM_REGISTERED_SUBSCRIPTION = gql`
	subscription TeamRegisteredSubscription {
		teamRegistered {
			id
			name
			players {
				id
				name
			}
			tournament {
				id
			}
		}
	}
`;

const TOURNAMENT_TEAMS_FRAGMENT = gql`
	fragment AppHooksTournamentFragment on Tournament {
		id
		teams {
			id
		}
	}
`;

export const useTeamRegistered = () => {
	const client = useApolloClient();
	const { data: teamRegisteredData } = useSubscription<TeamRegisteredSubscription>(
		TEAM_REGISTERED_SUBSCRIPTION,
	);

	useEffect(() => {
		if (teamRegisteredData) {
			try {
				const id = 'Tournament:' + teamRegisteredData.teamRegistered.tournament.id;
				const tournamentTeamsData = client.readFragment<AppHooksTournamentFragment>({
					fragment: TOURNAMENT_TEAMS_FRAGMENT,
					id,
				});
				if (tournamentTeamsData) {
					if (
						!tournamentTeamsData.teams.find(
							team => team.id === teamRegisteredData.teamRegistered.id,
						)
					) {
						client.writeFragment<AppHooksTournamentFragment>({
							fragment: TOURNAMENT_TEAMS_FRAGMENT,
							id,
							data: {
								...tournamentTeamsData,
								teams: [...tournamentTeamsData.teams, teamRegisteredData.teamRegistered],
							},
							variables: {
								tournamentId: teamRegisteredData.teamRegistered.tournament.id,
							},
						});
					}
				}
			} catch (error) {
				// Query does not exist in cache, it's all good
			}
		}
	}, [client, teamRegisteredData]);
};
