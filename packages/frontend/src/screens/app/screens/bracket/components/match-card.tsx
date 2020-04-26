import React from 'react';

import styled from 'styled-components';

const Card = styled.div`
	background: lightblue;
	border: 1px black solid;
	width: 200px;
	height: 50px;
	margin: 20px 0;
`;

interface MatchProps {
	match: string;
}

const MatchCard: React.FC<MatchProps> = ({ match }) => {
	function lmaoxd(): string {
		if (match != null) {
			return '1';
		} else {
			return '0';
		}
	}

	const menDino = { opacity: lmaoxd() };

	return <Card style={menDino}>{match}</Card>;
};

export default MatchCard;
