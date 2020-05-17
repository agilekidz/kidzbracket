import React, { useState } from 'react';

import { gql, useMutation } from '@apollo/client';
import { useHistory } from 'react-router-dom';

import {
	CreateTournamentMutation,
	CreateTournamentMutationVariables,
} from './__generated__/CreateTournamentMutation';
import TournamentView from './create-tournament-view';

const CREATE_TOURNAMENT_MUTATION = gql`
	mutation CreateTournamentMutation($data: CreateTournamentInput!) {
		createTournament(data: $data) {
			tournament {
				id
				name
				description
				game
				maxTeams
				playersPerTeam
			}
		}
	}
`;

const CreateTournamentLogic = () => {
	const [name, setName] = useState('');
	const [description, setDescription] = useState('');
	const [game, setGame] = useState('');
	const [maxTeams, setMaxTeams] = useState(2);
	const [playersPerTeam, setPlayersPerTeam] = useState(1);
	const [createTournament] = useMutation<
		CreateTournamentMutation,
		CreateTournamentMutationVariables
	>(CREATE_TOURNAMENT_MUTATION);
	const history = useHistory();

	const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setName(event.target.value);
	};

	const handleDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setDescription(event.target.value);
	};

	const handleGameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setGame(event.target.value);
	};

	const handleMaxTeamsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setMaxTeams(event.target.valueAsNumber);
	};

	const handlePlayersPerTeamChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setPlayersPerTeam(event.target.valueAsNumber);
	};

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		createTournament({
			variables: {
				data: {
					name,
					description,
					game,
					maxTeams,
					playersPerTeam,
				},
			},
		}).then(() => {
			history.replace('/');
		});
	};

	return (
		<TournamentView
			name={name}
			description={description}
			game={game}
			maxTeams={maxTeams}
			playersPerTeam={playersPerTeam}
			handleNameChange={handleNameChange}
			handleDescriptionChange={handleDescriptionChange}
			handleGameChange={handleGameChange}
			handleMaxTeamsChange={handleMaxTeamsChange}
			handlePlayersPerTeamChange={handlePlayersPerTeamChange}
			handleSubmit={handleSubmit}
		/>
	);
};

export default CreateTournamentLogic;
