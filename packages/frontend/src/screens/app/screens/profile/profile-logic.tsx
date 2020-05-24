import React, { useState } from 'react';

import { useMutation } from '@apollo/react-hooks';
import { message } from 'antd';
import gql from 'graphql-tag';

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
				name
			}
		}
	}
`;
interface Props {
	user: {
		id: string;
		alias: string;
		bio: string;
		name: string;
	};
}

const ProfileLogic: React.FC<Props> = ({ user }) => {
	const [alias, setAlias] = useState(user.alias);
	const [bio, setBio] = useState(user.bio);
	const [name, setName] = useState(user.name);
	const [updateUser, { loading }] = useMutation<
		UpdateProfileMutation,
		UpdateProfileMutationVariables
	>(UPDATE_PROFILE_MUTATION, {
		onCompleted() {
			message.success('Your profile has been saved');
		},
		onError() {
			message.error('Could not save your profile');
		},
	});

	const handleAliasChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setAlias(event.target.value);
	};
	const handleBioChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
		setBio(event.target.value);
	};
	const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setName(event.target.value);
	};

	const handleSubmit = () => {
		updateUser({
			variables: {
				data: { alias, bio, name },
				id: user.id,
			},
		});
	};
	return (
		<ProfileView
			alias={alias}
			bio={bio}
			name={name}
			loading={loading}
			handleAliasChange={handleAliasChange}
			handleBioChange={handleBioChange}
			handleNameChange={handleNameChange}
			handleSubmit={handleSubmit}
		/>
	);
};
export default ProfileLogic;
