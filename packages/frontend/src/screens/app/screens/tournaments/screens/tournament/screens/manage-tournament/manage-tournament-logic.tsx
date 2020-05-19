import React from 'react';

import { gql, useMutation } from '@apollo/client';

import ManageTournamentView, { ManageTournamentTournament } from './manage-tournament-view';

const START_TOURNAMENT_MUTATION = gql`
	mutation StartTournamentMutation($id: ID!) {
		startTournament(id: $id) {
			tournament {
				id
				started
			}
		}
	}
`;

interface Props {
	tournament: ManageTournamentTournament;
}

const ManageTournamentLogic: React.FC<Props> = ({ tournament }) => {
	const [startTournament] = useMutation(START_TOURNAMENT_MUTATION);

	const handleTournamentStart = () => {
		startTournament({
			variables: { id: tournament.id },
		});
	};

	return (
		<ManageTournamentView tournament={tournament} handleTournamentStart={handleTournamentStart} />
	);
};

export default ManageTournamentLogic;
