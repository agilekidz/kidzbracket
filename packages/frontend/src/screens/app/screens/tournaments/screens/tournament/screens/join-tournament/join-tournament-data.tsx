import React from 'react';

import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import { useAuth } from '../../../../../../contexts/auth-context';
import { Spinner } from '../../../../../../shared/components/spinner';

import {
	JoinTournamentQuery,
	JoinTournamentQueryVariables,
} from './__generated__/JoinTournamentQuery';
import JoinTournamentLogic from './join-tournament-logic';

const JOIN_TOURNAMENT_QUERY = gql`
	query JoinTournamentQuery($tournamentId: ID!) {
		tournament(id: $tournamentId) {
			id
			playersPerTeam
			teams {
				id
				players {
					id
				}
			}
		}
		users {
			id
			name
		}
	}
`;

interface Props {
	tournamentId: string;
}

const JoinTournamentData: React.FC<Props> = ({ tournamentId }) => {
	const { loading, error, data } = useQuery<JoinTournamentQuery, JoinTournamentQueryVariables>(
		JOIN_TOURNAMENT_QUERY,
		{
			variables: {
				tournamentId,
			},
		},
	);
	const { user } = useAuth();

	if (loading) {
		return <Spinner />;
	}

	if (error || !user) {
		return <div>error</div>;
	}

	if (data) {
		const filteredUsers = data.users.filter(user => {
			for (const team of data.tournament.teams) {
				if (team.players.find(player => player.id === user.id)) {
					return false;
				}
			}

			return true;
		});
		return <JoinTournamentLogic tournament={data.tournament} users={filteredUsers} user={user} />;
	}

	return null;
};

export default JoinTournamentData;
