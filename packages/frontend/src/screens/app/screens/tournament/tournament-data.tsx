import React from 'react';

// Bibliotek som låter oss skapa htmltaggar tillsammans med CSS
import Styled from 'styled-components';

//importerar den inputruta vi själva gjort
import Input from './components/styled-input';

//Yttersta lager av rutan på hemsidan
const Wrapper = Styled.div`
     width: 1200px;
     height: 50vh;
     background: lightblue;
     display: flex;
     flex-direction: column;



`;

const TournamentData = () => {
	return (
		<Wrapper>
			<div style={{ width: '100%', height: '100px', display: 'flex', justifyContent: 'center' }}>
				<h1>Welcome to the Tournament Page! Feel free to create a tournament.</h1>
			</div>
			<div
				style={{
					display: 'flex',
					width: '100%',
					flexGrow: 1,
					justifyContent: 'center',
					flexDirection: 'column',
					background: 'purple',
				}}
			>
				<Input name="Name"></Input>
				<Input name="Description"></Input>
				<Input name="Game"></Input>
				<Input name="Date"></Input>
			</div>
			<input type="button" value="Create Tournament!"></input>
		</Wrapper>
	);
};

export default TournamentData;
