import React from 'react';

import { Route, Switch, useRouteMatch } from 'react-router-dom';

import CreateTournamentScreen from './screens/create-tournament';
import TournamentScreen from './screens/tournament';

const TournamentsView = () => {
	const { url } = useRouteMatch();
	return (
		<Switch>
			<Route path={`${url}/create`} component={CreateTournamentScreen} />
			<Route path={`${url}/:tournamentId`} component={TournamentScreen} />
		</Switch>
	);
};

export default TournamentsView;
