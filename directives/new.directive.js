(function () {
    'use strict';

    angular
        .module('mainApp')
        .directive('new', Directive);

    Directive.$inject = [];
    function Directive() {
        // Usage:
        //
        // Creates:
        //
        var directive = {
            bindToController: true,
            controller: ControllerController,
            controllerAs: 'vm',
            link: link,
            restrict: 'A',
            scope: {
            }
        };
        return directive;

        function link(scope, element, attrs) {

            
        }
    }
    /* @ngInject */
    function ControllerController() {

    }
})();