(function() {
  var app = angular.module('tutorialWebApp', [
    'ngRoute',
      'ngStorage'
  ]);

  /**
   * Configure the Routes
   */
  app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider
    // Home
        .when("/", {templateUrl: "partials/home.html", controller: "PageCtrl"})
        // Pages
        .when("/services", {templateUrl: "partials/services/services.html", controller: "ServicesCtrl"})
        // else 404
        .otherwise("/404", {templateUrl: "partials/404.html", controller: "PageCtrl"});
  }]);
})();
