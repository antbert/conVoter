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

convoter.controller('VotingMainController', ['$scope', 'Competition', function (scope, Competition) {
	var body = $('body');

	body.attr('class', 'page-inner');

	Competition.get({id: 1}, function(data) {
		scope.competition = data;
	});

}]);

convoter.controller('VoteController', ['$scope', 'Vote', function (scope) {
	scope.vote = function () {

	}
}]);

convoter.controller('LoginAsJuryFormController', ['$scope', '$http', '$location', 
	function (scope, http, location) {
		var form = $('#jury-login-form');

		scope.juryFormData = {};

		scope.submit = function () {
			http({
				method: 'POST',
				url: '/login',
				data: $.param(scope.juryFormData),
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded'
				}
			}).success(function (data) {
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
	var $elTabJury = $('.el-tab-jury'),
		$elTabViewers = $('.el-tab-viewers'),
		activeClass = 'active';
	
	scope.switchToJuryVote = function() {
		$elTabJury.addClass(activeClass);
		$elTabViewers.removeClass(activeClass);
		console.log('1');
	};

	scope.switchToViewersVote = function() {
		$elTabViewers.addClass(activeClass);
		$elTabJury.removeClass(activeClass);
		console.log('2');
	};

}]);