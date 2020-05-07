import React from 'react';

interface Props {
	teams: {
		id: string;
		name: string;
	}[];
}

const RegisteredTeamsView: React.FC<Props> = ({ teams }) => {
	return (
		<div>
			<ul>
				{teams.map(team => (
					<li key={team.id}>{team.name}</li>
				))}
			</ul>
		</div>
	);
};

export default RegisteredTeamsView;
