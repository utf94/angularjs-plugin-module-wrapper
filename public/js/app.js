/**
 * Abeer
 *
 */
(function () {
  angular.module('inspinia', [
    'ui.router',
    'ui.router.stateHelper', // Routing
    'oc.lazyLoad', // ocLazyLoad
    'ui.bootstrap', // Ui Bootstrap
    'pascalprecht.translate', // Angular Translate
    'ngIdle', // Idle timer
    'ngSanitize' // ngSanitize
  ]);
})();

// Other libraries are loaded dynamically in the config.js file using the library ocLazyLoad