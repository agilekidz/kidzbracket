import React from 'react';

import { Button, Card, Form, Input, Row } from 'antd';

interface Props {
	alias: string;
	bio: string;
	name: string;
	loading: boolean;
	handleAliasChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
	handleBioChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
	handleNameChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
	handleSubmit: () => void;
}

const ProfileView: React.FC<Props> = ({
	alias,
	bio,
	name,
	loading,
	handleAliasChange,
	handleBioChange,
	handleNameChange,
	handleSubmit,
}) => {
	return (
		<Card title="Profile" style={{ width: '400px', margin: '16px auto 0 auto' }}>
			<Form
				name="create-tournament"
				onFinish={handleSubmit}
				size="large"
				layout="vertical"
				initialValues={{ name, alias, bio }}
			>
				<Form.Item label="Name" name="name">
					<Input value={name} onChange={handleNameChange} placeholder="Name" />
				</Form.Item>
				<Form.Item label="Alias" name="alias">
					<Input value={alias} onChange={handleAliasChange} placeholder="Alias" />
				</Form.Item>
				<Form.Item label="Bio" name="bio">
					<Input.TextArea value={bio} onChange={handleBioChange} placeholder="Bio" />
				</Form.Item>
				<Row justify="center">
					<Form.Item>
						<Button type="primary" htmlType="submit" loading={loading}>
							Save
						</Button>
					</Form.Item>
				</Row>
			</Form>
		</Card>
	);
};

export default ProfileView;
