(function () {
	'use strict';
	angular
		.module('mainApp', [])
		.controller('sheetController', sheetController);

	sheetController.$inject = ['$scope', '$http', '$window', '$mdDialog', 'mainService'];
	function sheetController($scope, $http, $window, $mdDialog, mainService) {
		var vm = this;

		// Attributes
		vm.sheet;
		vm.count;
		vm.isAddDisplayed;
		vm.state;
		vm.addApplication = {};
		vm.regex = {};

		// Methods
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

			vm.regex = {
				"label": "^[a-zA-Z0-9-.& ]+$",
				"tel": "^0[1-9]([.]?[0-9]{2}){4}$"
			};
		}

		function getConsulte() {
			$http.post("models/consulte.php").then(function (res) {
				handleSheet(res);
			});
		}

		function getConsultOnly() {
			$http.post("models/consultOnly.php", { 'etat': vm.state }).then(function (res) {
				handleSheet(res);
			});
		}

		function handleSheet(res) {
			vm.sheet = res.data;
			vm.count = res.data.length;

			mainService.delay(vm.sheet);

			for (var i = 0; i < vm.count; i++) {
				vm.sheet[i]["date_modif"] = moment(vm.sheet[i]["date_modif"]).format("dddd DD MMMM YYYY");
			}
		}

		function showAddForm() {
			vm.isAddDisplayed = !vm.isAddDisplayed;
		}

		function add() {
			vm.addApplication.etat = "En attente";
			vm.addApplication.date_modif = moment().format("dddd DD MMMM YYYY");

			$http.post("models/add.php", { 'data': vm.addApplication }).then(function (res) {
				
				if (res.data === '0') {
					vm.addApplication.reapply = false;
					vm.addApplication.delai = 10;
					vm.sheet.unshift(vm.addApplication);

					console.log("OK added", vm.sheet);
				} else {
					console.log("duplicate");
				}
				
			});

			
		}

		function relance(indexBDD, indexJSON) {
			$http.post("models/relance.php", { 'id': indexBDD }).then(function (res) {
				vm.sheet[indexJSON].etat = "Relancé";
				vm.sheet[indexJSON].date_modif = moment().format("dddd DD MMMM YYYY");
			});

			vm.sheet[indexJSON].reapply = false;
			vm.sheet[indexJSON]["delai"] = 10;
		}

		function updateData(ev, d, indexJSON) {
			$mdDialog.show({
				locals: { data: d, index: indexJSON, regex: vm.regex },
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

		function dialogController(data, index, regex) {
			this.data = data;
			this.update = update;
			this.regex = regex;

			function update(data) {
				$http.post("models/update.php", { 'data': data }).then(function (res) {
					vm.sheet[index].date_modif = moment().format("dddd DD MMMM YYYY");
				});

				$mdDialog.hide();
			}
		}
	}
})();