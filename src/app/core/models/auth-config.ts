export class AuthConfig {
    constructor(
        public authority: string,
        public client_id: string,
        public post_logout_redirect_uri: string,
        public redirect_uri: string,
        public silent_redirect_uri: string,
        public loadUserInfo = true,
        public automaticSilentRenew = true,
        public filterProtocolClaims = true,
        public response_type = 'code',
        public scope = 'openid profile maw_api role') {

    }
}
