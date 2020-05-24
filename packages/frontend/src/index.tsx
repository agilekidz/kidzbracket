import 'simplebar/dist/simplebar.min.css';
import 'antd/dist/antd.dark.css';

import React from 'react';
import ReactDOM from 'react-dom';

import { ApolloProvider } from '@apollo/react-hooks';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import { split } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';
import { BrowserRouter as Router } from 'react-router-dom';
import SimpleBar from 'simplebar-react';

import AppScreen from './screens/app';
import { AuthProvider } from './screens/app/contexts/auth-context';

const httpLink = new HttpLink({
	uri: String(process.env.GRAPHQL_API_ENDPOINT),
	credentials: 'include',
});

const wsLink = new WebSocketLink({
	uri: String(process.env.GRAPHQL_API_ENDPOINT).replace('http', 'ws'),
	options: {
		reconnect: true,
	},
});

const link = split(
	// split based on operation type
	({ query }) => {
		const definition = getMainDefinition(query);
		return definition.kind === 'OperationDefinition' && definition.operation === 'subscription';
	},
	wsLink,
	httpLink,
);

const client = new ApolloClient({
	cache: new InMemoryCache(),
	link,
});

ReactDOM.render(
	<Router>
		<ApolloProvider client={client}>
			<AuthProvider>
				<SimpleBar style={{ height: '100vh' }}>
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
