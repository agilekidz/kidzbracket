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
	reportVictory: (winningTeamId: string) => void;
	contestMatch: () => void;
	finalizeMatchContestation: (winningTeamId: string) => void;
	match: MatchViewMatch;
	loading: boolean;
	tournament: {
		id: string;
		owner: { id: string };
	};
}

const MatchView: React.FC<Props> = ({
	reportVictory,
	contestMatch,
	finalizeMatchContestation,
	match,
	loading,
	tournament,
}) => {
	if (match.winner) {
		return (
			<div>
				<MatchViewItem match={match} />
				<h1>The winner is: {match.winner.name}</h1>
				{match.contested && !match.finalized && <h1>The match has been contested!</h1>}
				{match.contested && !match.finalized && (
					<AdminCheck ownerId={tournament.owner.id}>
						<button onClick={() => finalizeMatchContestation(match.firstTeam.id)}>
							{match.firstTeam.name} won!
						</button>
						<button onClick={() => finalizeMatchContestation(match.secondTeam.id)}>
							{match.secondTeam.name} won!
						</button>
					</AdminCheck>
				)}
				{!match.contested && !match.finalized && (
					<button disabled={loading} onClick={contestMatch}>
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
			<button onClick={() => reportVictory(match.firstTeam.id)}>{match.firstTeam.name} won!</button>
			<button onClick={() => reportVictory(match.secondTeam.id)}>
				{match.secondTeam.name} won!
			</button>
		</div>
	);
};

export default MatchView;
