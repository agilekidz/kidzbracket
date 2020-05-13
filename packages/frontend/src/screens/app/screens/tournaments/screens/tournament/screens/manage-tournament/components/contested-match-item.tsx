import React from 'react';

import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

const Item = styled.div`
	width: 80%;
	height: 20px;
	text-align: center;
`;

const ItemWrapper = styled.div`
	width: 100%;
	height: 50px;
	background: lightgray;
	border: solid 1px black;
	display: flex;
	justify-content: center;
	align-items: center;
	cursor: pointer;
`;

interface Team {
	id: string;
	name: string;
}

interface Match {
	id: string;
	firstTeam: Team | null;
	secondTeam: Team | null;
}

interface Props {
	match: Match;
	tournament: { id: string };
}

const ContestedMatchItem: React.FC<Props> = ({ match, tournament }) => {
	const adress = '/tournaments/' + tournament.id + '/match/' + match.id;
	const history = useHistory();

	return (
		<ItemWrapper onClick={() => history.push(adress)}>
			<Item>
				{match.firstTeam?.name} vs {match.secondTeam?.name} is contested
			</Item>
		</ItemWrapper>
	);
};

export default ContestedMatchItem;
