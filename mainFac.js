var app = angular.module('myApp', [])

app.controller('myController', function($scope, calculateService) {
  $scope.quantity = 100;
  $scope.calculate = function(number) {
    return calculateService.calculate(number);
  }
});

app.factory('calculateService', function(){
  return {
    calculate: function(number){
      return number * 10
    }
 }
});
