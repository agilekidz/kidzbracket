import React from 'react';

interface Props {
	users: {
		id: string;
		name: string;
	}[];
}

const UsersView: React.FC<Props> = ({ users }) => {
	return (
		<ul>
			{users.map(({ id, name }) => (
				<li key={id}>{name}</li>
			))}
		</ul>
	);
};

export default UsersView;
