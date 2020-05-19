import React from 'react';

import {
	ChildWrapper,
	ContentCardWrapper,
	ContentWrapper,
	HalfVerticalConnectorEmpty,
	HalfVerticalConnectorFilled,
	HalfVerticalConnectorWrapper,
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
	level: number;
}

const InternalBracket: React.FC<InternalBracketProps> = ({ match, first = false, level }) => {
	const hasBothParents = match.firstParent && match.secondParent;
	const hasFirstParent = match.firstParent;
	const hasSecondParent = match.secondParent;
	const hasAnyParent = hasFirstParent || hasSecondParent;

	return (
		<Wrapper>
			<ChildWrapper>
				{match.firstParent && <InternalBracket match={match.firstParent} level={level - 1} />}
				{!match.firstParent && level === 0 && (
					<ContentWrapper>
						<ContentCardWrapper>
							<MatchCard match={match} invisible />
						</ContentCardWrapper>
					</ContentWrapper>
				)}
				{match.secondParent && <InternalBracket match={match.secondParent} level={level - 1} />}
				{!match.secondParent && level === 0 && (
					<ContentWrapper>
						<ContentCardWrapper>
							<MatchCard match={match} invisible />
						</ContentCardWrapper>
					</ContentWrapper>
				)}
			</ChildWrapper>
			<ContentWrapper>
				{hasBothParents && <VerticalConnector />}
				{!hasBothParents && hasAnyParent && (
					<HalfVerticalConnectorWrapper>
						<HalfVerticalConnectorFilled />
						<HalfVerticalConnectorEmpty />
					</HalfVerticalConnectorWrapper>
				)}
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
	level: number;
}

const BracketView: React.FC<Props> = ({ match, level }) => {
	return <InternalBracket match={match} level={level} first />;
};

export default BracketView;
