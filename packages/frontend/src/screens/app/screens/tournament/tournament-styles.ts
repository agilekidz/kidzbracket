import styled from 'styled-components';

export const FormWrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: stretch;
	flex-basis: 400px;
`;

export const Form = styled.form`
	background: #e5eafa;
	display: flex;
	flex-direction: column;
	padding: 20px;
`;

export const InputWrapper = styled.div`
	display: flex;
	flex-direction: column;
	margin-bottom: 20px;
`;

export const Label = styled.label`
	margin-bottom: 5px;
`;

export const Input = styled.input`
	background: white;
	border: solid 1px lightgray;
	border-radius: 5px;
	padding: 10px;
	&:focus {
		outline: none;
	}
`;

export const SubmitButtonWrapper = styled.div`
	display: flex;
	justify-content: center;
`;
