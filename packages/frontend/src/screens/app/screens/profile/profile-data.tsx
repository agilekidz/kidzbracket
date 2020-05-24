import React from 'react';

import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import { Spinner } from '../../shared/components/spinner';

import { ProfileAliasBioQuery } from './__generated__/ProfileAliasBioQuery';
import ProfileLogic from './profile-logic';

const PROFILE_QUERY = gql`
	query ProfileAliasBioQuery {
		me {
			id
			alias
			bio
			name
		}
	}
`;

const ProfileData = () => {
	const { data, error, loading } = useQuery<ProfileAliasBioQuery>(PROFILE_QUERY);

	if (loading) {
		return <Spinner />;
	}
	if (error) {
		return <div>Error!</div>;
	}
	if (data) {
		return (
			<ProfileLogic
				user={{
					...data.me,
					alias: data.me.alias || '',
					bio: data.me.bio || '',
				}}
			/>
		);
	}
	return null;
};

export default ProfileData;
