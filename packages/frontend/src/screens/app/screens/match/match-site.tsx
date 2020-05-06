import React from 'react';

import { useParams } from 'react-router-dom';

const MatchSite = () => {
	const { matchId } = useParams();

	return <p>hello</p>;
};

export default MatchSite;
