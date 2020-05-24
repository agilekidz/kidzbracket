import React from 'react';

import { gql, useMutation } from '@apollo/client';
import { Button } from 'antd';

import {
	FinalizeMatchContestationMutation,
	FinalizeMatchContestationMutationVariables,
} from './__generated__/FinalizeMatchContestationMutation';

const FINALIZE_MATCH_CONTESTATION_MUTATION = gql`
	mutation FinalizeMatchContestationMutation($input: FinalizeMatchContestationInput!) {
		finalizeMatchContestation(input: $input) {
			match {
				id
				finalized
				winner {
					id
				}
			}
		}
	}
`;

interface Props {
	match: {
		id: string;
		firstTeam: {
			id: string;
			name: string;
		};
		secondTeam: {
			id: string;
			name: string;
		};
	};
}

const FinalizeMatch: React.FC<Props> = ({ match }) => {
	const [_finalizeMatch] = useMutation<
		FinalizeMatchContestationMutation,
		FinalizeMatchContestationMutationVariables
	>(FINALIZE_MATCH_CONTESTATION_MUTATION);

	const finalizeMatch = (winningTeamId: string) => {
		_finalizeMatch({
			variables: {
				input: {
					matchId: match.id,
					winningTeamId,
				},
			},
		});
	};

	return (
		<React.Fragment>
			<Button
				type="primary"
				onClick={() => finalizeMatch(match.firstTeam.id)}
				style={{ marginRight: '8px' }}
			>
				{match.firstTeam.name} won
			</Button>
			<Button
				type="primary"
				onClick={() => finalizeMatch(match.secondTeam.id)}
				style={{ marginLeft: '8px' }}
			>
				{match.secondTeam.name} won
			</Button>
		</React.Fragment>
	);
};

export default FinalizeMatch;
