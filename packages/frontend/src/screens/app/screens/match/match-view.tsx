import React from 'react';

import { PageHeader, Row } from 'antd';
import { useHistory } from 'react-router-dom';

import { useAuth } from '../../contexts/auth-context';

import ContestMatch from './components/contest-match';
import FinalizeMatch from './components/finalize-match';
import ReportVictory from './components/report-victory';
import RequestAdminHelp from './components/request-admin-help';
import Team from './components/team';

interface User {
	id: string;
	name: string;
}

interface Team {
	id: string;
	name: string;
	players: User[];
}

export interface MatchViewMatch {
	id: string;
	firstTeam: Team;
	secondTeam: Team;
	winner: Team | null;
	contested: boolean;
	tournament: { id: string; owner: { id: string } };
	finalized: boolean;
	needAdminHelp: boolean;
}

interface Props {
	match: MatchViewMatch;
	tournament: {
		id: string;
		owner: { id: string };
	};
}

const MatchView: React.FC<Props> = ({ match, tournament }) => {
	const { user } = useAuth();
	const history = useHistory();

	const playerIsInFirstTeam = (playerId: string) => {
		return match.firstTeam.players.find(player => player.id === playerId) !== undefined;
	};

	const playerIsInSecondTeam = (playerId: string) => {
		return match.secondTeam.players.find(player => player.id === playerId) !== undefined;
	};

	const playerIsInMatch = (playerId: string) => {
		return playerIsInFirstTeam(playerId) || playerIsInSecondTeam(playerId);
	};

	const playerIsInLosingTeam = (playerId: string) => {
		if (match.winner) {
			if (match.firstTeam.id === match.winner.id) {
				return playerIsInSecondTeam(playerId);
			} else {
				return playerIsInFirstTeam(playerId);
			}
		}

		return false;
	};

	const canReportVictory = user && !match.winner && playerIsInMatch(user.id);
	const canContestMatch =
		user && match.winner && !match.contested && !match.finalized && playerIsInLosingTeam(user.id);
	const canFinalizeMatch =
		user && match.contested && !match.finalized && user.id === tournament.owner.id;
	const canRequestAdminHelp =
		user && !match.needAdminHelp && !match.finalized && playerIsInMatch(user.id);

	return (
		<React.Fragment>
			<PageHeader
				title={`${match.firstTeam.name} vs. ${match.secondTeam.name}`}
				onBack={() => history.replace(`/tournaments/${tournament.id}`)}
			/>
			<Row justify="space-around" align="middle">
				<Team
					team={match.firstTeam}
					winner={
						(match.finalized && match.winner && match.winner.id === match.firstTeam.id) || false
					}
				/>
				<h1>vs.</h1>
				<Team
					team={match.secondTeam}
					winner={
						(match.finalized && match.winner && match.winner.id === match.secondTeam.id) || false
					}
				/>
			</Row>
			<Row justify="center" style={{ margin: '16px 0' }}>
				{canReportVictory && (
					<ReportVictory
						matchId={match.id}
						// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
						teamId={playerIsInFirstTeam(user!.id) ? match.firstTeam.id : match.secondTeam.id}
					/>
				)}
				{canContestMatch && <ContestMatch matchId={match.id} />}
				{canFinalizeMatch && <FinalizeMatch match={match} />}
			</Row>
			{canRequestAdminHelp && (
				<Row justify="center" style={{ margin: '16px 0' }}>
					<RequestAdminHelp matchId={match.id} />
				</Row>
			)}
		</React.Fragment>
	);
};

export default MatchView;
