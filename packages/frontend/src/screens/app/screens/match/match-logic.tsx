import React from 'react';

import { gql, useMutation } from '@apollo/client';

import {
	ReportMatchWinMutation,
	ReportMatchWinMutationVariables,
} from './__generated__/ReportMatchWinMutation';
import MatchView, { MatchViewMatch } from './match-view';

const REPORT_MATCH_WIN_MUTATION = gql`
	mutation ReportMatchWinMutation($matchId: ID!, $teamId: ID!) {
		reportMatchWin(matchId: $matchId, teamId: $teamId) {
			match {
				id
				winner {
					id
				}
			}
		}
	}
`;

interface Match extends MatchViewMatch {
	id: string;
}

interface Props {
	match: Match;
}

const MatchLogic: React.FC<Props> = ({ match }) => {
	const [reportMatchWin] = useMutation<ReportMatchWinMutation, ReportMatchWinMutationVariables>(
		REPORT_MATCH_WIN_MUTATION,
	);

	const reportWin = (teamId: string) => {
		reportMatchWin({ variables: { matchId: match.id, teamId } });
	};

	return <MatchView reportWin={reportWin} match={match} />;
};

export default MatchLogic;
