// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,

   // url para API PELICULAS
   urlMockPelis: 'https://61d4aafe8df81200178a8def.mockapi.io/movies',

   // url para API USUARIOS
   urlLocalLogin :'http://localhost:3000/api/login',      //urlUsersAPI: 'https://61bcb895d8542f00178249b1.mockapi.io/api/persons',

   // url para API del CARRITO
   urlLocalCart :'http://localhost:3000/api/cart',

  // Url inicial para poder realizar carga de los poster que provienen  la API de movies
   urlPathImage: 'https://image.tmdb.org/t/p/w500'

};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
