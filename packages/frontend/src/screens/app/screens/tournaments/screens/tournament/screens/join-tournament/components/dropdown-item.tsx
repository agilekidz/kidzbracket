import React from 'react';

import Styled from 'styled-components';

interface Props {
	name: string;
	updateValue: Function;
}

const Item = Styled.div`
    background: white;
    width: 200px;
    height: 40px;
    padding: 5px;
    border: solid 1px black;
    :hover {background: lightgray}
`;

const DropdownItem: React.FC<Props> = ({ name, updateValue }) => {
	return <Item onClick={() => updateValue(name)}>{name}</Item>;
};

export default DropdownItem;
