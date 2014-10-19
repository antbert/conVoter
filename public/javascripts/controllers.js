convoter.controller('GuestController', ['$scope', 
	function (scope) {
		var startBox = $('.start-box'),
			body = $('body');

		body.attr('class', 'page-guest');

		scope.close = function () {
			startBox.removeClass('login');
		};

		scope.loginAsJury = function () {
			startBox.addClass('login');
		};
	}
]);

convoter.controller('VotingMainController', ['$scope', 'Competition', 'BASE_URLS', function (scope, Competition, baseUrl) {
	var body = $('body');

	body.attr('class', 'page-inner');

	Competition.get({id: 1}, function(data) {
		console.log(data);
		scope.competition = data;
		scope.baseUrl = baseUrl;
	});

}]);

convoter.controller('VoteController', ['$scope', 'BASE_URLS', function (scope, urls) {
	scope.anonymousVote = function (projectId) {
		$.ajax({
			url: urls.api + '/addParticipantVoute',
			method: 'POST',
			data: {
				projectId: projectId
			},
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			success: function (data) {
				console.log(data);
			}
		});
	};

	scope.juryVote = function (projectId, points) {
		$.ajax({
			url: urls.api + '/addJuryVoute',
			method: 'POST',
			data: {
				projectId: projectId,
				mark: points
			},
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			success: function (data) {
				console.log(data);
			}
		});
	};
}]);

convoter.controller('LoginAsJuryFormController', ['$scope', '$http', '$location', 'BASE_URLS',
	function (scope, http, location, baseUrl) {
		var form = $('#jury-login-form');

		scope.juryFormData = {};

		scope.submit = function () {
			http({
				method: 'POST',
				url: baseUrl.api + '/login',
				data: $.param(scope.juryFormData),
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded'
				}
			}).success(function (data, asdgf, header) {
				if (!('error' in data)) {
					location.path('/voting');
				}
			});
		};
	}
]);

convoter.controller('FindContestFormController', ['$scope', function (scope) {

}]);

convoter.controller('JuryController', ['$scope', function (scope, Jury) {
	scope.jury = [
		{
			imageSrc: 'http://placehold.it/60x60',
			name: 'Firstname Lastname'
		},
		{
			imageSrc: 'http://placehold.it/60x60',
			name: 'Firstname Lastname'
		},
		{
			imageSrc: 'http://placehold.it/60x60',
			name: 'Firstname Lastname'
		}
	]
}]);

convoter.controller('ProjectController', ['$scope', function (scope) {
	scope.projects = [
		{
			name: 'project',
			teamName: 'someteam'
		},
		{
			name: 'project',
			teamName: 'soprojectIdmeteam'
		},
		{
			name: 'project',
			teamName: 'someteam'
		}
	]
}]);

convoter.controller('SwitchTabController', ['$scope', function (scope) {
	var $elTabJury = $('.el-tab-jury'),
		$elTabViewers = $('.el-tab-viewers'),
		activeClass = 'active';
	
	scope.switchToJuryVote = function() {
		$elTabJury.addClass(activeClass);
		$elTabViewers.removeClass(activeClass);
	};

	scope.switchToViewersVote = function() {
		$elTabViewers.addClass(activeClass);
		$elTabJury.removeClass(activeClass);
	};

}]);