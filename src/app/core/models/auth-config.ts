export class AuthConfig {
    constructor(
        public authority: string,
        public clientId: string,
        public postLogoutRedirectUri: string,
        public redirectUri: string,
        public silentRedirectUri: string,
        public loadUserInfo = true,
        public automaticSilentRenew = true,
        public filterProtocolClaims = true,
        public responseType = 'code',
        public scope = 'openid profile maw_api role') {

    }
}
