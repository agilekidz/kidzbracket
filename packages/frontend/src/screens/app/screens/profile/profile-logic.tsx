import React, { useState } from 'react';

import { gql, useMutation } from '@apollo/client';

import {
	UpdateProfileMutation,
	UpdateProfileMutationVariables,
} from './__generated__/UpdateProfileMutation';
import ProfileView from './profile-view';

const UPDATE_PROFILE_MUTATION = gql`
	mutation UpdateProfileMutation($id: ID!, $data: UpdateUserInput!) {
		updateUser(data: $data, id: $id) {
			user {
				id
				alias
				bio
			}
		}
	}
`;
interface Props {
	user: {
		id: string;
		alias: string;
		bio: string;
	};
}

const ProfileLogic: React.FC<Props> = ({ user }) => {
	const [alias, setAlias] = useState(user.alias);
	const [bio, setBio] = useState(user.bio);
	const [updateUser] = useMutation<UpdateProfileMutation, UpdateProfileMutationVariables>(
		UPDATE_PROFILE_MUTATION,
	);
	const handleAliasChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setAlias(event.target.value);
	};
	const handleBioChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
		setBio(event.target.value);
	};
	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		updateUser({
			variables: {
				data: { alias, bio },
				id: user.id,
			},
		});
	};

	return (
		<ProfileView
			alias={alias}
			bio={bio}
			handleAliasChange={handleAliasChange}
			handleBioChange={handleBioChange}
			handleSubmit={handleSubmit}
		/>
	);
};
export default ProfileLogic;
