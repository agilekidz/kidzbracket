import { useEffect } from 'react';

import { useApolloClient, useSubscription } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import { TournamentCreatedSubscription } from './__generated__/TournamentCreatedSubscription';
import { TournamentCreatedTournamentQuery } from './__generated__/TournamentCreatedTournamentQuery';

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
	query TournamentCreatedTournamentQuery {
		tournaments {
			id
		}
	}
`;

export const useTournamentCreated = () => {
	const client = useApolloClient();
	const { data: tournamentCreatedData } = useSubscription<TournamentCreatedSubscription>(
		TOURNAMENT_CREATED_SUBSCRIPTION,
	);

	useEffect(() => {
		if (tournamentCreatedData) {
			try {
				const tournamentsData = client.readQuery<TournamentCreatedTournamentQuery>({
					query: TOURNAMENTS_QUERY,
				});
				if (tournamentsData) {
					if (
						!tournamentsData.tournaments.find(
							tournament => tournament.id === tournamentCreatedData.tournamentCreated.id,
						)
					) {
						client.writeQuery<TournamentCreatedTournamentQuery>({
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
};
