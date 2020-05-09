import React from 'react';

interface Team {
	id: string;
	name: string;
}

export interface MatchViewMatch {
	firstTeam: Team;
	secondTeam: Team;
	winner: Team | null;
	contested: boolean | null;
}

interface Props {
	reportWin: (teamId: string) => void;
	reportContested: (contested: boolean) => void;
	match: MatchViewMatch;
}

const MatchView: React.FC<Props> = ({ reportWin, reportContested, match }) => {
	const isContested = () => {
		console.log(match.contested);
		if (match.contested) {
			return <h1>This match has been contested!</h1>;
		} else {
			return <button onClick={() => reportContested(true)}>Contest</button>;
		}
	};

	if (match.winner) {
		return (
			<div>
				<h1>The winner is: {match.winner.name}</h1>
				{isContested()}
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
