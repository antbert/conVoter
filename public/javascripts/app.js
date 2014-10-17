(function () {
	var convoter = angular.module('convoter', [
			'ngRoute',
			'ngResource'
		]);

	convoter.config(['$routeProvider', function (routeProvider) {

	}]);

	convoter.run(['$resource', function (resource) {
		
	}]);

	convoter.controller('HelloController', ['$scope', function (scope) {
		scope.message = 'hi!';
	}]);
	
	convoter
		.constant('colorConfig', {
			colors: []
		})
		.constant('I18N.MESSAGES', {
			'logo'
			'action.vote': 'vote'
		});

})();