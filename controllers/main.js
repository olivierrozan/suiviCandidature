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
		vm.state;

		vm.getConsulte = getConsulte;
		vm.getConsultOnly = getConsultOnly;
		vm.showAddForm = showAddForm;
		vm.add = add;
		vm.relance = relance;
		vm.updateData = updateData;

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
				}

			});
		}

		function getConsultOnly() {
			$http.post("models/consultOnly.php", { 'etat': vm.state }).then(function (res) {
				vm.sheet = res.data;
				vm.count = res.data.length;

				for (var i = 0; i < vm.count; i++) {
					var today = moment().format("dddd DD MMMM YYYY");
					vm.sheet[i]["date_modif"] = moment(vm.sheet[i]["date_modif"]).format("dddd DD MMMM YYYY");
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
				$window.location.href = '/suiviCandidature';
			});
		}

		function updateData(ev, d) {
			$mdDialog.show({
				locals: { data: d },
				controller: dialogController,
				controllerAs: 'ctrl',
				templateUrl: './views/dialog1.template.html',
				parent: angular.element(document.body),
				targetEvent: ev,
				clickOutsideToClose: true
			})
				.then(function () {
					console.log('You said the information was .');
					
				}, function () {
					console.log('You cancelled the dialog.');
				});
		};

		function dialogController(data) {
			this.data = data;

			this.update = update;

			function update(data) {
				$http.post("models/update.php", { 'data': data }).then(function (res) {
					
					//$window.location.href = '/suiviCandidature';
				});
				$mdDialog.hide();
				console.log('UPDATED', data);
			}
		}
	}
})();