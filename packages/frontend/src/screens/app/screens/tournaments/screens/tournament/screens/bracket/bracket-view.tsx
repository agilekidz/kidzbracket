import React from 'react';

import styled from 'styled-components';

import Bracket from './components/bracket';
import { BracketMatch } from './components/bracket/bracket-view';

const Wrapper = styled.div`
	background: lightgray;
	width: 1200px;
`;

interface Props {
	match: BracketMatch;
	level: number;
}

const BracketView: React.FC<Props> = ({ match, level }) => {
	return (
		<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
			<Wrapper style={{ display: 'flex' }}>
				<Bracket match={match} level={level} />
			</Wrapper>
		</div>
	);
};

export default BracketView;
