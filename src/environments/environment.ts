// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: "AIzaSyC4LmgDOsU4B4g2A8vpRNihXl3Fui5q3OY",
    authDomain: "task-manager-c6ef6.firebaseapp.com",
    databaseURL: "https://task-manager-c6ef6.firebaseio.com",
    projectId: "task-manager-c6ef6",
    storageBucket: "task-manager-c6ef6.appspot.com",
    messagingSenderId: "160746773859"
  }
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
