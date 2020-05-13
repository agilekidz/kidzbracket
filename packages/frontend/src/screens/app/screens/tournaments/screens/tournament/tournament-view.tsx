import React from 'react';

import { Link, Route, Switch, useRouteMatch } from 'react-router-dom';

import BracketScreen from './screens/bracket';
import JoinTournamentScreen from './screens/join-tournament';
import ManageTournamentScreen from './screens/manage-tournament';
import MatchScreen from './screens/match';
import OverviewScreen from './screens/overview';
import RegisteredTeamsScreen from './screens/registered-teams';

interface Props {
	tournament: {
		id: string;
		name: string;
	};
}

const TournamentView: React.FC<Props> = ({ tournament }) => {
	const { url } = useRouteMatch();
	return (
		<div>
			<h1>Name: {tournament.name}</h1>
			<ul style={{ display: 'flex', listStyle: 'none' }}>
				<li style={{ padding: '5px 10px' }}>
					<Link to={`${url}`}>overview</Link>
				</li>
				<li style={{ padding: '5px 10px' }}>
					<Link to={`${url}/join`}>Join</Link>
				</li>
				<li style={{ padding: '5px 10px' }}>
					<Link to={`${url}/bracket`}>Bracket</Link>
				</li>
				<li style={{ padding: '5px 10px' }}>
					<Link to={`${url}/teams`}>Teams</Link>
				</li>
				<li style={{ padding: '5px 10px' }}>
					<Link to={`${url}/manage`}>Manage</Link>
				</li>
			</ul>
			<Switch>
				<Route exact path={`${url}/`} component={OverviewScreen} />
				<Route
					exact
					path={`${url}/join`}
					render={() => <JoinTournamentScreen tournamentId={tournament.id} />}
				/>
				<Route
					exact
					path={`${url}/bracket`}
					render={() => <BracketScreen tournamentId={tournament.id} />}
				/>
				<Route
					exact
					path={`${url}/teams`}
					render={() => <RegisteredTeamsScreen tournamentId={tournament.id} />}
				/>
				<Route
					exact
					path={`${url}/manage`}
					render={() => <ManageTournamentScreen tournamentId={tournament.id} />}
				/>

				<Route
					exact
					path={`${url}/match/:matchId`}
					render={() => <MatchScreen tournament={tournament} />}
				/>
			</Switch>
		</div>
	);
};

export default TournamentView;
