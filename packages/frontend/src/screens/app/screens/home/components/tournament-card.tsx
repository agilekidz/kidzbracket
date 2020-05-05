import React from 'react';

import style from 'styled-components';

const Mainbox = style.div`
    margin: 0;
    padding: 0;
    width: 100%;
    height: 200px;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Innerbox = style.div`
    width: 100%;
    height: 90%;
    padding-left: 5%;
    background: rgb(229, 234, 250);
    border-radius: 7px;
    display: flex;
	align-items: stretch;
	border: 4px solid rgb(43, 45, 66);
	transition: all 0.2s;
	&:hover{
		box-shadow: inset 0 0 10px #000000;
		background: #ccd1e3;
	}

`;
// old color #bcc0d0

const Name = style.div`
    height: 20%;
    font:  2em "Arial", sans-serif;
    border-bottom: black 2px solid;

`;

const Desc = style.div`
    width: 65%;
    height: 30%;
    font: 1em "Arial", sans-serif;
  
`;

const Game = style.div`
    width: 20%;
    height: 15%;
    font: 1em "Arial", sans-serif;
    
`;

const Image = style.div`
    background: purple;
    width: 90%;
    height 90%;
`;

interface TCProps {
	tournament: {
		id: string;
		name: string;
		description: string;
		game: string;
	};
}

const TournamentCard: React.FC<TCProps> = ({ tournament }) => {
	return (
		<Mainbox>
			<Innerbox>
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

export default TournamentCard;
