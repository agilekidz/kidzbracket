import React from 'react';

interface Team {
	id: string;
	name: string;
}

export interface MatchViewMatch {
	firstTeam: Team;
	secondTeam: Team;
	winner: Team | null;
}

interface Props {
	reportWin: (teamId: string) => void;
	match: MatchViewMatch;
}

const MatchView: React.FC<Props> = ({ reportWin, match }) => {
	if (match.winner) {
		return (
			<div>
				<h1>The winner is: {match.winner.name}</h1>
				<button>Contest</button>
			</div>
		);
	}

	return (
		<div>
			<h1>Which team won?</h1>
			<button onClick={() => reportWin(match.firstTeam.id)}>{match.firstTeam.name} won!</button>
			<button onClick={() => reportWin(match.secondTeam.id)}>{match.secondTeam.name} won!</button>
		</div>
	);
};

export default MatchView;
