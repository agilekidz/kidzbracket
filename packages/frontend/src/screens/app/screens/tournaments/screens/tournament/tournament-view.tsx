import React from 'react';

import { Link, Route, Switch, useParams, useRouteMatch } from 'react-router-dom';

import BracketScreen from './screens/bracket';
import JoinTournamentScreen from './screens/join-tournament';
import OverviewScreen from './screens/overview';

const TournamentView = () => {
	const { tournamentId } = useParams();
	const { url } = useRouteMatch();
	return (
		<div>
			<h1>This is going to be our tournament site where we can go to different screens</h1>
			<ul>
				<li>
					<Link to={`${url}`}>overview</Link>
				</li>
				<li>
					<Link to={`${url}/join`}>Join</Link>
				</li>
				<li>
					<Link to={`${url}/bracket`}>Bracket</Link>
				</li>

				<li></li>
			</ul>
			<Switch>
				<Route exact path={`${url}/`} component={OverviewScreen} />
				<Route exact path={`${url}/join`} component={JoinTournamentScreen} />
				<Route
					exact
					path={`${url}/bracket`}
					render={() => <BracketScreen tournamentId={tournamentId || ''} />}
				/>
			</Switch>
		</div>
	);
};

export default TournamentView;
