import React from 'react';

import { Card, List } from 'antd';

interface Props {
	teams: {
		id: string;
		name: string;
	}[];
}

const RegisteredTeamsView: React.FC<Props> = ({ teams }) => {
	return (
		<Card>
			<List dataSource={teams} renderItem={team => <List.Item>{team.name}</List.Item>} />
		</Card>
	);
};

export default RegisteredTeamsView;
