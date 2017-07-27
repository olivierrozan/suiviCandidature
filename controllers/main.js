(function () {
	'use strict';
	angular
		.module('mainApp', [])
		.controller('consulteCtrl', consulteController);

	consulteController.$inject = ['$scope', '$http', '$window', '$mdDialog'];
	function consulteController($scope, $http, $window, $mdDialog) {
		var vm = this;

		// Attributes
		vm.sheet;
		vm.count;
		vm.isAddDisplayed;
		vm.label;
		vm.state;
		vm.addApplication = {};

		// Methods
		vm.getConsulte = getConsulte;
		vm.getConsultOnly = getConsultOnly;
		vm.showAddForm = showAddForm;
		vm.add = add;
		vm.relance = relance;
		vm.updateData = updateData;
		vm

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
					vm.sheet[i]["date_modif"] = moment(vm.sheet[i]["date_modif"]).format("dddd DD MMMM YYYY");
				}

			});
		}

		function getConsultOnly() {
			$http.post("models/consultOnly.php", { 'etat': vm.state }).then(function (res) {
				vm.sheet = res.data;
				vm.count = res.data.length;

				for (var i = 0; i < vm.count; i++) {
					vm.sheet[i]["date_modif"] = moment(vm.sheet[i]["date_modif"]).format("dddd DD MMMM YYYY");
				}
			});
		}

		function showAddForm() {
			vm.isAddDisplayed = !vm.isAddDisplayed;
		}

		function add() {
			vm.addApplication.etat = "En attente";
			vm.addApplication.date_modif = moment().format("dddd DD MMMM YYYY");
			
			$http.post("models/add.php", { 'data': vm.addApplication }).then(function (res) {
				//$window.location.href = '/suiviCandidature';
				vm.sheet.unshift(vm.addApplication);

				console.log(vm.sheet);
			});
		}

		function relance(indexBDD, indexJSON) {
			$http.post("models/relance.php", { 'id': indexBDD }).then(function (res) {
				vm.sheet[indexJSON].etat = "Relancé";
				vm.sheet[indexJSON].date_modif = moment().format("dddd DD MMMM YYYY");
			});
		}

		function updateData(ev, d, indexJSON) {
			$mdDialog.show({
				locals: { data: d, index: indexJSON },
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

		function dialogController(data, index) {
			this.data = data;

			this.update = update;

			function update(data) {
				$http.post("models/update.php", { 'data': data }).then(function (res) {
					vm.sheet[index].date_modif = moment().format("dddd DD MMMM YYYY");
				});
				$mdDialog.hide();
			}
		}
	}
})();