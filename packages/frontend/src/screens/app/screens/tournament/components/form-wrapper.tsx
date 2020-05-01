import React from 'react';

import styled from 'styled-components';

const Wrapper = styled.div`
	display: flex;
	width: 100%;
	flexgrow: 1;
	justifycontent: center;
	alignitems: center;
	flexdirection: column;
	paddingbottom: 20px;
`;

const FormWrapper: React.FC = ({ children }) => {
	return <Wrapper>{children}</Wrapper>;
};

export default FormWrapper;
