convoter
	.factory('Jury', ['$resource', 'BASE_URLS', function (resources, baseUrls) {
		return resources(baseUrls.api + '/jury');
	}])

	.factory('Competition', ['$resource', 'BASE_URLS', function (resources, baseUrls) {
		return resources(baseUrls.api + '/competition/:id', {id: '@id'});
	}])

	.factory('Vote', ['$resource', 'BASE_URLS', function (resources) {

	}]);