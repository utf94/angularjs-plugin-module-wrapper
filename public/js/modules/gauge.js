var biGauge = angular.module('gaugeChart', []);

biGauge.chart = function (type, $window) {
  return {
    restrict: 'E',
    scope: {
      data: '=',
      options: '=',
      value: '=',
      id: '@',
      width: '=',
      height: '=',
      resize: '=',
      chart: '@',
      segments: '@',
      responsive: '=',
      tooltip: '=',
      legend: '='
    },
    template: '<canvas width="350" height="280"/><div class="ng-binding" style="left: 13%;position: relative;top: -90px;"><h1 style="position: relative;left: -0.7%;"><b>{{this.data.title}}</b></h1>{{this.data.subTitle}} <i class="fa fa-bolt text-navy"></i></div>',
    link: function ($scope, $elem) {

      var o = {
        angle: 0.15, // The span of the gauge arc
        lineWidth: 0.16, // The line thickness
        radiusScale: 1.0, // Relative radius
        pointer: {
          length: 0.6, // // Relative to gauge radius
          strokeWidth: 0.10, // The thickness
          color: '#000000' // Fill color
        },
        limitMax: false, // If false, max value increases automatically if value > maxValue
        limitMin: false, // If true, the min value of the gauge will be fixed
        colorStart: '#3fef23', // Colors
        colorStop: '#d5f02b', // just experiment with them
        strokeColor: '#E0E0E0', // to see which ones work best for you
        generateGradient: true,
        highDpiSupport: true, // High resolution support
        animationSpeed: 32,
        staticLabels: {
          font: '10px sans-serif', // Specifies font
          labels: [100, 130, 150, 220.1, 260, 300], // Print labels at these values
          color: '#000000', // Optional: Label text color
          fractionDigits: 0 // Optional: Numerical precision. 0=round off.
        }
      };
      $scope.options = $scope.options || o;


      var canvas = angular.element($elem).find('canvas');
      var div = angular.element($elem).find('div');
      var canvasWidth = canvas.width();
      var gauge = new Donut(canvas[0]).setOptions($scope.options); // create sexy gauge!
      var h1 = angular.element($elem).find('div > h1');
      //Setters
      gauge.maxValue = $scope.data.maxValue; // set max gauge value
      gauge.setMinValue($scope.data.minValue); // Prefer setter over gauge.minValue = 0
      gauge.animationSpeed = $scope.options.animationSpeed; // set animation speed (32 is default value)
      gauge.set($scope.value); // set actual value


      //Resizers
      div.css({
        left: (canvasWidth / 2) - (canvas.position().left / 2)
      });
      h1.css({
        left: '-2.7%'
      });

      console.log(gauge);
      angular.element($window).bind('resize', function () {

        $scope.width = $window.innerWidth;
        div.css({
          left: (canvasWidth / 2) - (canvas.position().left / 2)
        });
        h1.css({
          left: canvas.position().left > 35 ? '-2.7%' : '-0.7%'
        });
        // manuall $digest required as resize event
        // is outside of angular
        $scope.$digest();
      });

      //Watchers will wait for APi response
      //

      $scope.$watch('data', function (newVal, oldVal) {
        gauge.maxValue = $scope.data.maxValue; // set max gauge value
        gauge.setMinValue($scope.data.minValue); // Prefer setter over gauge.minValue = 0
        gauge.set($scope.data.value); // set actual value

      }, false);



    }
  };
};


/* Aliases for various chart types */
biGauge.directive('gauge', ['$window', function ($window) {
  return biGauge.chart('gauge', $window);
}]);