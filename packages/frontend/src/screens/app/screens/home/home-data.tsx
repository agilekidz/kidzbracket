import React from 'react';

import { gql, useQuery } from '@apollo/client';

import { TournamentsQuery } from './__generated__/TournamentsQuery';
import HomeLogic from './home-logic';

const TOURNAMENTS_QUERY = gql`
	query TournamentsQuery {
		tournaments(sort: false) {
			id
			name
			description
			game
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
		return <HomeLogic tournaments={data.tournaments} />;
	}
	return null;
};

export default HomeData;
