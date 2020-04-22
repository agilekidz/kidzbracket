import { stringify } from 'query-string';

const location = 'https://github.com/login/oauth/authorize';
/* eslint-disable @typescript-eslint/camelcase */
const query = stringify({
	client_id: String(process.env.GITHUB_OAUTH2_CLIENT_ID),
});
/* eslint-enable @typescript-eslint/camelcase */

const gitHubAuthUri = `${location}?${query}`;

export default gitHubAuthUri;
