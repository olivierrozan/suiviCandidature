(function () {
	'use strict';
	angular.module('app', ['ngRoute', 'mainApp', 'ngMaterial', 'ngAnimate', 'ngAria', 'ngSanitize']).config(['$routeProvider', function ($routeProvider) {
		$routeProvider.
			when('/', {
				templateUrl: 'views/main.view.html',
				controller: 'sheetController as sheetCtrl'
			}).
			otherwise({
				redirectTo: '/'
			});
	}]);
})();