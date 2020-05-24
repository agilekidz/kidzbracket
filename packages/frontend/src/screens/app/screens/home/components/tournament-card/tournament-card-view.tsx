import React from 'react';

import { CrownFilled } from '@ant-design/icons';
import { Card, Tag } from 'antd';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

const StyleTag = styled(Tag)`
	margin-bottom: 8px;
`;

interface Props {
	tournament: {
		id: string;
		name: string;
		game: string;
		maxTeams: number;
		teams: {
			id: string;
			name: string;
		}[];
		winner: { name: string } | null;
		started: boolean;
	};
}

const TournamentCardView: React.FC<Props> = ({ tournament }) => {
	const history = useHistory();
	return (
		<Card
			style={{ height: '100%' }}
			cover={
				<div
					onClick={() => history.push('/tournaments/' + tournament.id)}
					style={{
						cursor: 'pointer',
						height: '200px',
						backgroundImage:
							'url("https://theme.zdassets.com/theme_assets/43400/87a1ef48e43b8cf114017e3ad51b801951b20fcf.jpg")',
						backgroundSize: 'cover',
						backgroundRepeat: 'no-repeat',
						backgroundPosition: '50% 0',
					}}
				/>
			}
		>
			<h2
				onClick={() => history.push('/tournaments/' + tournament.id)}
				style={{
					cursor: 'pointer',
					textOverflow: 'ellipsis',
					whiteSpace: 'nowrap',
					overflow: 'hidden',
				}}
			>
				{tournament.name}
			</h2>
			<StyleTag>{tournament.game}</StyleTag>
			{!tournament.started && (
				<StyleTag>
					{tournament.maxTeams - tournament.teams.length} / {tournament.maxTeams} spots left
				</StyleTag>
			)}
			{tournament.started && !tournament.winner && <Tag color="green">Ongoing</Tag>}
			{tournament.winner && (
				<StyleTag color="green">
					<CrownFilled style={{ color: 'yellow', marginRight: '4px' }} />
					{tournament.winner.name}
				</StyleTag>
			)}
		</Card>
	);
};

export default TournamentCardView;
