import React from 'react';

import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import { Spinner } from '../../shared/components/spinner';

import { TournamentsQuery } from './__generated__/TournamentsQuery';
import HomeView from './home-view';

const TOURNAMENTS_QUERY = gql`
	query TournamentsQuery {
		tournaments {
			id
			name
			game
			maxTeams
			winner {
				id
				name
			}
			teams {
				id
				name
			}
			started
		}
	}
`;

const HomeData = () => {
	const { data, error, loading } = useQuery<TournamentsQuery>(TOURNAMENTS_QUERY);

	if (loading) {
		return <Spinner />;
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
