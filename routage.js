(function () {
	'use strict';
	angular.module('app', ['ngRoute', 'mainApp', 'ngMaterial', 'ngAnimate', 'ngAria', 'ngSanitize'])
		.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
		$routeProvider.
			when('/', {
				templateUrl: 'views/main.view.html',
				controller: 'sheetController as sheetCtrl'
			}).
			otherwise({
				redirectTo: '/'
			});

			$locationProvider.hashPrefix('');
	}]);
})();