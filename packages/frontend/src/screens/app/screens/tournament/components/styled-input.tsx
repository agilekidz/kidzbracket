import React from 'react';

import Styled from 'styled-components';

const Input = Styled.input`
    width: 250px;
    height: 30px;
    background: lightgray;
    &:focus{background: white};
`;

interface Props {
	name: string;
}

const StyledInput: React.FC<Props> = ({ name }) => {
	return (
		<div
			style={{
				display: 'flex',
				justifyContent: 'center',
				width: '100%',
				marginTop: '20px',
			}}
		>
			<div
				style={{ width: '30%', display: 'flex', justifyContent: 'flex-End', alignItems: 'center' }}
			>
				{name}
			</div>
			<div style={{ width: '70%', paddingLeft: '20px' }}>
				<Input></Input>
			</div>
		</div>
	);
};

export default StyledInput;
