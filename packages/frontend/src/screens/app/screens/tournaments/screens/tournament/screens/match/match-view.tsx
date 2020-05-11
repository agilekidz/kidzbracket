import React from 'react';

interface Team {
	id: string;
	name: string;
}

export interface MatchViewMatch {
	firstTeam: Team;
	secondTeam: Team;
	winner: Team | null;
	contested: boolean;
}

interface Props {
	reportWin: (teamId: string) => void;
	reportContested: (contested: boolean) => void;
	match: MatchViewMatch;
}

const MatchView: React.FC<Props> = ({ reportWin, reportContested, match }) => {
	if (match.winner) {
		if (match.winner && match.contested) {
			return (
				<div>
					<h1>The winner is: {match.winner.name}</h1>
					{match.contested && <h1>The match has been contested!</h1>}
					{/*	 idk, if I dont have an arrow function in the onclick gets sad */}
					{!match.contested && (
						<button onClick={() => reportContested(true)}>Contest result!</button>
					)}
				</div>
			);
		} else {
			return <div>loading...</div>;
		}
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
