var convoter = angular.module('convoter');

convoter
	.factory('Jury', ['$resources', 'BASE_URLS', function (resources, baseUrls) {
		return resources(baseUrls.api + '/jury');
	}])

	.factory('Project', ['$resources', 'BASE_URLS', function (resources) {
		return resources(baseUrls.api + '/project');
	}])