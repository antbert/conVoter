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
		locationParts = location.pathname.split('/'),
		currentCompetitionId = locationParts[locationParts.length - 1],
		$loading = $('#loading'),
		ws = new WebSocket(baseUrl.ws);

	body.attr('class', 'page-inner');

	$loading.show();

	ws.onmessage = function(event) {
       console.log(event);
    };

    scope.$on('$destroy', function() {
        ws.close();
    });

    window.onbeforeunload = function() {
	    ws.close();
	};

	Competition.get({id: currentCompetitionId}, function(data) {
		console.log(data);
		scope.competition = prepareCompetitionData(data);
		scope.baseUrl = baseUrl;
		$loading.hide();
	});

	var prepareCompetitionData = function(data) {

		for (var i in data.currentCompetition.projects) {
			data.currentCompetition.projects[i].showControls = showControls(data.currentCompetition.projects[i].ratings, data.userInfo.id);
			// data.currentCompetition.vouters[i].colHeight = 
		}

		return data;

	}

	var showControls = function(ratings, userId) {
		var result = true;
		
		for (var i in ratings) {
			if (ratings[i].jury.id == userId) {
				result = false;
			}
		}

		return result;
	}

}]);

convoter.controller('VoteController', ['$scope', 'BASE_URLS', function (scope, urls) {
	scope.juryVote = function (event, projectId, points) {
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
				if ('success' in data) {
					console.log(event);
					var $btn = $(event.target),
						myColor = $btn.css('background-color');
						$voteBtns = $btn.closest('.vote-variants').find('.variant-zooming'),
						$voteVariants = $btn.closest('.vote-variants'),
						$batteryProgress = $btn.closest('.project').find('.battery-progress'),
						onePointHeight = 184 / $('.jury-member').length / 3;
					
					console.log('myColor', myColor);
					
					$voteBtns.fadeOut(300);

					setTimeout(function() {
						var $vote = $btn.clone().removeClass('variant-zooming').addClass('variant-choosed').show();

						$voteVariants.append($vote);

						setTimeout(function() {
							$vote.addClass('hide');

							var $progress = $('<div class="progress" style="background-color: ' + myColor + '"></div>');

							$batteryProgress.append($progress);
							
							$progress.animate({
								height: $btn.attr('data-points') * onePointHeight
							});
						}, 200);
					}, 400);

					console.log(data);
				}
			}
		});
	};

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
}]);

convoter.controller('ChooseCompetitionController', ['$scope', 'MyCompetitions', 'BASE_URLS', function (scope, MyCompetitions, baseUrl) {
	var body = $('body'),
		$loading = $('#loading');

	body.attr('class', 'page-inner page-empty');

	$loading.show();
	MyCompetitions.get(function(data) {
		console.log(data);
		scope.competition = data;
		scope.baseUrl = baseUrl;
		$loading.hide();
	});

}]);	

convoter.controller('LoginAsJuryFormController', ['$scope', '$http', '$location', 'BASE_URLS',
	function (scope, http, location, baseUrl) {
		var $loading = $('#loading');

		scope.juryFormData = {};

		scope.submit = function () {
			$loading.show();
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
				$loading.hide();
			})
			.error(function() {
				alert('Server connection error!');
				$loading.hide();
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