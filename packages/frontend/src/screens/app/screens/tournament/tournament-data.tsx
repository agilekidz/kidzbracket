import React from 'react';

// Bibliotek som låter oss skapa htmltaggar tillsammans med CSS
import Styled from 'styled-components';

//importerar den inputruta vi själva gjort
import Input from './components/styled-input';

import FormWrapper from './components/form-wrapper';

import BottomSubmit from './components/bottom-submit';

//Yttersta lager av rutan på hemsidan
const Wrapper = Styled.div`
     width: 800px;
     background: #E5EAFA;
     display: flex;
	 flex-direction: column;
	 margin: 0 auto 0 auto
`;

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

const TournamentData = () => {
	return (
		<Wrapper>
			<div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
				<h1>Create a Tournament</h1>
			</div>
			<FormWrapper>
				<Input input={Name}></Input>
				<Input input={Description}></Input>
				<Input input={Game}></Input>
			</FormWrapper>
			<BottomSubmit func={CreateTournamentData} />
		</Wrapper>
	);
};

export default TournamentData;
