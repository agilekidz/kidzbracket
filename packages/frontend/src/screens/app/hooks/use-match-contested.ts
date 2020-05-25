import { useEffect } from 'react';

import { useApolloClient, useSubscription } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import { MatchContestedMatchFragment } from './__generated__/MatchContestedMatchFragment';
import { MatchContestedSubscription } from './__generated__/MatchContestedSubscription';
import { TournamentContestedMatchesFragment } from './__generated__/TournamentContestedMatchesFragment';

const MATCH_CONTESTED_SUBSCRIPTION = gql`
	subscription MatchContestedSubscription {
		matchContested {
			id
			contested
			firstTeam {
				id
				name
			}
			secondTeam {
				id
				name
			}
			tournament {
				id
			}
		}
	}
`;

const MATCH_FRAGMENT = gql`
	fragment MatchContestedMatchFragment on Match {
		contested
	}
`;

const TOURNAMENT_CONTESTED_MATCHES_FRAGMENT = gql`
	fragment TournamentContestedMatchesFragment on Tournament {
		contestedMatches {
			id
			firstTeam {
				id
				name
			}
			secondTeam {
				id
				name
			}
		}
	}
`;

export const useMatchContested = () => {
	const client = useApolloClient();
	const { data } = useSubscription<MatchContestedSubscription>(MATCH_CONTESTED_SUBSCRIPTION);

	useEffect(() => {
		if (data) {
			try {
				const matchId = 'Match:' + data.matchContested.id;
				const matchFragmentData = client.readFragment<MatchContestedMatchFragment>({
					id: matchId,
					fragment: MATCH_FRAGMENT,
				});

				if (matchFragmentData) {
					client.writeFragment<MatchContestedMatchFragment>({
						id: matchId,
						fragment: MATCH_FRAGMENT,
						data: data.matchContested,
					});
				}
			} catch (error) {
				// Match in cache does not have contested field
			}

			try {
				const tournamentId = 'Tournament:' + data.matchContested.tournament.id;
				const tournamentFragmentData = client.readFragment<TournamentContestedMatchesFragment>({
					id: tournamentId,
					fragment: TOURNAMENT_CONTESTED_MATCHES_FRAGMENT,
				});

				if (tournamentFragmentData) {
					client.writeFragment<TournamentContestedMatchesFragment>({
						id: tournamentId,
						fragment: TOURNAMENT_CONTESTED_MATCHES_FRAGMENT,
						data: {
							...tournamentFragmentData,
							contestedMatches: [...tournamentFragmentData.contestedMatches, data.matchContested],
						},
					});
				}
			} catch (error) {
				// Match in cache does not have contested field
			}
		}
	}, [client, data]);
};
