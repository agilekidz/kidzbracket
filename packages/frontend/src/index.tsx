import 'simplebar/dist/simplebar.min.css';

import React from 'react';
import ReactDOM from 'react-dom';

import { ApolloClient, ApolloProvider, HttpLink, InMemoryCache } from '@apollo/client';
import { BrowserRouter as Router } from 'react-router-dom';
import SimpleBar from 'simplebar-react';

import AppScreen from './screens/app';
import { AuthProvider } from './screens/app/contexts/auth-context';

const client = new ApolloClient({
	cache: new InMemoryCache(),
	link: new HttpLink({
		uri: String(process.env.GRAPHQL_API_ENDPOINT),
		credentials: 'include',
	}),
});

ReactDOM.render(
	<Router>
		<ApolloProvider client={client}>
			<AuthProvider>
				<SimpleBar style={{ maxHeight: '100vh' }}>
					<AppScreen />
				</SimpleBar>
			</AuthProvider>
		</ApolloProvider>
	</Router>,
	document.getElementById('root'),
);

if ((module as any).hot) {
	(module as any).hot.accept();
}
