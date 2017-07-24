(function () {
	'use strict';
	angular.module('app', ['ngRoute', 'mainApp', 'ngMaterial', 'ngAnimate', 'ngAria', 'ngSanitize']).config(['$routeProvider', function ($routeProvider) {
		$routeProvider.
			when('/', {
				templateUrl: 'views/consultes.html',
				controller: 'consulteCtrl as consulte'
			}).
			otherwise({
				redirectTo: '/'
			});
	}]);
})();