import React, { useState } from 'react';

import Styled from 'styled-components';

import Item from './dropdown-item';

const Dropdown = Styled.div`
	display:none;
	border: black solid 1px;
	position: absolute;
	background: lightgray;
`;

const Input = Styled.input`

`;

interface User {
	id: string;
	name: string;
}

interface Props {
	users: User[];
}

const SearchBox: React.FC<Props> = ({ users }) => {
	const [visible, setVisible] = useState('none');
	const [list, updateList] = useState<JSX.Element[]>([]);
	const [inputValue, updateValue] = useState<string>('');

	// The one who changes this name deserves to die
	function bigRetard() {
		setTimeout(() => setVisible('none'), 100);
	}

	function filter(input: string) {
		if (input === '') return [];
		const fUsers = users.filter(user => {
			return user.name.toLowerCase().slice(0, input.length) == input.toLowerCase();
		});
		const items: JSX.Element[] = [];
		fUsers.forEach(user => items.push(<Item updateValue={updateValue} name={user.name}></Item>));

		return items.slice(0, 5);
	}

	function updateDropdown(input: string) {
		updateValue(input);
		updateList(filter(input));
	}

	return (
		<div>
			<Input
				type="text"
				value={inputValue}
				onFocus={() => setVisible('block')}
				onBlur={() => bigRetard()}
				onChange={e => updateDropdown(e.target.value)}
			></Input>
			<Dropdown style={{ display: visible }}>{list}</Dropdown>
		</div>
	);
};

export default SearchBox;
