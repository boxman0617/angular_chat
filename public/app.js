(function() {
	var app = angular.module('AChat', []);

	app.controller('ChatController', ['$scope', '$interval', '$http', function($scope, $interval, $http) {
		$scope.messages = [];

		$scope.nickname = '';
		$scope.input_message = '';

		$scope.ok_to_fetch = true;
		$scope.interval_promise = null;

		$scope.sendMessage = function() {
			$http.post('ajax/post-message.php', {'msg': $scope.input_message, 'from': $scope.nickname}).
				success(function(data, status, headers, config) {
					$scope.input_message = '';
				}).
				error(function(data, status, headers, config) {
					alert('Something is wrong! Oh no!');
				});
		};

		$scope.interval_promise = $interval(function() {
			$http.get('ajax/fetch-messages.php').
				success(function(data, status, headers, config) {
					$scope.messages = data;
				}).
				error(function(data, status, headers, config) {
					alert('Something is wrong! Oh no!');
					$scope.ok_to_fetch = false;
				});
		}, 1000);

		$scope.$watch('ok_to_fetch', function(newValue, oldValue) {
			if(newValue === false)
				$interval.cancel($scope.interval_promise);
		});

	}]);

	app.directive('ngEnter', function () {
	    return function (scope, element, attrs) {
	        element.bind("keydown keypress", function (event) {
	            if(event.which === 13) {
	                scope.$apply(function (){
	                    scope.$eval(attrs.ngEnter);
	                });

	                event.preventDefault();
	            }
	        });
	    };
	});
})();

$(function() {
	$('#namemodal').modal();
});