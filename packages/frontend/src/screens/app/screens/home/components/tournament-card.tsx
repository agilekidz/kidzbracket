import React from 'react';

import style from 'styled-components';

const Mainbox = style.div`
    margin: 0;
    padding 0;
    width: 100%;
    height: 200px;
    background: darkgray;
    border: 1px solid black;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Innerbox = style.div`
    width: 95%;
    height: 90%;
    padding-left: 5%;
    background: lightgray;
    border-radius: 7px;
    display: flex;
    align-items: stretch;

`;

const Name = style.div`
    height: 20%;
    font:  2em "Arial", sans-serif;
    border-bottom: black 2px solid;

`;

const Time = style.div`
    width: 10%;
    height: 15%;
    font: 1em "Arial", sans-serif;
   
`;

const Teams = style.div`
    width: 20%;
    height: 15%;
    font: 1em "Arial", sans-serif;
   
`;

const Desc = style.div`
    width: 65%;
    height: 30%;
    font: 1em "Arial", sans-serif;
  
`;

const Region = style.div`
    width: 12%;
    height: 15%;
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
	info: {
		id: number;
		name: string;
		date: Date;
		desc: string;
		teams: string;
		game: string;
		region: string;
	};
}

const TournamentCard: React.FC<TCProps> = ({ info }) => {
	return (
		<Mainbox>
			<Innerbox>
				<div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', marginRight: '10%' }}>
					<Name>{info.name}</Name>
					<div style={{ display: 'flex', margin: '10px 0 30px 0' }}>
						<Time>
							Date: {info.date.getDate()}/{info.date.getMonth()}
						</Time>
						<Teams>Teams Registerd: {info.teams}</Teams>
						<Region>Region: {info.region}</Region>
						<Game>Game: {info.game}</Game>
					</div>
					<Desc>
						Lorem ipsum dolor sit amet, consectetur adipisicing elit. Saepe eius sint inventore
						optio ut numquam, consequatur, doloribus, architecto suscipit fuga similique excepturi
						minus maiores dicta distinctio? Doloribus maiores tempora quam?
					</Desc>
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
