import React from 'react';

import { CrownFilled } from '@ant-design/icons';
import { Card } from 'antd';

interface Props {
	team: {
		name: string;
		players: {
			name: string;
		}[];
	};
	winner?: boolean;
}

const Team: React.FC<Props> = ({ team, winner = false }) => {
	return (
		<Card
			title={
				<div>
					{team.name}{' '}
					{winner && (
						<CrownFilled style={{ color: 'yellow', fontSize: '18px', marginLeft: '4px' }} />
					)}
				</div>
			}
			style={{ width: '300px' }}
		>
			{team.players.map((player, index) => (
				<p key={index}>{player.name}</p>
			))}
		</Card>
	);
};

export default Team;
