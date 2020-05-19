import React from 'react';

interface Props {
	currentlyRegisteredTeamCount: number;
	maxTeamsCount: number;
	winner: {
		name: string;
	} | null;
}
const OverviewView: React.FC<Props> = ({ currentlyRegisteredTeamCount, maxTeamsCount, winner }) => {
	return (
		<div>
			<div>
				Teams registered : {currentlyRegisteredTeamCount}/{maxTeamsCount}
			</div>
			{winner && <h1 style={{ padding: '5px 10px' }}>Winner: {winner.name} </h1>}
		</div>
	);
};

export default OverviewView;
