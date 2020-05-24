import React, { useEffect } from 'react';

import { useApolloClient, useSubscription } from '@apollo/react-hooks';
import { Layout } from 'antd';
import gql from 'graphql-tag';
import { Route, Switch } from 'react-router-dom';

import { MatchFinalizedSubscription } from './__generated__/MatchFinalizedSubscription';
import { MatchFragment } from './__generated__/MatchFragment';
import { LayoutWrapper } from './app-styles';
// import { createGlobalStyle } from 'styled-components';
import Footer from './components/footer';
import GuestRoute from './components/guest-route';
import Navbar from './components/navbar';
import PrivateRoute from './components/private-route';
import AuthScreen from './screens/auth';
import HomeScreen from './screens/home';
import MatchScreen from './screens/match';
import ProfileScreen from './screens/profile';
import TournamentsScreen from './screens/tournaments';

const MATCH_FINALIZED_SUBSCRIPTION = gql`
	subscription MatchFinalizedSubscription {
		matchFinalized {
			id
			finalized
		}
	}
`;

const MATCH_FRAGMENT = gql`
	fragment MatchFragment on Match {
		id
		finalized
	}
`;

const AppView = () => {
	const { data } = useSubscription<MatchFinalizedSubscription>(MATCH_FINALIZED_SUBSCRIPTION);
	const client = useApolloClient();

	useEffect(() => {
		if (data) {
			const id = 'Match:' + data.matchFinalized.id;
			const fragmentData = client.readFragment<MatchFragment>({
				id,
				fragment: MATCH_FRAGMENT,
			});

			if (fragmentData) {
				client.writeFragment<MatchFragment>({
					id,
					fragment: MATCH_FRAGMENT,
					data: data.matchFinalized,
				});
			}
		}
	}, [client, data]);

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
