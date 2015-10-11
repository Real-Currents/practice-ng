/* Adapted from "AngularJS Web Application Development Cookbook"
 * by Matt Frisbie (Packt Publishing, 2015)
 */

angular.module('myApp', [])
	.controller('HandleCtrl', [
		'$scope', '$http',
		function( $scope, $http ) {
			$scope.handel = '';
			$scope.$watch(
				'handle',
				function( value ) {
					if( value.length < 6 ) {
						$scope.valid = false;
					} else {
						$http({
							method: 'GET',
							url: '/api/handle/'+ value
						}).success(function( data, status ) {
							if(
								status == 200 &&
								data.handle == $scope.handle &&
								data.id === null
							) {
								$scope.valid = true;
							} else {
								$scope.valid = false;
							}
						})
					}
				}
			);
		}
	]);
