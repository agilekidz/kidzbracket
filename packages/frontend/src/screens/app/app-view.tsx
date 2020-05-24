import React from 'react';

import { Layout } from 'antd';
import { Route, Switch } from 'react-router-dom';

import { LayoutWrapper } from './app-styles';
// import { createGlobalStyle } from 'styled-components';
import Footer from './components/footer';
import GuestRoute from './components/guest-route';
import Navbar from './components/navbar';
import PrivateRoute from './components/private-route';
import { useSubscriptionSync } from './hooks/use-subscription-sync';
import AuthScreen from './screens/auth';
import HomeScreen from './screens/home';
import MatchScreen from './screens/match';
import ProfileScreen from './screens/profile';
import TournamentsScreen from './screens/tournaments';

const AppView = () => {
	useSubscriptionSync();

	return (
		<Layout>
			<Layout.Header>
				<LayoutWrapper>
					<Navbar />
				</LayoutWrapper>
			</Layout.Header>
			<Layout.Content style={{ minHeight: 'calc(100vh - 134px)' }}>
				<LayoutWrapper>
					<Switch>
						<GuestRoute path="/auth" component={AuthScreen} />
						<Route exact path="/" component={HomeScreen} />
						<Route path="/tournaments" component={TournamentsScreen} />
						<Route path="/matches/:matchId" component={MatchScreen} />
						<PrivateRoute path="/profile" component={ProfileScreen} />
					</Switch>
				</LayoutWrapper>
			</Layout.Content>
			<Layout.Footer>
				<LayoutWrapper>
					<Footer />
				</LayoutWrapper>
			</Layout.Footer>
		</Layout>
	);
};

export default AppView;
