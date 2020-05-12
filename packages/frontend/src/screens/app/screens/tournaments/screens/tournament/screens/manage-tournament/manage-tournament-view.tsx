import React from 'react';

interface Props {
	tournamentId: string;
}

const ManageTournamentView: React.FC<Props> = ({ tournamentId }) => {
	return <div>Bitch {tournamentId}</div>;
};

export default ManageTournamentView;
