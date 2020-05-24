import React from 'react';

import { gql, useMutation } from '@apollo/client';
import { Button } from 'antd';

import {
	RequestAdminHelpMutation,
	RequestAdminHelpMutationVariables,
} from '../__generated__/RequestAdminHelpMutation';

const REQUEST_ADMIN_HELP_MUTATION = gql`
	mutation RequestAdminHelpMutation($id: ID!) {
		reportMatchAdminHelp(needAdminHelp: true, matchId: $id) {
			match {
				id
				needAdminHelp
			}
		}
	}
`;

interface Props {
	matchId: string;
}

const RequestAdminHelp: React.FC<Props> = ({ matchId }) => {
	const [requestAdminHelp] = useMutation<
		RequestAdminHelpMutation,
		RequestAdminHelpMutationVariables
	>(REQUEST_ADMIN_HELP_MUTATION);

	return (
		<Button
			type="primary"
			onClick={() => {
				requestAdminHelp({
					variables: {
						id: matchId,
					},
				});
			}}
		>
			I need admin help!
		</Button>
	);
};

export default RequestAdminHelp;
