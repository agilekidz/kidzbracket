import React, { useState } from 'react';

import { gql, useMutation } from '@apollo/client';
import { useHistory } from 'react-router-dom';

import {
	RegisterTeamMutation,
	RegisterTeamMutationVariables,
} from './__generated__/RegisterTeamMutation';
import JoinTournamentView from './join-tournament-view';

const REGISTER_TEAM_MUTATION = gql`
	mutation RegisterTeamMutation($input: RegisterTeamInput!) {
		registerTeam(input: $input) {
			team {
				id
				name
				players
			}
		}
	}
`;

interface User {
	id: string;
	name: string;
}

interface Props {
	tournament: {
		id: string;
		playersPerTeam: number;
	};
	users: User[];
}

const JoinTournamentLogic: React.FC<Props> = ({ tournament, users }) => {
	const [teamName, setTeamName] = useState('');
	const [playerNames, setPlayerNames] = useState(
		Array.from({ length: tournament.playersPerTeam }, () => ''),
	);
	const [registerTeam] = useMutation<RegisterTeamMutation, RegisterTeamMutationVariables>(
		REGISTER_TEAM_MUTATION,
	);
	const history = useHistory();

	const handleTeamNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setTeamName(event.target.value);
	};

	const handlePlayerNameChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
		setPlayerNames(
			playerNames.map((playerName, i) => {
				if (i === index) {
					return event.target.value;
				}

				return playerName;
			}),
		);
	};

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		registerTeam({
			variables: {
				input: {
					name: teamName,
					players: playerNames,
					tournamentId: tournament.id,
				},
			},
		}).then(() => {
			history.replace(`/tournaments/${tournament.id}`);
		});
	};

	return (
		<JoinTournamentView
			teamName={teamName}
			playerNames={playerNames}
			handleTeamNameChange={handleTeamNameChange}
			handlePlayerNameChange={handlePlayerNameChange}
			handleSubmit={handleSubmit}
			users={users}
		/>
	);
};

export default JoinTournamentLogic;
