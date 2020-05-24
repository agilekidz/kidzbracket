import { useEffect } from 'react';

import { useApolloClient, useSubscription } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import { MatchContestedMatchFragment } from './__generated__/MatchContestedMatchFragment';
import { MatchContestedSubscription } from './__generated__/MatchContestedSubscription';

const MATCH_CONTESTED_SUBSCRIPTION = gql`
	subscription MatchContestedSubscription {
		matchContested {
			id
			contested
		}
	}
`;

const MATCH_FRAGMENT = gql`
	fragment MatchContestedMatchFragment on Match {
		contested
	}
`;

export const useMatchContested = () => {
	const client = useApolloClient();
	const { data } = useSubscription<MatchContestedSubscription>(MATCH_CONTESTED_SUBSCRIPTION);

	useEffect(() => {
		if (data) {
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
		}
	}, [client, data]);
};
