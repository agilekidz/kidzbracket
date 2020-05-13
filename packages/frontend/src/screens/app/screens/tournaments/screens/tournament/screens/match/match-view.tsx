import React from 'react';

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
}

interface Props {
	reportWin: (teamId: string) => void;
	reportContested: (contested: boolean) => void;
	match: MatchViewMatch;
	loading: boolean;
}

const MatchView: React.FC<Props> = ({ reportWin, reportContested, match, loading }) => {
	if (match.winner) {
		return (
			<div>
				<MatchViewItem key={match.id} match={match} />
				<h1>The winner is: {match.winner.name}</h1>
				{match.contested && <h1>The match has been contested!</h1>}
				{/*	 idk, if I dont have an arrow function in the onclick gets sad */}
				{!match.contested && (
					<button disabled={loading} onClick={() => reportContested(true)}>
						Contest result!
					</button>
				)}
			</div>
		);
	}

	return (
		<div>
			<MatchViewItem key={match.id} match={match} />
			<h1>Which team won?</h1>
			<button onClick={() => reportWin(match.firstTeam.id)}>{match.firstTeam.name} won!</button>
			<button onClick={() => reportWin(match.secondTeam.id)}>{match.secondTeam.name} won!</button>
		</div>
	);
};

export default MatchView;
