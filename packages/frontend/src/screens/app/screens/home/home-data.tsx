import React from 'react';

import { gql, useQuery } from '@apollo/client';

import { TournamentsQuery } from './__generated__/TournamentsQuery';
import HomeView from './home-view';

const TOURNAMENTS_QUERY = gql`
	query TournamentsQuery {
		tournaments {
			id
			name
			description
			game
			maxTeams
			teams {
				id
				name
			}
		}
	}
`;

const HomeData = () => {
	const { data, error, loading } = useQuery<TournamentsQuery>(TOURNAMENTS_QUERY);

	if (loading) {
		return <div>loading.-_..</div>;
	}
	if (error) {
		return <div>Error!</div>;
	}
	if (data) {
		return <HomeView tournaments={data.tournaments} />;
	}
	return null;
};

export default HomeData;
