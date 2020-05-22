import React from 'react';

import { PageHeader, Tabs } from 'antd';
import { useHistory, useParams } from 'react-router-dom';

import { useAuth } from '../../../../contexts/auth-context';

import BracketScreen from './screens/bracket';
import JoinTournamentScreen from './screens/join-tournament';
import ManageTournamentScreen from './screens/manage-tournament';
import OverviewScreen from './screens/overview';
import RegisteredTeamsScreen from './screens/registered-teams';

interface Props {
	tournament: {
		id: string;
		name: string;
		maxTeams: number;
		registeredTeamCount: number;
		started: boolean;
		owner: {
			id: string;
		};
	};
}

const TournamentView: React.FC<Props> = ({ tournament }) => {
	const { tabId } = useParams();
	const { user } = useAuth();
	const history = useHistory();

	let joinTabTitle = 'Join';
	let joinTabEnabled = true;
	if (tournament.started) {
		joinTabTitle += ' (started)';
		joinTabEnabled = false;
	} else if (tournament.registeredTeamCount >= tournament.maxTeams) {
		joinTabTitle += ' (full)';
		joinTabEnabled = false;
	}

	const callback = (tabId: string) => {
		history.push(`/tournaments/${tournament.id}/${tabId}`);
	};

	return (
		<React.Fragment>
			<PageHeader title={<h1 style={{ color: 'hotpink' }}>{tournament.name}</h1>} />
			<Tabs defaultActiveKey={tabId} onChange={callback} animated={false}>
				<Tabs.TabPane tab="Overview" key="overview">
					<OverviewScreen tournamentId={tournament.id} />
				</Tabs.TabPane>
				<Tabs.TabPane tab={joinTabTitle} disabled={!joinTabEnabled} key="join">
					<JoinTournamentScreen tournamentId={tournament.id} />
				</Tabs.TabPane>
				<Tabs.TabPane tab="Bracket" disabled={!tournament.started} key="bracket">
					<BracketScreen tournamentId={tournament.id} />
				</Tabs.TabPane>
				<Tabs.TabPane tab="Teams" key="teams">
					<RegisteredTeamsScreen tournamentId={tournament.id} />
				</Tabs.TabPane>
				{user && tournament.owner.id === user.id && (
					<Tabs.TabPane tab="Manage" key="manage">
						<ManageTournamentScreen tournamentId={tournament.id} />
					</Tabs.TabPane>
				)}
			</Tabs>
		</React.Fragment>
	);
};

export default TournamentView;
