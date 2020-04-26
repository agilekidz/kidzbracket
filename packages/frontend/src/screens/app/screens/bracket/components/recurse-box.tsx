import React from 'react';

import styled from 'styled-components';

import MatchCard from './match-card';

//import MatchCard from './match-card';

const Column = styled.div`
	border: 1px solid black;
	background: darkgray;
	display: flex;
	justify-content: center;
	flex-direction: column;
`;

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

interface MatchesProps {
	match: BracketMatch;
	first?: boolean;
}

const RBox: React.FC<MatchesProps> = ({ match, first = false }) => {
	console.log(match.id);

	const hasBothParents = match.firstParent && match.secondParent;
	const hasFirstParent = match.firstParent;
	const hasSecondParent = match.secondParent;
	const hasAnyParent = hasFirstParent || hasSecondParent;

	/*const condMargin = () => {
		if (hasBothParents) {
			return '0%';
		}else if(hasFirstParent)
	};*/

	return (
		<div style={{ display: 'flex' }}>
			<div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
				{match.firstParent && <RBox match={match.firstParent}> </RBox>}
				{match.secondParent && <RBox match={match.secondParent}></RBox>}
			</div>
			<div
				style={{
					flexShrink: 0,
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
				}}
			>
				{hasBothParents && (
					<div style={{ width: '2px', height: 'calc(50% + 2px)', background: 'black' }}></div>
				)}
				{hasAnyParent && <div style={{ width: '20px', height: '2px', background: 'black' }}></div>}
				<MatchCard match={match.id}></MatchCard>
				{!first && <div style={{ width: '20px', height: '2px', background: 'black' }}></div>}
			</div>
		</div>
	);
};

const RBoxWrapper: React.FC<MatchesProps> = ({ match }) => {
	return (
		<Column>
			<RBox match={match} first />
		</Column>
	);
};

export default RBoxWrapper;
