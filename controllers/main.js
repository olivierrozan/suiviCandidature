(function () {
	'use strict';
	angular
		.module('mainApp', [])
		.controller('consulteCtrl', consulteController);

	consulteController.$inject = ['$scope', '$http'];
	function consulteController($scope, $http) {
		var vm = this;

		vm.sheet;
		vm.count;
		vm.isAddDisplayed;

		vm.getConsulte = getConsulte;
		vm.showAddForm = showAddForm;
		vm.add = add;

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

				for (var i = 0; i <  vm.count; i++) {
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
			console.log("SUBMIT");

			$http.post("models/add.php").then(function (res) {
				vm.sheet = res.data;
				vm.count = res.data.length;

				for (var i = 0; i <  vm.count; i++) {
					var today = moment().format("dddd DD MMMM YYYY");
					vm.sheet[i]["date_modif"] = moment(vm.sheet[i]["date_modif"]).format("dddd DD MMMM YYYY");

					console.log(moment().diff(vm.sheet[i]["date_modif"], 'days') + " jours");
				}
				
			});
		}
	}
})();