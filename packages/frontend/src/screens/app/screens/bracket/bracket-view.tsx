import React from 'react';

import styled from 'styled-components';

import RBox from './components/recurse-box';

const Wrapper = styled.div`
	background: lightgray;
	width: 1200px;
`;
// Need to implement this later so we scroll the whole bracket and not just a column
//const BracketScroller =

interface Team {
	id: string;
	name: string;
}

interface BracketMatch {
	id: string;
	firstParent?: BracketMatch;
	secondParent?: BracketMatch;
	firstTeam?: Team;
	secondTeam?: Team;
	firstTeamScore?: number;
	secondTeamScore?: number;
	winner?: Team;
}

interface Props {
	match: BracketMatch;
}

const BracketView: React.FC<Props> = ({ match }) => {
	return (
		<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
			<Wrapper style={{ display: 'flex' }}>
				<RBox match={match}></RBox>
			</Wrapper>
		</div>
	);
};

export default BracketView;

/*const second = {
		id: '2',
		firstParent: undefined,
		secondParent: undefined,
		firstTeam: { id: '3', name: 'third' },
		secondTeam: { id: '4', name: 'forth' },
		firstTeamScore: 2,
		secondTeamScore: 3,
		winner: { id: '3', name: 'third' },
	};

	const third = {
		id: '4',
		firstParent: undefined,
		secondParent: undefined,
		firstTeam: { id: '5', name: 'fifth' },
		secondTeam: { id: '6', name: 'sixth' },
		firstTeamScore: 2,
		secondTeamScore: 3,
		winner: { id: '5', name: 'fifth' },
	};

	
	const start = {
		id: '1',
		firstParent: second,
		secondParent: third,
		firstTeam: { id: '1', name: 'first' },
		secondTeam: { id: '2', name: 'second' },
		firstTeamScore: 2,
		secondTeamScore: 3,
		winner: { id: '1', name: 'first' },
	};*/
