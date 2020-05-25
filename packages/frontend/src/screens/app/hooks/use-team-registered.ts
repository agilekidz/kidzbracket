import { useEffect } from 'react';

import { useApolloClient, useSubscription } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import { TeamRegisteredSubscription } from './__generated__/TeamRegisteredSubscription';
import { TeamRegisteredTournamentFragment } from './__generated__/TeamRegisteredTournamentFragment';

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
	fragment TeamRegisteredTournamentFragment on Tournament {
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
				const tournamentTeamsData = client.readFragment<TeamRegisteredTournamentFragment>({
					fragment: TOURNAMENT_TEAMS_FRAGMENT,
					id,
				});
				if (tournamentTeamsData) {
					if (
						!tournamentTeamsData.teams.find(
							team => team.id === teamRegisteredData.teamRegistered.id,
						)
					) {
						client.writeFragment<TeamRegisteredTournamentFragment>({
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
