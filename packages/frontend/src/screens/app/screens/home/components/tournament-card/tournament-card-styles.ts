import styled from 'styled-components';

export const Mainbox = styled.div`
	margin: 0;
	padding: 0;
	width: 100%;
	height: 200px;
	box-sizing: border-box;
	display: flex;
	justify-content: center;
	align-items: center;
`;

export const Innerbox = styled.div`
	width: 100%;
	height: 90%;
	padding-left: 5%;
	background: rgb(229, 234, 250);
	border-radius: 7px;
	display: flex;
	align-items: stretch;
	border: 4px solid rgb(43, 45, 66);
	transition: all 0.2s;
	&:hover {
		box-shadow: inset 0 0 10px #000000;
		background: #ccd1e3;
	}
`;
// old color #bcc0d0

export const Name = styled.div`
	height: 20%;
	font: 2em 'Arial', sans-serif;
	border-bottom: black 2px solid;
`;

export const Desc = styled.div`
	width: 65%;
	height: 30%;
	font: 1em 'Arial', sans-serif;
`;

export const Game = styled.div`
	width: 20%;
	height: 15%;
	font: 1em 'Arial', sans-serif;
`;

export const Image = styled.div`
    background: purple;
    width: 90%;
    height 90%;
`;
