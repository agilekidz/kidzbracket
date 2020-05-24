import React from 'react';

import { gql, useMutation } from '@apollo/client';
import { Button } from 'antd';

import {
	ContestMatchMutation,
	ContestMatchMutationVariables,
} from './__generated__/ContestMatchMutation';

const CONTEST_MATCH_MUTATION = gql`
	mutation ContestMatchMutation($id: ID!) {
		contestMatch(id: $id) {
			match {
				id
				contested
			}
		}
	}
`;

interface Props {
	matchId: string;
}

const ContestMatch: React.FC<Props> = ({ matchId }) => {
	const [contestMatch] = useMutation<ContestMatchMutation, ContestMatchMutationVariables>(
		CONTEST_MATCH_MUTATION,
	);

	return (
		<Button
			type="primary"
			onClick={() => {
				contestMatch({
					variables: {
						id: matchId,
					},
				});
			}}
		>
			No! <strong>My</strong> team won!
		</Button>
	);
};

export default ContestMatch;
