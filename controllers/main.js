(function () {
	'use strict';
	angular
		.module('mainApp', [])
		.controller('consulteCtrl', consulteController);

	consulteController.$inject = ['$scope', '$http', '$window', '$mdDialog'];
	function consulteController($scope, $http, $window, $mdDialog) {
		var vm = this;

		vm.sheet;
		vm.count;
		vm.isAddDisplayed;
		vm.label;

		vm.getConsulte = getConsulte;
		vm.showAddForm = showAddForm;
		vm.add = add;
		vm.relance = relance;
		vm.showAdvanced = showAdvanced;

		activate();

		////////////////

		function activate() {
			vm.isAddDisplayed = false;
			vm.getConsulte();
		}

		function getConsulte() {
			$http.post("models/consulte.php").then(function (res) {
				vm.sheet = res.data;
				vm.count = res.data.length;

				for (var i = 0; i < vm.count; i++) {
					var today = moment().format("dddd DD MMMM YYYY");
					vm.sheet[i]["date_modif"] = moment(vm.sheet[i]["date_modif"]).format("dddd DD MMMM YYYY");

					//console.log(moment().diff(vm.sheet[i]["date_modif"], 'days') + " jours");
				}

			});
		}

		function showAddForm() {
			vm.isAddDisplayed = !vm.isAddDisplayed;
		}

		function add() {
			$http.post("models/add.php", { 'nom': vm.label }).then(function (res) {
				console.log("ADD", res.data);
				$window.location.href = '/suiviCandidature';
			});
		}

		function relance(index) {
			$http.post("models/relance.php", { 'id': index }).then(function (res) {
				//console.log("ADD", res.data);
				$window.location.href = '/suiviCandidature';
			});
		}

		function showAdvanced(ev, data) {
			$mdDialog.show({
				//controller: DialogController,
				templateUrl: './views/dialog1.template.html',
				parent: angular.element(document.body),
				targetEvent: ev,
				clickOutsideToClose: true
			})
				.then(function (answer) {
					$scope.status = 'You said the information was "' + answer + '".';
				}, function () {
					$scope.status = 'You cancelled the dialog.';
				});
		};
	}
})();