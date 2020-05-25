import { useEffect } from 'react';

import { useApolloClient, useSubscription } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import { VictoryReportedMatchFragment } from './__generated__/VictoryReportedMatchFragment';
import { VictoryReportedSubscription } from './__generated__/VictoryReportedSubscription';

const VICTORY_REPORTED_SUBSCRIPTION = gql`
	subscription VictoryReportedSubscription {
		victoryReported {
			id
			winner {
				id
				name
			}
		}
	}
`;

const MATCH_FRAGMENT = gql`
	fragment VictoryReportedMatchFragment on Match {
		winner {
			id
			name
		}
	}
`;

export const useVictoryReported = () => {
	const client = useApolloClient();
	const { data } = useSubscription<VictoryReportedSubscription>(VICTORY_REPORTED_SUBSCRIPTION);

	useEffect(() => {
		if (data) {
			const matchId = 'Match:' + data.victoryReported.id;
			const matchFragmentData = client.readFragment<VictoryReportedMatchFragment>({
				id: matchId,
				fragment: MATCH_FRAGMENT,
			});

			if (matchFragmentData) {
				client.writeFragment<VictoryReportedMatchFragment>({
					id: matchId,
					fragment: MATCH_FRAGMENT,
					data: data.victoryReported,
				});
			}
		}
	}, [client, data]);
};
