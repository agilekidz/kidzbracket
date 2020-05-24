import { useMatchContested } from './use-match-contested';
import { useMatchFinalized } from './use-match-finalized';
import { useTeamRegistered } from './use-team-registered';
import { useTournamentCreated } from './use-tournament-created';
import { useTournamentStarted } from './use-tournament-started';
import { useVictoryReported } from './use-victory-reported';

export const useSubscriptionSync = () => {
	useTournamentCreated();
	useMatchFinalized();
	useTeamRegistered();
	useTournamentStarted();
	useVictoryReported();
	useMatchContested();
};
