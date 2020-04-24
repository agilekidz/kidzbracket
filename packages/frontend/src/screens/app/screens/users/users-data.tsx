import React from 'react';

import { gql, useQuery } from '@apollo/client';

import { UsersQuery } from './__generated__/UsersQuery';
import UsersView from './users-view';

const USERS_QUERY = gql`
	query UsersQuery {
		users {
			id
			name
		}
	}
`;

const UsersData = () => {
	const { data, error, loading } = useQuery<UsersQuery>(USERS_QUERY);

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
