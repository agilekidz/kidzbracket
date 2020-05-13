import React from 'react';

import { gql, useMutation } from '@apollo/client';

import {
	ReportMatchContestedMutation,
	ReportMatchContestedMutationVariables,
} from './__generated__/ReportMatchContestedMutation';
import {
	ReportMatchFinalizedMutation,
	ReportMatchFinalizedMutationVariables,
} from './__generated__/ReportMatchFinalizedMutation';
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

const REPORT_MATCH_CONTESTED_MUTATION = gql`
	mutation ReportMatchContestedMutation($matchId: ID!, $contested: Boolean!) {
		reportMatchContested(matchId: $matchId, contested: $contested) {
			match {
				id
				contested
			}
		}
	}
`;

const REPORT_MATCH_FINALIZED_MUTATION = gql`
	mutation ReportMatchFinalizedMutation($matchId: ID!) {
		reportMatchFinalized(matchId: $matchId) {
			match {
				id
				finalized
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

	const [reportMatchFinalized] = useMutation<
		ReportMatchFinalizedMutation,
		ReportMatchFinalizedMutationVariables
	>(REPORT_MATCH_FINALIZED_MUTATION);

	const reportWin = (teamId: string) => {
		reportMatchWin({ variables: { matchId: match.id, teamId } });
	};

	const reportFinalized = () => {
		reportMatchFinalized({ variables: { matchId: match.id } });
	};

	const [reportMatchContested, { called }] = useMutation<
		ReportMatchContestedMutation,
		ReportMatchContestedMutationVariables
	>(REPORT_MATCH_CONTESTED_MUTATION);

	const reportContested = (contested: boolean) => {
		reportMatchContested({ variables: { matchId: match.id, contested: contested } });
	};

	return (
		<MatchView
			loading={called}
			reportWin={reportWin}
			reportContested={reportContested}
			reportFinalized={reportFinalized}
			match={match}
			tournament={match.tournament}
		/>
	);
};

export default MatchLogic;
