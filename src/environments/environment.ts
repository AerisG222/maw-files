export const environment = {
    production: false,
    version: require('../../package.json').version,

    // local dev
    apiUrl: 'https://apidev.mikeandwan.us:5011',
    authUrl: 'https://authdev.mikeandwan.us:5001',
    filesUrl: 'http://filesdev.mikeandwan.us:4200'

    // container dev
    // apiUrl: 'https://apidev.mikeandwan.us',
    // authUrl: 'https://authdev.mikeandwan.us',
    // filesUrl: 'http://filesdev.mikeandwan.us'
};

/*
 * In development mode, for easier debugging, you can ignore zone related error
 * stack frames such as `zone.run`/`zoneDelegate.invokeTask` by importing the
 * below file. Don't forget to comment it out in production mode
 * because it will have a performance impact when errors are thrown
 */
import 'zone.js/dist/zone-error';  // Included with Angular CLI.
