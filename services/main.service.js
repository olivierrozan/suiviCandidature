(function () {
    'use strict';

    angular
        .module('mainApp')
        .service('mainService', mainService);

    mainService.$inject = ["$http"];
    function mainService($http) {
        
        this.delay = delay;

        ////////////////

        function delay(sheet) {
			var today = moment();
			
			for (var i = 0; i < sheet.length; i++) {
				sheet[i]["date_modif_init"] = moment(sheet[i]["updatedAt"]);
				sheet[i]["delai"] = today.diff(sheet[i]["date_modif_init"], "days")

				if (sheet[i]["delai"] < 10) {
					sheet[i]["reapply"] = false;
					sheet[i]["delai"] = 10 - sheet[i]["delai"];
				} else {
					sheet[i]["reapply"] = true;
				}
			}
		}
    }
})();