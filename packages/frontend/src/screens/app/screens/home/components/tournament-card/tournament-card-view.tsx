import React from 'react';

import { useHistory } from 'react-router-dom';

import { Desc, Game, Image, Innerbox, Mainbox, Name } from './tournament-card-styles';

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
	};
}

const TournamentCardView: React.FC<Props> = ({ tournament }) => {
	const history = useHistory();
	return (
		<Mainbox>
			<Innerbox onClick={() => history.push('/tournaments/' + tournament.id)}>
				<div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', marginRight: '10%' }}>
					<Name>{tournament.name}</Name>
					<div style={{ display: 'flex', margin: '10px 0 30px 0' }}>
						<Game>Game: {tournament.game}</Game>
					</div>
					<Desc>{tournament.description}</Desc>
					<div>
						{tournament.teams.length}/{tournament.maxTeams}
					</div>
					{tournament.winner && (
						<div style={{ padding: '5px 10px' }}>Winner: {tournament.winner.name} </div>
					)}
				</div>
				<div
					style={{
						flexBasis: '200px',
						flexShrink: 0,
						alignItems: 'center',
						justifyContent: 'center',
						display: 'flex',
					}}
				>
					<Image>Logo Placeholder</Image>
				</div>
			</Innerbox>
		</Mainbox>
	);
};

export default TournamentCardView;
