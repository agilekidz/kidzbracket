import React, { useState } from 'react';

import { Button, PageHeader, Tabs } from 'antd';
import { Route, Switch, useHistory, useParams } from 'react-router-dom';

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
	const [activeTab, setActiveTab] = useState(tabId);

	return (
		<React.Fragment>
			<PageHeader title={<h1 style={{ color: 'hotpink' }}>{tournament.name}</h1>} />
			<Tabs
				defaultActiveKey={tabId}
				activeKey={activeTab}
				onChange={newTab => {
					setActiveTab(newTab);
					history.push(`/tournaments/${tournament.id}/${newTab}`);
				}}
				animated={false}
				tabBarExtraContent={
					<Button
						type="primary"
						size="large"
						disabled={tournament.started || tournament.registeredTeamCount >= tournament.maxTeams}
						onClick={() => {
							history.push(`/tournaments/${tournament.id}/join`);
							setActiveTab('join');
						}}
					>
						Join
					</Button>
				}
			>
				<Tabs.TabPane tab="Overview" key="overview">
					<OverviewScreen tournamentId={tournament.id} />
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
			<Switch>
				<Route
					path={`/tournaments/${tournament.id}/join`}
					render={() => <JoinTournamentScreen tournamentId={tournament.id} />}
				/>
			</Switch>
		</React.Fragment>
	);
};

export default TournamentView;
