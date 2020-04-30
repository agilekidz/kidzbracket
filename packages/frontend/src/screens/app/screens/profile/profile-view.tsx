import React from 'react';

interface Props {
	alias: string;
	bio: string;
	handleAliasChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
	handleBioChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
	handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}
const ProfileView: React.FC<Props> = ({
	alias,
	bio,
	handleAliasChange,
	handleBioChange,
	handleSubmit,
}) => {
	return (
		<div>
			<form onSubmit={handleSubmit}>
				<div>
					<label htmlFor="alias">Alias:</label>
					<input type="text" id="alias" value={alias} onChange={handleAliasChange} />
				</div>
				<div>
					<label htmlFor="bio">Bio</label>
					<textarea id="bio" value={bio} onChange={handleBioChange} />
				</div>
				<input type="submit" value="Save" />
			</form>
		</div>
	);
};

export default ProfileView;
