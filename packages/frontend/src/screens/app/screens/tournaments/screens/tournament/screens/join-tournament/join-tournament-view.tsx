import React from 'react';

interface Props {
	teamName: string;
	playerNames: string[];
	handleTeamNameChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
	handlePlayerNameChange: (id: number, event: React.ChangeEvent<HTMLInputElement>) => void;
	handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

const JoinTournamentView: React.FC<Props> = ({
	teamName,
	playerNames,
	handleTeamNameChange,
	handlePlayerNameChange,
	handleSubmit,
}) => {
	return (
		<div>
			<h2>Join tournament</h2>
			<form onSubmit={handleSubmit}>
				<div>
					<label htmlFor="name">TeamName</label>
					<input type="text" id="name" value={teamName} onChange={handleTeamNameChange} />
				</div>
				{playerNames.map((playerName, index) => (
					<div key={index}>
						<label htmlFor="alias">Player {index + 1} name</label>
						<input
							type="text"
							id="alias"
							value={playerName}
							onChange={event => handlePlayerNameChange(index, event)}
						/>
					</div>
				))}
				<input type="submit" value="Join" />
			</form>
		</div>
	);
};

export default JoinTournamentView;
