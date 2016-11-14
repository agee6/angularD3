
  var dataDisplay = angular.module('dataDisplay', ['nvd3ChartDirectives']);
    dataDisplay.controller('dataController', function($scope, $http){
      // calling the api, grabbing the value for USD, appending it to the dom

      $scope.allData=allData;
      $scope.currentSM='facebook';
      $scope.notShowing='twitter';
      $scope.formData = {facebook: "facebook", twitter: "twitter"};
      $scope.formData = 'facebook'; 
      $scope.changeSM = function(){
        if($scope.currentSM === 'facebook'){
          $scope.currentSM = 'twitter';
          $scope.notShowing = 'facebook';
        }else{
          $scope.currentSM = 'facebook';
          $scope.notShowing = 'twitter';
        }
        $scope.updateDisplay();
      };
      $scope.graphOptions = ['bar', 'donut'];
      $scope.currentGraph = 'bar';
      $scope.changeGraphs = function(){
        d3.selectAll("svg > *").remove();
        $scope.updateDisplay();
      }

      $scope.updateDisplay = function(){

        if($scope.currentGraph === 'bar'){
          makeGraph($scope.currentData, $scope.currentSM);
        }else{
          makeDonutGraph($scope.currentData, $scope.currentSM);
        }

      };
      $scope.currentData = "Boy_Bands";
      $scope.updateDisplay();

    });


//Each bar represents a single discrete quantity.

function createData(dataName, currSM){
  var values = [];
  var dataObject = allData[dataName][currSM];
  var keys = Object.keys(dataObject);
  for (var i = 0; i < keys.length; i++) {
    var individualDataObject = {
      "label": keys[i],
      "value": dataObject[keys[i]]
    };
    values.push(individualDataObject);
  }
  return [
    {
      key: dataName,
      values: values
    }
  ];
}
function createDonutData(dataName, currSM){
  var values = [];
  var dataObject = allData[dataName][currSM];
  var keys = Object.keys(dataObject);
  for (var i = 0; i < keys.length; i++) {
    var individualDataObject = {
      "label": keys[i],
      "value": dataObject[keys[i]]
    };
    values.push(individualDataObject);
  }
  return values;
}


function makeGraph(dataName, socialMedia){
  nv.addGraph(function() {
    var chart = nv.models.discreteBarChart()
    .x(function(d) { return d.label })    //Specify the data accessors.
    .y(function(d) { return d.value })
    .staggerLabels(true)    //Too many bars and not enough room? Try staggering labels.
    .tooltips(false)        //Don't show tooltips
    .showValues(true)       //...instead, show the bar value right on top of each bar.
    ;

    d3.select('#chart svg')
    .datum(createData(dataName, socialMedia))
    .call(chart);

    nv.utils.windowResize(chart.update);

    return chart;
  });
}

function makeDonutGraph(dataName, socialMedia){
  nv.addGraph(function() {
  var chart = nv.models.pieChart()
      .x(function(d) { return d.label })
      .y(function(d) { return d.value })
      .showLabels(true)     //Display pie labels
      .labelThreshold(.05)  //Configure the minimum slice size for labels to show up
      .labelType("percent") //Configure what type of data to show in the label. Can be "key", "value" or "percent"
      .donut(true)          //Turn on Donut mode. Makes pie chart look tasty!
      .donutRatio(0.35)     //Configure how big you want the donut hole size to be.
      ;

    d3.select("#chart svg")
        .datum(createDonutData(dataName, socialMedia))
        .transition().duration(350)
        .call(chart);

  return chart;
});

}
