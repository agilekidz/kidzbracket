import { nanoid } from 'nanoid';

interface Team {
	id: string;
	name: string;
}

const teams: Team[] = [
	{
		id: nanoid(3),
		name: 'Team 0',
	},
	{
		id: nanoid(3),
		name: 'Team 1',
	},
	{
		id: nanoid(3),
		name: 'Team 2',
	},
	{
		id: nanoid(3),
		name: 'Team 3',
	},
	{
		id: nanoid(3),
		name: 'Team 4',
	},
	{
		id: nanoid(3),
		name: 'Team 5',
	},
	{
		id: nanoid(3),
		name: 'Team 6',
	},
	{
		id: nanoid(3),
		name: 'Team 7',
	},
];

interface Match {
	id: string;
	firstTeamId: string | null;
	secondTeamId: string | null;
	firstParentId: string | null;
	secondParentId: string | null;
}

function shuffle<T>(arr: T[]) {
	for (let i = arr.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[arr[i], arr[j]] = [arr[j], arr[i]];
	}

	return arr;
}

const matches: Match[] = [];

shuffle(teams);

for (let i = 0; i < teams.length; i += 2) {
	const match: Match = {
		id: nanoid(3),
		firstParentId: null,
		secondParentId: null,
		firstTeamId: teams[i].id,
		secondTeamId: teams[i + 1].id,
	};
	matches.push(match);
}

let count = 0;
let numberOfMatches = matches.length;
while (numberOfMatches !== 1) {
	console.log(count);
	const matchLength = matches.length;
	for (let i = count; i < matchLength; i += 2) {
		const match: Match = {
			id: nanoid(3),
			firstParentId: matches[i].id,
			secondParentId: matches[i + 1].id,
			firstTeamId: null,
			secondTeamId: null,
		};
		matches.push(match);
	}

	count += numberOfMatches;
	numberOfMatches /= 2;
}

console.log(matches);
