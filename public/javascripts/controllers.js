(function () {
	var convoter = angular.module('convoter');

	convoter.controller('GuestController', ['$scope', 
		function (scope) {
			var startBox = $('.start-box');

			scope.close = function () {
				startBox.removeClass('login');
			};

			scope.loginAsJury = function () {
				startBox.addClass('login');
			};
		}
	]);

	convoter.controller('LoginAsJuryFormController', ['$scope', '$http', '$location', 
		function (scope, http, location) {
			var form = $('#jury-login-form');

			scope.formData = {};

			scope.submit = function () {
				http({
					method: 'POST',
					url: form.attr('action'),
					data: $.param(scope.formData),
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded'
					}
				}).success(function () {
					
				});

				location.path('/');
			};
		}
	]);

	convoter.controller('FindContestFormController', ['$scope', function (scope) {

	}]);
})();