import React from 'react';

import { Layout } from 'antd';
import { Route, Switch } from 'react-router-dom';

// import { createGlobalStyle } from 'styled-components';
import Footer from './components/footer';
import GuestRoute from './components/guest-route';
import Navbar from './components/navbar';
import PrivateRoute from './components/private-route';
import AuthScreen from './screens/auth';
import HomeScreen from './screens/home';
import ProfileScreen from './screens/profile';
import TournamentsScreen from './screens/tournaments';
import UsersScreen from './screens/users';

// const GlobalStyle = createGlobalStyle`
// 	* {
//     box-sizing: border-box;
//   }

//   html {
//     height: 100%;
//   }

//   body {
//     min-height: 100%;
//   }
// `;

const AppView = () => {
	return (
		<Layout>
			{/* <GlobalStyle /> */}
			<Layout.Header>
				<Navbar />
			</Layout.Header>
			<Layout.Content>
				<Switch>
					<PrivateRoute path="/users" component={UsersScreen} />
					<GuestRoute path="/auth" component={AuthScreen} />
					<Route exact path="/" component={HomeScreen} />
					<Route path="/tournaments" component={TournamentsScreen} />
					<PrivateRoute path="/profile" component={ProfileScreen} />
				</Switch>
			</Layout.Content>
			<Layout.Footer>
				<Footer />
			</Layout.Footer>
		</Layout>
	);
};

export default AppView;
