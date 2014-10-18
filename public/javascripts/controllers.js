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
	var body = $('body'),
		locationParts = location.pathname.split(''),
		currentCompetitionId = locationParts[locationParts.length - 1];

	body.attr('class', 'page-inner');

	Competition.get({id: currentCompetitionId}, function(data) {
		console.log(data);
		scope.competition = data;
		scope.baseUrl = baseUrl;
	});

}]);

convoter.controller('ChooseCompetitionController', ['$scope', function (scope) {
	var body = $('body');
	body.attr('class', 'page-inner page-empty');
}]);	

convoter.controller('VoteController', ['$scope', 'Vote', function (scope) {
	scope.vote = function () {

	}
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
					location.path('start');
				}
			});
		};
	}
]);

convoter.controller('FindContestFormController', ['$scope','$location', 'BASE_URLS', function (scope, location, baseUrl) {

	scope.formData = {};

	scope.find = function() {
		if (scope.formData.hasOwnProperty('id')) {
			location.path('voting/' + scope.formData.id);
		}
		return;
	}

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
		},
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
			teamName: 'someteam'
		},
		{
			name: 'project',
			teamName: 'someteam'
		}
	]
}]);

convoter.controller('SwitchTabController', ['$scope', function (scope) {
	var $elTab = $('.el-tab'),
		$elTabJury = $('.el-tab-jury'),
		$elTabAbout = $('.el-tab-about'),
		$elTabViewers = $('.el-tab-viewers'),
		activeClass = 'active';
	
	scope.switchToJuryVote = function() {
		$elTab.removeClass(activeClass);
		$elTabJury.addClass(activeClass);
	};	

	scope.switchToAbout = function() {
		$elTab.removeClass(activeClass);
		$elTabAbout.addClass(activeClass);
	};

	scope.switchToViewersVote = function() {
		$elTab.removeClass(activeClass);
		$elTabViewers.addClass(activeClass);
	};

}]);