import { useEffect } from 'react';

import { useApolloClient, useSubscription } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import { MatchFinalizedContestedMatchesFragment } from './__generated__/MatchFinalizedContestedMatchesFragment';
import { MatchFinalizedMatchFragment } from './__generated__/MatchFinalizedMatchFragment';
import { MatchFinalizedSubscription } from './__generated__/MatchFinalizedSubscription';
import { MatchFinalizedTournamentFragment } from './__generated__/MatchFinalizedTournamentFragment';

const MATCH_FINALIZED_SUBSCRIPTION = gql`
	subscription MatchFinalizedSubscription {
		matchFinalized {
			id
			finalized
			tournament {
				id
			}
			winner {
				id
				name
			}
			round
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
	fragment MatchFinalizedMatchFragment on Match {
		finalized
	}
`;

const TOURNAMENT_FRAGMENT = gql`
	fragment MatchFinalizedTournamentFragment on Tournament {
		winner {
			id
		}
	}
`;

const TOURNAMENT_CONTESTED_MATCHES_FRAGMENT = gql`
	fragment MatchFinalizedContestedMatchesFragment on Tournament {
		contestedMatches {
			id
		}
	}
`;

export const useMatchFinalized = () => {
	const client = useApolloClient();
	const { data } = useSubscription<MatchFinalizedSubscription>(MATCH_FINALIZED_SUBSCRIPTION);

	useEffect(() => {
		if (data) {
			const matchId = 'Match:' + data.matchFinalized.id;
			const matchFragmentData = client.readFragment<MatchFinalizedMatchFragment>({
				id: matchId,
				fragment: MATCH_FRAGMENT,
			});

			if (matchFragmentData) {
				client.writeFragment<MatchFinalizedMatchFragment>({
					id: matchId,
					fragment: MATCH_FRAGMENT,
					data: data.matchFinalized,
				});
			}

			// If final match
			if (data.matchFinalized.round === 1) {
				try {
					const tournamentId = 'Tournament:' + data.matchFinalized.tournament.id;
					const tournamentFragmentData = client.readFragment<MatchFinalizedTournamentFragment>({
						id: tournamentId,
						fragment: TOURNAMENT_FRAGMENT,
					});
					if (tournamentFragmentData) {
						client.writeFragment<MatchFinalizedTournamentFragment>({
							id: tournamentId,
							fragment: TOURNAMENT_FRAGMENT,
							data: {
								...tournamentFragmentData,
								winner: data.matchFinalized.winner,
							},
						});
					}
				} catch (error) {
					// Tournament winner field not in cache, dw
				}

				// Remove finalized match from contested matches list of a tournament
				try {
					const tournamentId = 'Tournament:' + data.matchFinalized.tournament.id;
					const tournamentFragmentData = client.readFragment<
						MatchFinalizedContestedMatchesFragment
					>({
						id: tournamentId,
						fragment: TOURNAMENT_CONTESTED_MATCHES_FRAGMENT,
					});

					if (tournamentFragmentData) {
						client.writeFragment<MatchFinalizedContestedMatchesFragment>({
							id: tournamentId,
							fragment: TOURNAMENT_CONTESTED_MATCHES_FRAGMENT,
							data: {
								...tournamentFragmentData,
								contestedMatches: tournamentFragmentData.contestedMatches.filter(
									match => match.id !== data.matchFinalized.id,
								),
							},
						});
					}
				} catch (error) {
					// Match in cache does not have contested field
				}
			}
		}
	}, [client, data]);
};
