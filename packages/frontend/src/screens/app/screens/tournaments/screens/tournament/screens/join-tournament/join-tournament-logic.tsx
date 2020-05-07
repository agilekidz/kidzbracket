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

interface Props {
	tournamentId: string;
}

const JoinTournamentLogic: React.FC<Props> = ({ tournamentId }) => {
	const [teamName, setTeamName] = useState('');
	const [playerNames, setPlayerNames] = useState(Array.from({ length: 5 }, () => ''));
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
					tournamentId,
				},
			},
		}).then(() => {
			history.replace(`/tournaments/${tournamentId}`);
		});
	};

	return (
		<JoinTournamentView
			teamName={teamName}
			playerNames={playerNames}
			handleTeamNameChange={handleTeamNameChange}
			handlePlayerNameChange={handlePlayerNameChange}
			handleSubmit={handleSubmit}
		/>
	);
};

export default JoinTournamentLogic;