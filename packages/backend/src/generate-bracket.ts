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
	{
		id: nanoid(3),
		name: 'Team 8',
	},
	{
		id: nanoid(3),
		name: 'Team 9',
	},
];

interface Match {
	id: string;
	firstTeamId: string | null;
	secondTeamId: string | null;
	firstParentId: string | null;
	secondParentId: string | null;
	round: number;
}

function shuffle<T>(arr: T[]) {
	for (let i = arr.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[arr[i], arr[j]] = [arr[j], arr[i]];
	}

	return arr;
}

shuffle(teams);

const matches: Match[] = [];

const rounds = Math.floor(Math.log2(teams.length));

const restOfThePeeps: Team[] = teams.filter((_, index) => {
	return index >= Math.pow(2, rounds);
});

for (let i = 0; i < Math.pow(2, rounds); i += 2) {
	const match: Match = {
		id: nanoid(3),
		firstParentId: null,
		secondParentId: null,
		firstTeamId: teams[i].id,
		secondTeamId: teams[i + 1].id,
		round: rounds,
	};
	matches.push(match);
}

let skip = 0;
for (let currentRound = rounds - 1; currentRound > 0; currentRound--) {
	const matchesLength = matches.length;
	for (let i = skip; i < matchesLength; i += 2) {
		const match: Match = {
			id: nanoid(3),
			firstParentId: matches[i].id,
			secondParentId: matches[i + 1].id,
			firstTeamId: null,
			secondTeamId: null,
			round: currentRound,
		};
		matches.push(match);
	}
	skip += Math.pow(2, currentRound);
}

let numbers = [];
for (let i = 0; i < Math.pow(2, rounds) / 2; ++i) {
	numbers.push(i);
}

shuffle(numbers);
numbers = numbers.slice(restOfThePeeps.length);

for (const i in numbers) {
	const teamIndex = Number(i);
	const matchIndex = numbers[i];
	// Always chooses the first team to play an extra match
	const teamId = matches[matchIndex].firstTeamId;
	matches[matchIndex].firstTeamId = null;

	const match: Match = {
		id: nanoid(3),
		firstParentId: null,
		secondParentId: null,
		firstTeamId: teamId,
		secondTeamId: restOfThePeeps[teamIndex].id,
		round: rounds + 1,
	};

	matches[matchIndex].firstParentId = match.id;

	matches.push(match);
}

console.log(matches);
