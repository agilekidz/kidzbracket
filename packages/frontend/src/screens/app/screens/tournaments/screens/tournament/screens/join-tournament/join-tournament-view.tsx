import React from 'react';

import { Button, Card, Form, Input, Row, Select } from 'antd';

interface User {
	id: string;
	name: string;
}

interface Props {
	teamName: string;
	players: any[];
	users: User[];
	user: User;
	handleTeamNameChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
	handleSelectPlayer: (index: number, playerId: string) => void;
	handleSubmit: () => void;
}

const JoinTournamentView: React.FC<Props> = ({
	teamName,
	players,
	handleTeamNameChange,
	handleSelectPlayer,
	handleSubmit,
	users,
	user,
}) => {
	return (
		<Card title="Join tournament" style={{ width: '400px', margin: '0 auto' }}>
			<Form name="join-tournament" onFinish={handleSubmit} size="large" layout="vertical">
				<Form.Item
					label="Team name"
					name="team-name"
					rules={[{ required: true, message: 'Please input the name of your team!' }]}
				>
					<Input value={teamName} onChange={handleTeamNameChange} placeholder="Name" />
				</Form.Item>

				{players.map((_player, index) => (
					<Form.Item key={index} label={`Player ${index + 1}`} name={`player-${index + 1}`}>
						<Select
							disabled={index === 0}
							defaultValue={index === 0 ? user.name : undefined}
							showSearch
							style={{ width: '100%' }}
							placeholder="Select a player"
							optionFilterProp="children"
							onChange={(_value, option) => {
								// TODO: come up with a better way of getting id
								// At the moment the `value` key of Select.Option has to be the name
								// Else the id is shown in the box when selecting a user
								handleSelectPlayer(index, (option as any).key);
							}}
							filterOption={(input, option) => {
								if (!option) {
									return false;
								}

								return option.children.toLowerCase().includes(input.toLowerCase());
							}}
						>
							{users.map(user => (
								<Select.Option key={user.id} value={user.name}>
									{user.name}
								</Select.Option>
							))}
						</Select>
					</Form.Item>
				))}
				<Row justify="center">
					<Form.Item>
						<Button type="primary" htmlType="submit">
							Join
						</Button>
					</Form.Item>
				</Row>
			</Form>
		</Card>
	);
};

export default JoinTournamentView;
