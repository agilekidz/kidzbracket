import { useEffect } from 'react';

import { useApolloClient, useSubscription } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import { TournamentStartedFragment } from './__generated__/TournamentStartedFragment';
import { TournamentStartedSubscription } from './__generated__/TournamentStartedSubscription';

const TOURNAMENT_STARTED_SUBSCRIPTION = gql`
	subscription TournamentStartedSubscription {
		tournamentStarted {
			id
			started
		}
	}
`;

const TOURNAMENT_FRAGMENT = gql`
	fragment TournamentStartedFragment on Tournament {
		id
		started
	}
`;

export const useTournamentStarted = () => {
	const client = useApolloClient();
	const { data } = useSubscription<TournamentStartedSubscription>(TOURNAMENT_STARTED_SUBSCRIPTION);

	useEffect(() => {
		if (data) {
			const id = 'Tournament:' + data.tournamentStarted.id;
			const fragmentData = client.readFragment<TournamentStartedFragment>({
				id,
				fragment: TOURNAMENT_FRAGMENT,
			});

			if (fragmentData) {
				client.writeFragment<TournamentStartedFragment>({
					id,
					fragment: TOURNAMENT_FRAGMENT,
					data: data.tournamentStarted,
				});
			}
		}
	}, [client, data]);
};
