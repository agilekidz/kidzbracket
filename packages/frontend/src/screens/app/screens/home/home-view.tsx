import React, { useRef } from 'react';

import useComponentSize from '@rehooks/component-size';
import { Col, Row } from 'antd';
import styled from 'styled-components';

import TournamentCard from './components/tournament-card';

const Wrapper = styled.div`
	margin-top: 16px;
	width: 100%;
	height: 100px;
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
	game: string;
	maxTeams: number;
	teams: {
		id: string;
		name: string;
	}[];
	winner: { name: string } | null;
	started: boolean;
}

interface Props {
	tournaments: Tournament[];
}

const HomeView: React.FC<Props> = ({ tournaments }) => {
	const ref = useRef(null);
	const size = useComponentSize(ref);

	const chunkSize = Math.floor(size.width / 300);

	return (
		<Wrapper ref={ref}>
			{size.width > 0 &&
				chunkify(tournaments, chunkSize).map((chunk, index) => (
					<Row key={index} gutter={[16, 16]} align="stretch">
						{chunk.map(tournament => (
							<Col span={24 / chunkSize} key={tournament.id}>
								<TournamentCard tournament={tournament} />
							</Col>
						))}
					</Row>
				))}
		</Wrapper>
	);
};

export default HomeView;
