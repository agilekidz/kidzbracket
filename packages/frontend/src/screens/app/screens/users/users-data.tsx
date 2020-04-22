import React from 'react';

import { gql, useQuery } from '@apollo/client';

import UsersView from './users-view';

interface UsersQueryResult {
	users: {
		id: string;
		name: string;
	}[];
}

const USERS_QUERY = gql`
	query UsersQuery {
		users {
			id
			name
		}
	}
`;

const UsersData = () => {
	const { data, error, loading } = useQuery<UsersQueryResult>(USERS_QUERY);

	if (loading) {
		return <>Loading...</>;
	}

	if (error) {
		return <>Error...</>;
	}

	if (data) {
		return <UsersView users={data.users} />;
	}

	return null;
};

export default UsersData;
