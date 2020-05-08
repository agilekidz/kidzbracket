import React from 'react';

import { useHistory } from 'react-router-dom';

import { Desc, Game, Image, Innerbox, Mainbox, Name } from './tournament-card-styles';

interface Props {
	tournament: {
		id: string;
		name: string;
		description: string;
		game: string;
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
