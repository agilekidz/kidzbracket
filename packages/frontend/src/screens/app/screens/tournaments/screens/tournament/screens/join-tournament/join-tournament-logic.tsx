import React, { useState } from 'react';

import { useMutation } from '@apollo/react-hooks';
import { message } from 'antd';
import gql from 'graphql-tag';
import { useHistory } from 'react-router-dom';

import {
	RegisterTeamMutation,
	RegisterTeamMutationVariables,
} from './__generated__/RegisterTeamMutation';
import { RegisterTeamQuery, RegisterTeamQueryVariables } from './__generated__/RegisterTeamQuery';
import JoinTournamentView from './join-tournament-view';

const TOURNAMENT_TEAMS_QUERY = gql`
	query RegisterTeamQuery($tournamentId: ID!) {
		tournament(id: $tournamentId) {
			id
			teams {
				id
			}
		}
	}
`;

const REGISTER_TEAM_MUTATION = gql`
	mutation RegisterTeamMutation($input: RegisterTeamInput!) {
		registerTeam(input: $input) {
			team {
				id
				name
				players {
					id
					name
				}
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
	const [playerIds, setPlayerIds] = useState<(string | null)[]>(
		Array.from({ length: tournament.playersPerTeam }, () => null),
	);
	const [registerTeam] = useMutation<RegisterTeamMutation, RegisterTeamMutationVariables>(
		REGISTER_TEAM_MUTATION,
		{
			onCompleted(data) {
				message.success('Successfully registered team ' + data.registerTeam.team.name);
			},
			onError() {
				message.error('Could not register team');
			},
			update(cache, { data }) {
				if (data) {
					const tournamentData = cache.readQuery<RegisterTeamQuery, RegisterTeamQueryVariables>({
						query: TOURNAMENT_TEAMS_QUERY,
						variables: {
							tournamentId: tournament.id,
						},
					});
					if (tournamentData) {
						if (
							!tournamentData.tournament.teams.find(team => team.id === data.registerTeam.team.id)
						) {
							cache.writeQuery<RegisterTeamQuery, RegisterTeamQueryVariables>({
								query: TOURNAMENT_TEAMS_QUERY,
								data: {
									tournament: {
										...tournamentData.tournament,
										teams: [...tournamentData.tournament.teams, data.registerTeam.team],
									},
								},
							});
						}
					}
				}
			},
		},
	);
	const history = useHistory();

	const handleTeamNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setTeamName(event.target.value);
	};

	const handleSelectPlayer = (index: number, newPlayerId: string) => {
		setPlayerIds(playerIds =>
			playerIds.map((playerId, i) => {
				if (i === index) {
					return newPlayerId;
				}

				return playerId;
			}),
		);
	};

	const handleSubmit = () => {
		const nonNullPlayerIds = playerIds.filter(playerId => playerId !== null) as string[];
		if (nonNullPlayerIds.length === playerIds.length) {
			registerTeam({
				variables: {
					input: {
						name: teamName,
						players: nonNullPlayerIds,
						tournamentId: tournament.id,
					},
				},
			}).then(() => {
				history.replace(`/tournaments/${tournament.id}`);
			});
		}
	};

	return (
		<JoinTournamentView
			teamName={teamName}
			players={playerIds}
			handleTeamNameChange={handleTeamNameChange}
			handleSelectPlayer={handleSelectPlayer}
			handleSubmit={handleSubmit}
			users={users.filter(user => !playerIds.find(playerId => playerId === user.id))}
		/>
	);
};

export default JoinTournamentLogic;
