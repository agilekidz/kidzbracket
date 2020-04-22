import { stringify } from 'query-string';

const location = 'https://accounts.google.com/o/oauth2/v2/auth';
/* eslint-disable @typescript-eslint/camelcase */
const query = stringify({
	response_type: 'code',
	client_id: String(process.env.GOOGLE_OAUTH2_CLIENT_ID),
	redirect_uri: String(process.env.GOOGLE_OAUTH2_REDIRECT_URI),
	scope: 'openid email profile',
});
/* eslint-enable @typescript-eslint/camelcase */

const googleAuthUri = `${location}?${query}`;

export default googleAuthUri;
