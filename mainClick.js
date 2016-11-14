var bitcoinClicker = angular.module('bitcoinClicker', []);
bitcoinClicker.controller('bitClickController', function($scope, $http){
  $scope.numberOfBitcoins = 0;
  $scope.numberOfClicks = 0;
  $scope.bobsBitcoins = function(){ return($scope.numberOfBitcoins/2)}
  $scope.timeUntilImageAppears = 0;
  $scope.adjustTime = function(){
    $scope.timeUntilImageAppears = 1;
    if($scope.timeUntilImageAppears !== 0){
      setTimeout($scope.adjustTime, 1000);
    }
  }
  $scope.addClick = function(){
    $scope.numberOfClicks += 1;
    var bitImage = document.getElementById("click-place");
    bitImage.style.display = "none";
    setTimeout(makeImageAppear, 5000);
    document.getElementById('time-span').innerHTML = 5;
    setTimeout(decramentTime, 1000);
  }

});
function decramentTime(){
  var timeSpan = document.getElementById('time-span');
  var currTime = parseInt(timeSpan.innerHTML);
  timeSpan.innerHTML = currTime - 1;
  if(currTime - 1 > 0){
    setTimeout(decramentTime, 1000);
  }
}
function makeImageAppear(){
  var bitImage = document.getElementById("click-place");
  bitImage.style.display = "block";
}
