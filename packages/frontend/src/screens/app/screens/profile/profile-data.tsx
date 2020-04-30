import React from 'react';

import { gql, useQuery } from '@apollo/client';

import { ProfileAliasBioQuery } from './__generated__/ProfileAliasBioQuery';
import ProfileLogic from './profile-logic';

const PROFILE_QUERY = gql`
	query ProfileAliasBioQuery {
		me {
			id
			alias
			bio
		}
	}
`;

const ProfileData = () => {
	const { data, error, loading } = useQuery<ProfileAliasBioQuery>(PROFILE_QUERY);

	if (loading) {
		return <div>loading.-_..</div>;
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
