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
			}
		}
	}
`;

const CreateTournamentLogic = () => {
	const [name, setName] = useState('');
	const [description, setDescription] = useState('');
	const [game, setGame] = useState('');
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

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		createTournament({ variables: { data: { name, description, game } } }).then(() => {
			history.replace('/');
		});
	};

	return (
		<TournamentView
			name={name}
			description={description}
			game={game}
			handleNameChange={handleNameChange}
			handleDescriptionChange={handleDescriptionChange}
			handleGameChange={handleGameChange}
			handleSubmit={handleSubmit}
		/>
	);
};

export default CreateTournamentLogic;
