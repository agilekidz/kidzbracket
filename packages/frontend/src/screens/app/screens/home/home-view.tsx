import React from 'react';

import { Col, Row } from 'antd';
import styled from 'styled-components';

import TournamentCard from './components/tournament-card';

const Wrapper = styled.div`
	margin-top: 16px;
`;

function chunkify<T>(array: T[], chunkSize: number): T[][] {
	const chunkedArray: T[][] = [];

	for (let i = 0; i < array.length; i += chunkSize) {
		chunkedArray.push(array.slice(i, i + chunkSize));
	}

	return chunkedArray;
}

interface Tournament {
	id: string;
	name: string;
	description: string;
	game: string;
	maxTeams: number;
	teams: {
		id: string;
		name: string;
	}[];
	winner: { name: string } | null;
}
const CHUNK_SIZE = 4;

interface Props {
	tournaments: Tournament[];
}

const HomeView: React.FC<Props> = ({ tournaments }) => {
	return (
		<Wrapper>
			{chunkify(tournaments, CHUNK_SIZE).map((chunk, index) => (
				<Row key={index} gutter={[16, 16]}>
					{chunk.map(tournament => (
						<Col span={24 / CHUNK_SIZE} key={tournament.id}>
							<TournamentCard tournament={tournament} />
						</Col>
					))}
				</Row>
			))}
		</Wrapper>
	);
};

export default HomeView;
