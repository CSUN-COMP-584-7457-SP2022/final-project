// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyD36DU4sUoPh3si2nd4oUYUzmZgbIcOQcM',
    authDomain: 'the-diabetic-compass.firebaseapp.com',
    projectId: 'the-diabetic-compass',
    storageBucket: 'the-diabetic-compass.appspot.com',
    messagingSenderId: '420178427652',
    appId: '1:420178427652:web:79c00aa00d3e7231c0da51',
    measurementId: 'G-S06F48XSPD',
  },
  api: {
    url: 'http://localhost:3000',
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
