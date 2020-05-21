import React from 'react';

interface Props {
	currentlyRegisteredTeamCount: number;
	maxTeamsCount: number;
	winner: {
		name: string;
	} | null;
	started: boolean;
}
const OverviewView: React.FC<Props> = ({
	currentlyRegisteredTeamCount,
	maxTeamsCount,
	winner,
	started,
}) => {
	return (
		<div>
			{started && <h1 style={{ padding: '5px 10px' }}>Tournament started</h1>}
			<div style={{ padding: '5px 10px' }}>
				Teams registered : {currentlyRegisteredTeamCount}/{maxTeamsCount}
			</div>
			{winner && <h1 style={{ padding: '5px 10px' }}>Winner: {winner.name} </h1>}
		</div>
	);
};

export default OverviewView;
