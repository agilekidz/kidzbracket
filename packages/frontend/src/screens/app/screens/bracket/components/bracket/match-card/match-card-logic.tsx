export const MatchCardOnClickAction = ({ matchId, props }) => {
	props.history.push('/match/' + matchId);
	alert('Hello from' + matchId);
	return undefined;
};
