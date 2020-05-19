import React from 'react';

import { useAuth } from '../../../../../contexts/auth-context';

interface Props {
	ownerId: string;
}

const AdminCheck: React.FC<Props> = ({ ownerId, children }) => {
	const { user } = useAuth();
	if (ownerId === user?.id) {
		return <>{children}</>;
	}

	return <div />;
};

export default AdminCheck;
