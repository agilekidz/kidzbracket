import { stringify } from 'query-string';

const location = 'https://www.facebook.com/v6.0/dialog/oauth';
/* eslint-disable @typescript-eslint/camelcase */
const query = stringify({
	redirect_uri: String(process.env.FACEBOOK_OAUTH2_REDIRECT_URI),
	client_id: String(process.env.FACEBOOK_OAUTH2_CLIENT_ID),
	scope: 'email public_profile',
});
/* eslint-enable @typescript-eslint/camelcase */

const facebookAuthUri = `${location}?${query}`;

export default facebookAuthUri;
