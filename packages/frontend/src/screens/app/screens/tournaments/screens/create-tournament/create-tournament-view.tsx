import React from 'react';

import { Button, Card, Form, Input, Row } from 'antd';

interface Props {
	name: string;
	description: string;
	game: string;
	maxTeams: number;
	playersPerTeam: number;
	handleNameChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
	handleDescriptionChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
	handleGameChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
	handleMaxTeamsChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
	handlePlayersPerTeamChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
	handleSubmit: () => void;
}

const CreateTournamentView: React.FC<Props> = ({
	name,
	description,
	game,
	maxTeams,
	playersPerTeam,
	handleNameChange,
	handleDescriptionChange,
	handleGameChange,
	handleMaxTeamsChange,
	handlePlayersPerTeamChange,
	handleSubmit,
}) => {
	return (
		<Card title="Create tournament" style={{ width: '400px', margin: '16px auto 0 auto' }}>
			<Form
				name="create-tournament"
				initialValues={{ remember: true }}
				onFinish={handleSubmit}
				size="large"
				layout="vertical"
			>
				<Form.Item
					label="Name"
					name="name"
					rules={[{ required: true, message: 'Please input the name of the tournament!' }]}
				>
					<Input value={name} onChange={handleNameChange} placeholder="Name" />
				</Form.Item>
				<Form.Item
					label="Description"
					name="description"
					rules={[{ required: true, message: 'Enter a short description' }]}
				>
					<Input value={description} onChange={handleDescriptionChange} placeholder="Description" />
				</Form.Item>
				<Form.Item label="Game" name="game" rules={[{ required: true, message: 'Enter the game' }]}>
					<Input
						id="game"
						type="text"
						value={game}
						onChange={handleGameChange}
						placeholder="Game"
					/>
				</Form.Item>
				<Form.Item
					label="Max number of teams"
					name="max-no-teams"
					rules={[
						{
							required: true,
							message: 'Please input the maximum number of teams in the tournament!',
						},
					]}
				>
					<Input
						type="number"
						max="128"
						min="2"
						value={maxTeams}
						onChange={handleMaxTeamsChange}
						placeholder="Max number of teams"
					/>
				</Form.Item>
				<Form.Item
					label="Players per team"
					name="no-players-in-team"
					rules={[
						{
							required: true,
							message: 'Please input the number of players in teams!',
						},
					]}
				>
					<Input
						id="playersPerTeam"
						type="number"
						min="1"
						value={playersPerTeam}
						onChange={handlePlayersPerTeamChange}
						placeholder="Players per team"
					/>
				</Form.Item>
				<Row justify="center">
					<Form.Item>
						<Button type="primary" htmlType="submit">
							Create
						</Button>
					</Form.Item>
				</Row>
			</Form>
		</Card>
	);
};

export default CreateTournamentView;
