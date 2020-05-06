import React from 'react';

import { Route, Switch } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';
import { Normalize } from 'styled-normalize';

import Footer from './components/footer';
import GuestRoute from './components/guest-route';
import Navbar from './components/navbar';
import PrivateRoute from './components/private-route';
import AuthScreen from './screens/auth';
import BracketScreen from './screens/bracket';
import HomeScreen from './screens/home';
import MatchScreen from './screens/match';
import ProfileScreen from './screens/profile';
import TournamentScreen from './screens/tournament';
import UsersScreen from './screens/users';
import { Layout } from './utils/styles';

const GlobalStyle = createGlobalStyle`
	* {
    box-sizing: border-box;
  }

  html {
    height: 100%;
  }

  body {
    min-height: 100%;
  }
`;

const AppView = () => {
	return (
		// <div style={{ background: 'rgb(74, 78, 105)' }}>
		<Layout>
			<GlobalStyle />
			<Normalize />
			<Layout.Nav>
				<Layout.Wrapper>
					<Navbar />
				</Layout.Wrapper>
			</Layout.Nav>
			<Layout.Content>
				<Layout.Wrapper>
					<Switch>
						<PrivateRoute path="/users" component={UsersScreen} />
						<GuestRoute path="/auth" component={AuthScreen} />
						<Route exact path="/" component={HomeScreen} />
						<Route path="/tournaments/:tournamentId" component={BracketScreen} />
						<Route path="/tournament" component={TournamentScreen} />
						<Route path="/match/:matchId" component={MatchScreen} />
						<PrivateRoute path="/profile" component={ProfileScreen} />
					</Switch>
				</Layout.Wrapper>
			</Layout.Content>
			<Layout.Footer>
				<Layout.Wrapper>
					<Footer />
				</Layout.Wrapper>
			</Layout.Footer>
		</Layout>
		// </div>
	);
};

export default AppView;
