import React from 'react';

import { gql, useMutation } from '@apollo/client';
import { Button } from 'antd';

import {
	ReportVictoryMutation,
	ReportVictoryMutationVariables,
} from './__generated__/ReportVictoryMutation';

const REPORT_VICTORY_MUTATION = gql`
	mutation ReportVictoryMutation($input: ReportVictoryInput!) {
		reportVictory(input: $input) {
			match {
				id
				winner {
					id
				}
			}
		}
	}
`;

interface Props {
	matchId: string;
	teamId: string;
}

const ReportVictory: React.FC<Props> = ({ matchId, teamId }) => {
	const [reportVictory] = useMutation<ReportVictoryMutation, ReportVictoryMutationVariables>(
		REPORT_VICTORY_MUTATION,
	);

	return (
		<Button
			type="primary"
			onClick={() => {
				reportVictory({
					variables: {
						input: {
							matchId,
							teamId,
						},
					},
				});
			}}
		>
			My team won!
		</Button>
	);
};

export default ReportVictory;
