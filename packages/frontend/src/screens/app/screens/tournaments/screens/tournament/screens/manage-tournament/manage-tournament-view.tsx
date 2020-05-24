import React from 'react';

import { Button, Card, List, Row } from 'antd';
import { useHistory } from 'react-router-dom';

interface Team {
	id: string;
	name: string;
}

interface Match {
	id: string;
	firstTeam: Team | null;
	secondTeam: Team | null;
}

export interface ManageTournamentTournament {
	id: string;
	started: boolean;
	contestedMatches: Match[];
}

interface Props {
	tournament: ManageTournamentTournament;
	handleTournamentStart: () => void;
}

const ManageTournamentView: React.FC<Props> = ({ tournament, handleTournamentStart }) => {
	const adresBase = '/matches/';
	const history = useHistory();

	return (
		<>
			{!tournament.started && (
				<Row justify="center">
					<Button type="primary" onClick={handleTournamentStart}>
						Start tournament
					</Button>
				</Row>
			)}
			{tournament.started && (
				<>
					<Row justify="center">
						<h2>Contested matches</h2>
					</Row>
					<List
						itemLayout="vertical"
						size="large"
						dataSource={tournament.contestedMatches}
						renderItem={match => {
							return (
								<List.Item>
									<Card
										title={match.firstTeam?.name + ' vs ' + match.secondTeam?.name}
										onClick={() => history.push(adresBase + match.id)}
									>
										<p>Match has been contested</p>
										<Button type="primary">Resolve</Button>
									</Card>
								</List.Item>
							);
						}}
					/>
				</>
			)}
			,
		</>
	);
};

export default ManageTournamentView;
