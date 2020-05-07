import React from 'react';

import { Link, Route, Switch, useParams, useRouteMatch } from 'react-router-dom';

import BracketScreen from './screens/bracket';
import JoinTournamentScreen from './screens/join-tournament';
import OverviewScreen from './screens/overview';
import RegisteredTeamsScreen from './screens/registered-teams';

const TournamentView = () => {
	const { tournamentId } = useParams();
	const { url } = useRouteMatch();
	return (
		<div>
			<h1>This is going to be our tournament site where we can go to different screens</h1>
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
			</ul>
			<Switch>
				<Route exact path={`${url}/`} component={OverviewScreen} />
				<Route
					exact
					path={`${url}/join`}
					render={() => <JoinTournamentScreen tournamentId={tournamentId || ''} />}
				/>
				<Route
					exact
					path={`${url}/bracket`}
					render={() => <BracketScreen tournamentId={tournamentId || ''} />}
				/>
				<Route
					exact
					path={`${url}/teams`}
					render={() => <RegisteredTeamsScreen tournamentId={tournamentId || ''} />}
				/>
			</Switch>
		</div>
	);
};

export default TournamentView;
