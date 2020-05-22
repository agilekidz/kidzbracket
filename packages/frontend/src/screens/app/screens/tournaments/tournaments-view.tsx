import React from 'react';

import { Redirect, Route, Switch, useRouteMatch } from 'react-router-dom';

import CreateTournamentScreen from './screens/create-tournament';
import TournamentScreen from './screens/tournament';

const TournamentsView = () => {
	const { url } = useRouteMatch();
	return (
		<Switch>
			<Route path={`${url}/create`} component={CreateTournamentScreen} />
			<Route path={`${url}/:tournamentId/:tabId`} component={TournamentScreen} />
			<Route
				path={`${url}/:tournamentId`}
				render={({ match }) => <Redirect to={`${url}/${match.params.tournamentId}/overview`} />}
			/>
		</Switch>
	);
};

export default TournamentsView;
