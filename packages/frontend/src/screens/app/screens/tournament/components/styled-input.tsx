import React from 'react';

import Styled from 'styled-components';

const Input = Styled.input`
    width: 400px;
    height: 40px;
    background: white;
	&:focus{outline: none};
	margin: auto 0 auto 0;
	border: none; 
    border:solid 1px lightgray;
	border-radius: 10px;
	padding: 0 20px 0 5px;
	font: 1em Arial, Sans-Serif;
`;

interface Props {
	input: {
		name: string;
		hint: string;
		info: string;
	};
}

const StyledInput: React.FC<Props> = ({ input }) => {
	function UpdateInfo(info: string) {
		input.info = info;
	}

	return (
		<div
			style={{
				display: 'flex',
				justifyContent: 'center',
				width: '60%',
				flexDirection: 'column',
				marginLeft: '7px',
			}}
		>
			<div
				style={{
					display: 'flex',
					justifyContent: 'flex-start122',
					alignItems: 'center',
					height: '40px',
					marginTop: '5px',
				}}
			>
				<p style={{ fontSize: '1.4em' }}>{input.name}</p>
			</div>
			<div style={{ display: 'flex', alignItems: 'center' }}>
				<Input onChange={event => UpdateInfo(event.target.value)} placeholder={input.hint}></Input>
			</div>
		</div>
	);
};

export default StyledInput;
