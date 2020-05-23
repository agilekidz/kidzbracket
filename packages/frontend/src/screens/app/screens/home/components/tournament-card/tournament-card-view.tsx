import React from 'react';

import { Card } from 'antd';
import { useHistory } from 'react-router-dom';

interface Props {
	tournament: {
		id: string;
		name: string;
		description: string;
		game: string;
		maxTeams: number;
		teams: {
			id: string;
			name: string;
		}[];
		winner: { name: string } | null;
		started: boolean;
	};
}

const TournamentCardView: React.FC<Props> = ({ tournament }) => {
	const history = useHistory();
	return (
		<Card
			cover={
				<div
					onClick={() => history.push('/tournaments/' + tournament.id)}
					style={{
						cursor: 'pointer',
						height: '200px',
						backgroundImage:
							'url("https://theme.zdassets.com/theme_assets/43400/87a1ef48e43b8cf114017e3ad51b801951b20fcf.jpg")',
						backgroundSize: 'cover',
						backgroundRepeat: 'no-repeat',
						backgroundPosition: '50% 0',
					}}
				/>
			}
		>
			<h2
				onClick={() => history.push('/tournaments/' + tournament.id)}
				style={{
					cursor: 'pointer',
				}}
			>
				{tournament.name}
			</h2>
			<p>Game: {tournament.game}</p>
			<p>Description: {tournament.description}</p>
			<p>
				Registered teams: {tournament.teams.length}/{tournament.maxTeams}
			</p>
			{tournament.winner && <p>Winner: {tournament.winner.name} </p>}
			{tournament.started && (
				<p>
					<strong>Started</strong>
				</p>
			)}
		</Card>
	);
};

export default TournamentCardView;
