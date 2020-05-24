import React from 'react';

import { Row, Spin } from 'antd';

export const Spinner = () => {
	return (
		<Row justify="center" style={{ margin: '16px 0' }}>
			<Spin />
		</Row>
	);
};
