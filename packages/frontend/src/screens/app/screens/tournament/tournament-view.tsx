import React from 'react';

const Name = {
	name: 'Name',
	hint: 'My Very Cool Tournament',
	info: '',
};

const Description = {
	name: 'Description',
	hint: "AgileKidz' first ever....",
	info: '',
};

const Game = {
	name: 'Game',
	hint: 'Leauge of Legends',
	info: '',
};

function CreateTournamentData() {
	alert(Name.info + ' : ' + Description.info + ' : ' + Game.info);
}

interface Props {
	name: string;
	description: string;
	game: string;
	handleNameChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
	handleDescriptionChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
	handleGameChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
	handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

const TournamentView: React.FC<Props> = ({
	name,
	description,
	game,
	handleNameChange,
	handleDescriptionChange,
	handleGameChange,
	handleSubmit,
}) => {
	return (
		// <Wrapper>
		// 	<div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
		// 		<h1>Create a Tournament</h1>
		// 	</div>
		// 	<FormWrapper>
		// 		<Input input={Name}></Input>
		// 		<Input input={Description}></Input>
		// 		<Input input={Game}></Input>
		// 	</FormWrapper>
		// 	<BottomSubmit func={CreateTournamentData} />
		// </Wrapper>

		<form onSubmit={handleSubmit}>
			<div>
				<label htmlFor="name">Name: </label>
				<input id="name" type="text" value={name} onChange={handleNameChange} />
			</div>
			<div>
				<label htmlFor="description">Description: </label>
				<input
					id="description"
					type="text"
					value={description}
					onChange={handleDescriptionChange}
				/>
			</div>
			<div>
				<label htmlFor="game">Game: </label>
				<input id="game" type="text" value={game} onChange={handleGameChange} />
			</div>
			<div>
				<input type="submit" value="unga" />
			</div>
		</form>
	);
};

export default TournamentView;
