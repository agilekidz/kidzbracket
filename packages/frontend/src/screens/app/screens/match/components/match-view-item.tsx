import React from 'react';

interface User {
	id: string;
	name: string;
}

interface Team {
	id: string;
	name: string;
	players: User[];
}

interface Match {
	id: string;
	firstTeam: Team;
	secondTeam: Team;
}

interface Props {
	match: Match;
}

const MatchViewItem: React.FC<Props> = ({ match }) => {
	return (
		<div>
			<h1>{match.firstTeam.name}</h1>
			{match.firstTeam.players.map(player => (
				<p key={player.id}>{player.name}</p>
			))}
			<h1>{match.secondTeam.name}</h1>
			{match.secondTeam.players.map(player => (
				<p key={player.id}>{player.name}</p>
			))}
		</div>
	);
};

export default MatchViewItem;
