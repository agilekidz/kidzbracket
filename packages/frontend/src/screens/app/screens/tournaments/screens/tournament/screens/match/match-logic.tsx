import React from 'react';

import { gql, useMutation } from '@apollo/client';

import {
	ContestMatchMutation,
	ContestMatchMutationVariables,
} from './__generated__/ContestMatchMutation';
import {
	FinalizeMatchContestationMutation,
	FinalizeMatchContestationMutationVariables,
} from './__generated__/FinalizeMatchContestationMutation';
import {
	ReportVictoryMutation,
	ReportVictoryMutationVariables,
} from './__generated__/ReportVictoryMutation';
import MatchView, { MatchViewMatch } from './match-view';

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

interface Match extends MatchViewMatch {
	id: string;
}

interface Props {
	match: Match;
}

const MatchLogic: React.FC<Props> = ({ match }) => {
	const [_reportVictory] = useMutation<ReportVictoryMutation, ReportVictoryMutationVariables>(
		REPORT_VICTORY_MUTATION,
	);

	const [_contestMatch, { called }] = useMutation<
		ContestMatchMutation,
		ContestMatchMutationVariables
	>(CONTEST_MATCH_MUTATION);

	const [_finalizeMatchContestation] = useMutation<
		FinalizeMatchContestationMutation,
		FinalizeMatchContestationMutationVariables
	>(FINALIZE_MATCH_CONTESTATION_MUTATION);

	const reportVictory = (teamId: string) => {
		_reportVictory({
			variables: {
				input: {
					matchId: match.id,
					teamId,
				},
			},
		});
	};

	const contestMatch = () => {
		_contestMatch({ variables: { id: match.id } });
	};

	const finalizeMatchContestation = (winningTeamId: string) => {
		_finalizeMatchContestation({
			variables: {
				input: {
					matchId: match.id,
					winningTeamId,
				},
			},
		});
	};

	return (
		<MatchView
			loading={called}
			reportVictory={reportVictory}
			contestMatch={contestMatch}
			finalizeMatchContestation={finalizeMatchContestation}
			match={match}
			tournament={match.tournament}
		/>
	);
};

export default MatchLogic;
