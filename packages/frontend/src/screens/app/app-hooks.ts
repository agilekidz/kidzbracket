import { useEffect } from 'react';

import { useApolloClient, useSubscription } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import { AppHooksTournamentQuery } from './__generated__/AppHooksTournamentQuery';
import {
	AppHooksTournamentTeamsQuery,
	AppHooksTournamentTeamsQueryVariables,
} from './__generated__/AppHooksTournamentTeamsQuery';
import { MatchFinalizedSubscription } from './__generated__/MatchFinalizedSubscription';
import { MatchFragment } from './__generated__/MatchFragment';
import { TeamRegisteredSubscription } from './__generated__/TeamRegisteredSubscription';
import { TournamentCreatedSubscription } from './__generated__/TournamentCreatedSubscription';

const TOURNAMENT_CREATED_SUBSCRIPTION = gql`
	subscription TournamentCreatedSubscription {
		tournamentCreated {
			id
			name
			description
			game
			maxTeams
			winner {
				id
				name
			}
			teams {
				id
				name
			}
			started
		}
	}
`;

const TOURNAMENTS_QUERY = gql`
	query AppHooksTournamentQuery {
		tournaments {
			id
		}
	}
`;

const MATCH_FINALIZED_SUBSCRIPTION = gql`
	subscription MatchFinalizedSubscription {
		matchFinalized {
			id
			finalized
			nextMatch {
				id
				firstTeam {
					id
					name
				}
				secondTeam {
					id
					name
				}
				winner {
					id
					name
				}
				contested
				finalized
				round
				needAdminHelp
			}
		}
	}
`;

const MATCH_FRAGMENT = gql`
	fragment MatchFragment on Match {
		id
		finalized
	}
`;

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

const TOURNAMENT_TEAMS_QUERY = gql`
	query AppHooksTournamentTeamsQuery($tournamentId: ID!) {
		tournament(id: $tournamentId) {
			id
			teams {
				id
			}
		}
	}
`;

export const useSubscriptionSync = () => {
	const client = useApolloClient();
	const { data: tournamentCreatedData } = useSubscription<TournamentCreatedSubscription>(
		TOURNAMENT_CREATED_SUBSCRIPTION,
	);
	const { data: matchFinalizedData } = useSubscription<MatchFinalizedSubscription>(
		MATCH_FINALIZED_SUBSCRIPTION,
	);
	const { data: teamRegisteredData } = useSubscription<TeamRegisteredSubscription>(
		TEAM_REGISTERED_SUBSCRIPTION,
	);

	useEffect(() => {
		if (tournamentCreatedData) {
			try {
				const tournamentsData = client.readQuery<AppHooksTournamentQuery>({
					query: TOURNAMENTS_QUERY,
				});
				if (tournamentsData) {
					if (
						!tournamentsData.tournaments.find(
							tournament => tournament.id === tournamentCreatedData.tournamentCreated.id,
						)
					) {
						client.writeQuery<AppHooksTournamentQuery>({
							query: TOURNAMENTS_QUERY,
							data: {
								tournaments: [
									...tournamentsData.tournaments,
									tournamentCreatedData.tournamentCreated,
								],
							},
						});
					}
				}
			} catch (error) {
				// Query does not exist in cache, it's all good
			}
		}
	}, [client, tournamentCreatedData]);

	useEffect(() => {
		if (matchFinalizedData) {
			const id = 'Match:' + matchFinalizedData.matchFinalized.id;
			const fragmentData = client.readFragment<MatchFragment>({
				id,
				fragment: MATCH_FRAGMENT,
			});

			if (fragmentData) {
				client.writeFragment<MatchFragment>({
					id,
					fragment: MATCH_FRAGMENT,
					data: matchFinalizedData.matchFinalized,
				});
			}
		}
	}, [client, matchFinalizedData]);

	useEffect(() => {
		if (teamRegisteredData) {
			try {
				const tournamentTeamsData = client.readQuery<
					AppHooksTournamentTeamsQuery,
					AppHooksTournamentTeamsQueryVariables
				>({
					query: TOURNAMENT_TEAMS_QUERY,
					variables: {
						tournamentId: teamRegisteredData.teamRegistered.tournament.id,
					},
				});
				if (tournamentTeamsData) {
					if (
						!tournamentTeamsData.tournament.teams.find(
							team => team.id === teamRegisteredData.teamRegistered.id,
						)
					) {
						client.writeQuery<AppHooksTournamentTeamsQuery, AppHooksTournamentTeamsQueryVariables>({
							query: TOURNAMENT_TEAMS_QUERY,
							data: {
								tournament: {
									...tournamentTeamsData.tournament,
									teams: [
										...tournamentTeamsData.tournament.teams,
										teamRegisteredData.teamRegistered,
									],
								},
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
