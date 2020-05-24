import React from 'react';

import { gql, useQuery } from '@apollo/client';

import {
	OverviewTournamentTeamInfo,
	OverviewTournamentTeamInfoVariables,
} from './__generated__/OverviewTournamentTeamInfo';
import OverviewView from './overview-view';

const OVERVIEW_TOURNAMENT_TEAM_INFO = gql`
	query OverviewTournamentTeamInfo($id: ID!) {
		tournament(id: $id) {
			id
			maxTeams
			winner {
				id
				name
			}
			teams {
				id
			}
			started
			game
			description
		}
	}
`;

interface Props {
	tournamentId: string;
}
const OverviewData: React.FC<Props> = ({ tournamentId }) => {
	const { loading, error, data } = useQuery<
		OverviewTournamentTeamInfo,
		OverviewTournamentTeamInfoVariables
	>(OVERVIEW_TOURNAMENT_TEAM_INFO, {
		variables: {
			id: tournamentId,
		},
	});

	if (loading) {
		return <div>loading...</div>;
	}

	if (error) {
		return <div>Error...</div>;
	}

	if (data) {
		return (
			<OverviewView
				tournament={{
					...data.tournament,
					currentlyRegisteredTeamCount: data.tournament.teams.length,
				}}
			/>
		);
	}

	return null;
};

export default OverviewData;
