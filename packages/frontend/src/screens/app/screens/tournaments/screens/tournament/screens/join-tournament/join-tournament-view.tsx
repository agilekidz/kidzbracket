import React from 'react';

import { Card, Form, Input } from 'antd';

import PlayerBox from './components/player-box';

interface User {
	id: string;
	name: string;
}

interface Props {
	teamName: string;
	playerNames: string[];
	users: User[];
	handleTeamNameChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
	handlePlayerNameChange: (id: number, event: React.ChangeEvent<HTMLInputElement>) => void;
	handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

const JoinTournamentView: React.FC<Props> = ({
	teamName,
	playerNames,
	handleTeamNameChange,
	handlePlayerNameChange,
	// handleSubmit,
	users,
}) => {
	const handleSubmit = () => {};
	return (
		<Card title="Join tournament" style={{ width: '400px', margin: '0 auto' }}>
			<Form name="join-tournament" onFinish={handleSubmit} size="large" layout="vertical">
				<Form.Item
					label="Team name"
					name="team-name"
					rules={[{ required: true, message: 'Please input the name of your team!' }]}
				>
					<Input value={name} onChange={handleTeamNameChange} placeholder="Name" />
				</Form.Item>
				{playerNames.map((playerName, index) => (
					<div key={index}>
						<label htmlFor="alias">Player {index + 1} name</label>
						<PlayerBox users={users} />
					</div>
				))}
				<input type="submit" value="Join" />
			</Form>
		</Card>
	);
};

export default JoinTournamentView;
