import React from 'react';

import {
	Form,
	FormWrapper,
	Input,
	InputWrapper,
	Label,
	SubmitButtonWrapper,
} from './create-tournament-styles';

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
	return (
		<FormWrapper>
			<h2>Create tournament</h2>
			<Form onSubmit={handleSubmit}>
				<InputWrapper>
					<Label htmlFor="name">Name</Label>
					<Input id="name" type="text" value={name} onChange={handleNameChange} />
				</InputWrapper>
				<InputWrapper>
					<Label htmlFor="description">Description</Label>
					<Input
						id="description"
						type="text"
						value={description}
						onChange={handleDescriptionChange}
					/>
				</InputWrapper>
				<InputWrapper>
					<Label htmlFor="game">Game</Label>
					<Input id="game" type="text" value={game} onChange={handleGameChange} />
				</InputWrapper>
				<InputWrapper>
					<Label htmlFor="maxTeams">Max number of teams</Label>
					<Input
						id="maxTeams"
						type="number"
						min="2"
						max="128"
						value={maxTeams}
						onChange={handleMaxTeamsChange}
					/>
				</InputWrapper>
				<InputWrapper>
					<Label htmlFor="playersPerTeam">Players per team</Label>
					<Input
						id="playersPerTeam"
						type="number"
						min="1"
						value={playersPerTeam}
						onChange={handlePlayersPerTeamChange}
					/>
				</InputWrapper>
				<SubmitButtonWrapper>
					<Input type="submit" value="Submit" />
				</SubmitButtonWrapper>
			</Form>
		</FormWrapper>
	);
};

export default CreateTournamentView;
