import React from 'react';

interface Props {
	tournament: {
		currentlyRegisteredTeamCount: number;
		maxTeams: number;
		winner: {
			name: string;
		} | null;
		started: boolean;
		game: string;
		description: string;
	};
}
const OverviewView: React.FC<Props> = ({ tournament }) => {
	return (
		<React.Fragment>
			<p>Game: {tournament.game}</p>
			<p>Description: {tournament.description}</p>
			<p>
				Teams registered: {tournament.currentlyRegisteredTeamCount}/{tournament.maxTeams}
			</p>
			{tournament.started && !tournament.winner && (
				<p>
					<strong>Tournament started</strong>
				</p>
			)}
			{tournament.winner && (
				<p>
					<strong>Winner: {tournament.winner.name}</strong>
				</p>
			)}
		</React.Fragment>
	);
};

export default OverviewView;
