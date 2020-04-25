import React from 'react';

import styled from 'styled-components';

const Card = styled.div`
	background: lightblue;
	border: 1px black solid;
	width: 120px;
	height: 50px;
	margin: auto;
`;

interface MatchProps {
	match: number;
}

const MatchCard: React.FC<MatchProps> = ({ match }) => {
	return <Card className={match}>{match}</Card>;
};

export default MatchCard;
