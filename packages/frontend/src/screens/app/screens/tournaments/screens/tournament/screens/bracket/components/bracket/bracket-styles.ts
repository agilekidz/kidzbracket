import styled from 'styled-components';

const LINE_THICKNESS = 2;
const LINE_THICKNESS_PX = `${LINE_THICKNESS}px`;
const LINE_LENGTH = 20;
const LINE_LENGTH_PX = `${LINE_LENGTH}px`;
const HALF_LINE_THICKNESS_PX = `${LINE_THICKNESS / 2}px`;

// Layout
export const Wrapper = styled.div`
	display: flex;
`;

export const ChildWrapper = styled.div`
	flex-grow: 1;
	display: flex;
	flex-direction: column;
`;

export const ContentWrapper = styled.div`
	flex-shrink: 0;
	display: flex;
	justify-content: center;
	align-items: center;
`;

export const ContentCardWrapper = styled.div`
	padding: 20px 0;
`;

// Connector
export const HorizontalConnector = styled.div`
	width: ${LINE_LENGTH_PX};
	height: ${LINE_THICKNESS_PX};
	background: #1f1f1f;
`;

export const VerticalConnector = styled.div`
	width: ${LINE_THICKNESS_PX};
	height: calc(50% + ${LINE_THICKNESS_PX});
	background: #1f1f1f;
`;

export const HalfVerticalConnectorWrapper = styled.div`
	display: flex;
	flex-direction: column;
	width: ${LINE_THICKNESS_PX};
	height: calc(50% + ${LINE_THICKNESS_PX});
`;

export const HalfVerticalConnectorFilled = styled.div`
	width: ${LINE_THICKNESS_PX};
	flex-basis: calc(50% + ${HALF_LINE_THICKNESS_PX});
	flex-shrink: 0;
	background: #1f1f1f;
`;

export const HalfVerticalConnectorEmpty = styled.div`
	width: ${LINE_THICKNESS_PX};
	flex-grow: 1;
`;
