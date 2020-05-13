import React from 'react';

import AdminCheck from '../../components/admin-check';

import MatchViewItem from './components/match-view-item';

interface Team {
	id: string;
	name: string;
	players: string[];
}

export interface MatchViewMatch {
	id: string;
	firstTeam: Team;
	secondTeam: Team;
	winner: Team | null;
	contested: boolean;
	tournament: { id: string; owner: { id: string } };
	finalized: boolean;
}

interface Props {
	reportWin: (teamId: string) => void;
	reportContested: (contested: boolean) => void;
	reportFinalized: () => void;
	match: MatchViewMatch;
	loading: boolean;
	tournament: {
		id: string;
		owner: { id: string };
	};
}

const MatchView: React.FC<Props> = ({
	reportWin,
	reportContested,
	reportFinalized,
	match,
	loading,
	tournament,
}) => {
	function firstTeamRetcon() {
		reportWin(match.firstTeam.id);
		console.log(reportFinalized());
	}
	function secondTeamRetcon() {
		reportWin(match.secondTeam.id);
		console.log(reportFinalized());
	}

	if (match.winner) {
		return (
			<div>
				<MatchViewItem match={match} />
				<h1>The winner is: {match.winner.name}</h1>
				{match.contested && !match.finalized && <h1>The match has been contested!</h1>}
				{match.contested && !match.finalized && (
					<AdminCheck ownerId={tournament.owner.id}>
						<button onClick={firstTeamRetcon}>FRORST TERM WONNED</button>
						<button onClick={secondTeamRetcon}>SECND TERM WONNED</button>
					</AdminCheck>
				)}

				{/*	 idk, if I dont have an arrow function in the onclick gets sad */}
				{!match.contested && !match.finalized && (
					<button disabled={loading} onClick={() => reportContested(true)}>
						Contest result!
					</button>
				)}
			</div>
		);
	}

	return (
		<div>
			<MatchViewItem match={match} />
			<h1>Which team won?</h1>
			<button onClick={() => reportWin(match.firstTeam.id)}>{match.firstTeam.name} won!</button>
			<button onClick={() => reportWin(match.secondTeam.id)}>{match.secondTeam.name} won!</button>
		</div>
	);
};

export default MatchView;
