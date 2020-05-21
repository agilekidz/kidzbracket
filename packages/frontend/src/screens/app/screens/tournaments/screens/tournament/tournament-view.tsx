import React from 'react';

import { Button } from 'antd';
import { Link, Route, Switch, useRouteMatch } from 'react-router-dom';
import styled from 'styled-components';

import BracketScreen from './screens/bracket';
import JoinTournamentScreen from './screens/join-tournament';
import ManageTournamentScreen from './screens/manage-tournament';
import MatchScreen from './screens/match';
import OverviewScreen from './screens/overview';
import RegisteredTeamsScreen from './screens/registered-teams';

interface Props {
	tournament: {
		id: string;
		name: string;
		maxTeams: number;
		registeredTeamCount: number;
		started: boolean;
	};
}

const ButtonStyle = {
	padding: '7px 10px',
	background: '#e5eafa',
	size: 'middle',
};

const HeaderTitle = styled.p`
	font-size: 40px;
	color: hotpink;
`;
const TournamentView: React.FC<Props> = ({ tournament }) => {
	const { url } = useRouteMatch();
	return (
		<div>
			<HeaderTitle>{tournament.name}</HeaderTitle>
			<div
				style={{
					display: 'flex',
					maxWidth: '500px',
					justifyContent: 'space-between',
					margin: '10px 0px 10px 0px',
				}}
			>
				<Button style={{ color: 'black', ...ButtonStyle }}>
					<Link to={`${url}`}>Overview</Link>
				</Button>
				{tournament.started && (
					<Button disabled={true} style={{ color: 'gray', ...ButtonStyle }}>
						Join (Started)
					</Button>
				)}

				{!tournament.started && tournament.registeredTeamCount < tournament.maxTeams && (
					<Button disabled={true} style={{ color: 'gray', ...ButtonStyle }}>
						<Link to={`${url}/join`}>Join</Link>
					</Button>
				)}
				{!tournament.started && tournament.registeredTeamCount >= tournament.maxTeams && (
					<Button disabled={true} style={{ color: 'gray', ...ButtonStyle }}>
						Join (full)
					</Button>
				)}
				{(tournament.started && (
					<Button style={{ color: 'black', ...ButtonStyle }}>
						<Link to={`${url}/bracket`}>Bracket</Link>
					</Button>
				)) || (
					<Button disabled={true} style={{ color: 'gray', ...ButtonStyle }}>
						Bracket
					</Button>
				)}
				<Button style={{ color: 'black', ...ButtonStyle }}>
					<Link to={`${url}/teams`}>Teams</Link>
				</Button>
				<Button style={{ color: 'black', ...ButtonStyle }}>
					<Link to={`${url}/manage`}>Manage</Link>
				</Button>
			</div>
			<div
				style={{
					height: '2px',
					backgroundColor: 'hotpink',
					marginBottom: '10px',
				}}
			></div>
			<Switch>
				<Route
					exact
					path={`${url}/`}
					render={() => <OverviewScreen tournamentId={tournament.id} />}
				/>
				<Route
					exact
					path={`${url}/join`}
					render={() => <JoinTournamentScreen tournamentId={tournament.id} />}
				/>
				<Route
					exact
					path={`${url}/bracket`}
					render={() => <BracketScreen tournamentId={tournament.id} />}
				/>
				<Route
					exact
					path={`${url}/teams`}
					render={() => <RegisteredTeamsScreen tournamentId={tournament.id} />}
				/>
				<Route
					exact
					path={`${url}/manage`}
					render={() => <ManageTournamentScreen tournamentId={tournament.id} />}
				/>

				<Route
					exact
					path={`${url}/match/:matchId`}
					render={() => <MatchScreen tournament={tournament} />}
				/>
			</Switch>
		</div>
	);
};

export default TournamentView;
