import React from 'react';

import { Button, Form, Input } from 'antd';
import { Store } from 'antd/lib/form/interface';

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
	handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
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
	const layout = {
		labelCol: { span: 8 },
		wrapperCol: { span: 100 },
	};

	const tailLayout = {
		wrapperCol: { offset: 8, span: 16 },
	};

	return (
		<Form
			{...layout}
			name="create-tournament"
			initialValues={{ remember: true }}
			onFinish={(values: Store) => {
				handleSubmit(values.event);
			}}
		>
			<Form.Item
				name="name"
				rules={[{ required: true, message: 'Please input the name of the tournament!' }]}
			>
				<Input value={name} onChange={handleNameChange} placeholder="Name" />
			</Form.Item>
			<Form.Item
				name="description"
				rules={[{ required: true, message: 'Enter a short description' }]}
			>
				<Input value={description} onChange={handleDescriptionChange} placeholder="Description" />
			</Form.Item>
			<Form.Item name="game" rules={[{ required: true, message: 'Enter the game' }]}>
				<Input id="game" type="text" value={game} onChange={handleGameChange} placeholder="Game" />
			</Form.Item>
			<Form.Item
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
			<Form.Item {...tailLayout}>
				<Button type="primary" htmlType="submit">
					Submit
				</Button>
			</Form.Item>
		</Form>

		// <FormWrapper>
		// 	<h2>Create tournament</h2>
		// 	<Form onSubmit={handleSubmit}>
		// 		<InputWrapper>
		// 			<Label htmlFor="name">Name</Label>
		// 			<Input id="name" type="text" value={name} onChange={handleNameChange} />
		// 		</InputWrapper>
		// 		<InputWrapper>
		// 			<Label htmlFor="description">Description</Label>
		// 			<Input
		// 				id="description"
		// 				type="text"
		// 				value={description}
		// 				onChange={handleDescriptionChange}
		// 			/>
		// 		</InputWrapper>
		// 		<InputWrapper>
		// 			<Label htmlFor="game">Game</Label>
		// 			<Input id="game" type="text" value={game} onChange={handleGameChange} />
		// 		</InputWrapper>
		// 		<InputWrapper>
		// 			<Label htmlFor="maxTeams">Max number of teams</Label>
		// 			<Input
		// 				id="maxTeams"
		// 				type="number"
		// 				min="2"
		// 				max="128"
		// 				value={maxTeams}
		// 				onChange={handleMaxTeamsChange}
		// 			/>
		// 		</InputWrapper>
		// 		<InputWrapper>
		// 			<Label htmlFor="playersPerTeam">Players per team</Label>
		// 			<Input
		// 				id="playersPerTeam"
		// 				type="number"
		// 				min="1"
		// 				value={playersPerTeam}
		// 				onChange={handlePlayersPerTeamChange}
		// 			/>
		// 		</InputWrapper>
		// 		<SubmitButtonWrapper>
		// 			<Input type="submit" value="Submit" />
		// 		</SubmitButtonWrapper>
		// 	</Form>
		// </FormWrapper>
	);
};

export default CreateTournamentView;
