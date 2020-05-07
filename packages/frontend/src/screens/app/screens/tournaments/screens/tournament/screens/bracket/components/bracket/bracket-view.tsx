import React from 'react';

import {
	ChildWrapper,
	ContentCardWrapper,
	ContentWrapper,
	HorizontalConnector,
	VerticalConnector,
	Wrapper,
} from './bracket-styles';
import MatchCard from './match-card';

interface Team {
	id: string;
	name: string;
}

export interface BracketMatch {
	id: string;
	firstParent?: BracketMatch;
	secondParent?: BracketMatch;
	firstTeam?: Team;
	secondTeam?: Team;
	firstTeamScore?: number;
	secondTeamScore?: number;
	winner?: Team;
}

interface InternalBracketProps {
	match: BracketMatch;
	first?: boolean;
}

const InternalBracket: React.FC<InternalBracketProps> = ({ match, first = false }) => {
	const hasBothParents = match.firstParent && match.secondParent;
	const hasFirstParent = match.firstParent;
	const hasSecondParent = match.secondParent;
	const hasAnyParent = hasFirstParent || hasSecondParent;

	return (
		<Wrapper>
			<ChildWrapper>
				{match.firstParent && <InternalBracket match={match.firstParent} />}
				{match.secondParent && <InternalBracket match={match.secondParent} />}
			</ChildWrapper>
			<ContentWrapper>
				{hasBothParents && <VerticalConnector />}
				{hasAnyParent && <HorizontalConnector />}
				<ContentCardWrapper>
					<MatchCard match={match} />
				</ContentCardWrapper>
				{!first && <HorizontalConnector />}
			</ContentWrapper>
		</Wrapper>
	);
};

interface Props {
	match: BracketMatch;
}

const BracketView: React.FC<Props> = ({ match }) => {
	return <InternalBracket match={match} first />;
};

export default BracketView;
