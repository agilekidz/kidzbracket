import React from 'react';

import styled from 'styled-components';

import Column from './components/bo-x-column';

const Wrapper = styled.div`
	background: lightgray;
	width: 1200px;
`;
// Need to implement this later so we scroll the whole bracket and not just a column
//const BracketScroller =

const BracketView = () => {
	const round1 = { matches: [1] };
	const round2 = { matches: [2, 3] };
	const round3 = { matches: [4, 5, 6, 7] };

	return (
		<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
			<Wrapper style={{ display: 'flex' }}>
				<Column props={round3}></Column>
				<Column props={round2}></Column>
				<Column props={round1}></Column>
			</Wrapper>
		</div>
	);
};

export default BracketView;
