import { nanoid } from 'nanoid';

interface Team {
	id: string;
	name: string;
}

interface Match {
	id: string;
	firstTeamId: string | null;
	secondTeamId: string | null;
	firstParentId: string | null;
	secondParentId: string | null;
	round: number;
}

function shuffle<T>(arr: T[]): T[] {
	arr = [...arr];
	for (let i = arr.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[arr[i], arr[j]] = [arr[j], arr[i]];
	}
	return arr;
}

export function generateBracket(teams: Team[]): Match[] {
	teams = shuffle(teams);

	const matches: Match[] = [];

	const numberOfRounds = Math.floor(Math.log2(teams.length));

	const restOfTeams: Team[] = teams.filter((_, index) => {
		return index >= Math.pow(2, numberOfRounds);
	});

	for (let i = 0; i < Math.pow(2, numberOfRounds); i += 2) {
		const match: Match = {
			id: nanoid(3),
			firstParentId: null,
			secondParentId: null,
			firstTeamId: teams[i].id,
			secondTeamId: teams[i + 1].id,
			round: numberOfRounds,
		};
		matches.push(match);
	}

	// Only create matches from the previous round
	let skip = 0;
	for (let currentRound = numberOfRounds - 1; currentRound > 0; currentRound--) {
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

	// Add the remaining teams
	// Loop 0..n twice, first time expanding first match, the second time, the second match
	let first = true;
	let current = 0;
	for (let i = 0; i < restOfTeams.length; i++) {
		console.log(i, current, first);
		if (i === Math.pow(2, numberOfRounds) / 2) {
			first = false;
			current = 0;
		}

		let teamId: string | null;
		if (first) {
			teamId = matches[current].firstTeamId;
			matches[current].firstTeamId = null;
		} else {
			teamId = matches[current].secondTeamId;
			matches[current].secondTeamId = null;
		}

		const match: Match = {
			id: nanoid(3),
			firstParentId: null,
			secondParentId: null,
			firstTeamId: teamId,
			secondTeamId: restOfTeams[i].id,
			round: numberOfRounds + 1,
		};

		if (first) {
			matches[current].firstParentId = match.id;
		} else {
			matches[current].secondParentId = match.id;
		}

		matches.push(match);
		current += 1;
	}

	return matches;
}
