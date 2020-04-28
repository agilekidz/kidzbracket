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
}

const BracketView: React.FC<Props> = ({ match }) => {
	return (
		<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
			<Wrapper style={{ display: 'flex' }}>
				<Bracket match={match} />
			</Wrapper>
		</div>
	);
};

export default BracketView;
