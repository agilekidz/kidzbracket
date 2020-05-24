import React, { useState } from 'react';

import { useMutation } from '@apollo/react-hooks';
import { message } from 'antd';
import gql from 'graphql-tag';
import { useHistory } from 'react-router-dom';

import {
	CreateTournamentMutation,
	CreateTournamentMutationVariables,
} from './__generated__/CreateTournamentMutation';
import { CreateTournamentQuery } from './__generated__/CreateTournamentQuery';
import TournamentView from './create-tournament-view';

const TOURNAMENTS_QUERY = gql`
	query CreateTournamentQuery {
		tournaments {
			id
		}
	}
`;

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
	>(CREATE_TOURNAMENT_MUTATION, {
		onCompleted() {
			message.success('Successfully created tournament');
		},
		onError() {
			message.error('Could not create tournament');
		},
		update(cache, { data }) {
			if (data) {
				const tournamentData = cache.readQuery<CreateTournamentQuery>({ query: TOURNAMENTS_QUERY });
				if (tournamentData) {
					if (
						!tournamentData.tournaments.find(
							tournament => tournament.id === data.createTournament.tournament.id,
						)
					) {
						cache.writeQuery<CreateTournamentQuery>({
							query: TOURNAMENTS_QUERY,
							data: {
								tournaments: [...tournamentData.tournaments, data.createTournament.tournament],
							},
						});
					}
				}
			}
		},
	});
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

	const handleSubmit = () => {
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
		}).then(({ data }) => {
			history.replace(`/tournaments/${data?.createTournament.tournament.id}`);
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
