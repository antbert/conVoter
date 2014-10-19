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
       var wsData = JSON.parse(event.data);
       console.log(wsData);

       // jury voting
       if (wsData.juryId) {
	       setTimeout(function() {
	       		var $project = $('.projects-jury .project[data-id=' + wsData.projectId + ']'),
	       			onePointHeight = 184 / $('.jury-member').length / 3;
	       			$voteVariants = $project.find('.vote-variants'),
	       			$batteryProgress = $project.find('.battery-progress'),
	       			$vote = $('<div class="variant variant-choosed" style="background-color: ' + wsData.color + ';">' + ((wsData.mark > 0) ? '+' + wsData.mark : '0') + '</div>');

				$voteVariants.append($vote);

				setTimeout(function() {
					$vote.addClass('hide');

					var $progress = $('<div class="progress" style="background-color: ' + wsData.color + '; box-shadow: 0 0 15px '+ wsData.color +'" data-points="' + wsData.mark + '"></div>');

					$batteryProgress.append($progress);
					
					$progress.animate({
						height: wsData.mark * onePointHeight
					});

					updateTotalProjectPoints(wsData.projectId, false);
				}, 200);
			}, 400);
	    } else {
	    // anonymous voting
	    	var $project = $('.projects-anonymous .project[data-id=' + wsData.projectId + ']'),
       			onePointHeight = 184 / $('.jury-member').length / 3;
       			$voteVariants = $project.find('.vote-variants'),
       			$batteryProgress = $project.find('.battery-progress'),
       			$vote = $('<div class="variant variant-choosed" style="background-color: ' + wsData.color + ';">' + ((wsData.mark > 0) ? '+' + wsData.mark : '0') + '</div>');

			$voteVariants.append($vote);

			setTimeout(function() {
				$vote.addClass('hide');

				updateTotalProjectPoints(wsData.projectId, true);
			}, 200);
	    }
    };

    var updateTotalProjectPoints = function(projectId, isAnon) {
    	var result = 0;
    	console.log(isAnon);
    	if (isAnon) {

    		var $project = $('.projects-anonymous .project[data-id=' + projectId + ']');
    		// console.log($project);
    		// $project.find('.battery-progress .progress').each(function() {
    		// 	result += parseInt($(this).attr('data-points'));
    		// });

    		$project.find('.project-points').html(parseInt($project.find('.project-points').text()) + 1);

    		calcAnonHeight();


    	} else {

    		var $project = $('.projects-jury .project[data-id=' + projectId + ']');
    		console.log($project);
    		$project.find('.battery-progress .progress').each(function() {
    			result += parseInt($(this).attr('data-points'));
    		});

    		$project.find('.project-points').text(result);

    	}

    }

    var calcAnonHeight = function() {
    	var $projects = $('.projects-anonymous .project'),
    		projIDs = [];

    	console.log($projects);

    	$projects.each(function() {
    		projIDs.push(parseInt($(this).find('.project-points').text()));
    	});

    	var maxVal = Math.max.apply(Math, projIDs),
    		onePercent = maxVal / 100,
    		onePercentPixel = 183 / 100;

    	$projects.each(function() {
    		var projPoints = parseInt($(this).find('.project-points').text());

    		console.log(projPoints, '/', maxVal, '*', onePercentPixel)

    		$(this).find('.progress').animate({
    			height: projPoints / maxVal * 100 * onePercentPixel
    		});
    	});
    }

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

		scope.isJury = scope.competition.userInfo ? true : false;
		
		setTimeout(function() {
			calcAnonHeight();	
		}, 300)
	});

	var prepareCompetitionData = function(data) {
		console.log(data);
		for (var i in data.currentCompetition.projects) {
			data.currentCompetition.projects[i].showControls = showControls(data.currentCompetition.projects[i].ratings, ((data && data.userInfo) ? data.userInfo.id : null));
			data.currentCompetition.projects[i].totalJury = updateTotalProjectPointsFromData(data.currentCompetition.projects[i]);
			// data.currentCompetition.vouters[i].colHeight = 
		}

		return data;

	}

	var showControls = function(ratings, userId) {
		var result = true;

		if (!userId) return false;
		
		for (var i in ratings) {
			if (ratings[i].jury.id == userId) {
				result = false;
			}
		}

		return result;
	}

	var updateTotalProjectPointsFromData = function(project) {
		var result = 0;

		for (var i in project.ratings) {
			if (project.ratings[i].mark) {
				result += project.ratings[i].mark;
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
						$voteBtns = $btn.closest('.vote-variants').find('.variant-zooming');
					
					console.log('myColor', myColor);
					
					$voteBtns.fadeOut(300);

					console.log(data);
				}
			}
		});
	};

	scope.anonymousVote = function (projectId, competitionId) {
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
				if ('success' in data) {
					$.cookie('vote-' + competitionId, true);
					$('.btn-anon-vote').fadeOut(200);
					setTimeout(function() {
						$('.btn-anon-vote').remove();
					}, 200);
				}
			}
		});
	};

	scope.isAnonymousVoteAvailable = function (competitionId) {
		console.log($.cookie());
		if (('vote-' + competitionId) in $.cookie()) {
			return false;
		}

		return true;
	}
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
		var errorOutput = $('#error-output');

		scope.juryFormData = {};

		scope.submit = function () {
			errorOutput.hide();			
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
				} else {
					$('form[name=loginForm] input[name=password]').val('');
					errorOutput.show();
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