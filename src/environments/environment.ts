export const environment = {
    production: false,
    version: require('../../package.json').version,

    apiUrl: 'https://local.api.mikeandwan.us:5011',
    authUrl: 'https://local.auth.mikeandwan.us:5001',
    filesUrl: 'http://local.files.mikeandwan.us:4300'
};

/*
 * In development mode, for easier debugging, you can ignore zone related error
 * stack frames such as `zone.run`/`zoneDelegate.invokeTask` by importing the
 * below file. Don't forget to comment it out in production mode
 * because it will have a performance impact when errors are thrown
 */
import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
