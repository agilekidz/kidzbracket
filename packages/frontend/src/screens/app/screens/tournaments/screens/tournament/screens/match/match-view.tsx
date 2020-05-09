import React, { useState } from 'react';

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
	const [contested, setContested] = useState(match.contested);
	const isContested = () => {
		setContested(true);
		reportContested(true);
	};

	if (match.winner) {
		return (
			<div>
				<h1>The winner is: {match.winner.name}</h1>
				{contested && <h1>The match has been contested!</h1>}
				{!contested && <button onClick={isContested}>Contest result!</button>}
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
