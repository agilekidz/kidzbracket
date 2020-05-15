import React from 'react';

interface Props {
	currentlyRegisteredTeamCount: number;
	maxTeamsCount: number;
}
const OverviewView: React.FC<Props> = ({ currentlyRegisteredTeamCount, maxTeamsCount }) => {
	return (
		<div>
			<div>Overview screen</div>
			<div>
				Teams registered : {currentlyRegisteredTeamCount}/{maxTeamsCount}
			</div>
		</div>
	);
};

export default OverviewView;
