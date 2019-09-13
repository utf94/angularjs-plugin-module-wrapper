var angles = angular.module('angles', []);

angles.chart = function (type) {
  return {
    restrict: 'A',
    scope: {
      data: '=',
      options: '=',
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
    link: function ($scope, $elem) {
      var ctx = $elem[0].getContext('2d');
      var autosize = false;

      $scope.$watch('data', function (newVal, oldVal) {
        if ($scope.chartCreated && $scope.data) {
          try {
            $scope.chartCreated.data = $scope.data;
            $scope.chartCreated.options = $scope.options;
            $scope.chartCreated.update();
          } catch (e) {
            //do nothing
          }
        }
        // if (chartCreated) {
        //   chartCreated.data = $scope.data;
        //   chartCreated.options = $scope.options;
        //   chartCreated.update();
        // }
        // if data not defined, exit
        if (!newVal) {
          return;
        }
        if ($scope.chart) {
          type = $scope.chart;
        }

        // chartCreated = new Chart(ctx, {
        //   type: type,
        //   data: $scope.data,
        //   options: $scope.options
        // });
      }, false);

      $scope.chartCreated = new Chart(ctx, {
        type: type,
        data: $scope.data,
        options: $scope.options
      });
    }
  };
};


/* Aliases for various chart types */
angles.directive('chart', function () {
  return angles.chart();
});
angles.directive('linechart', function () {
  return angles.chart('line');
});
angles.directive('barchart', function () {
  return angles.chart('bar');
});
angles.directive('horizontalbarchart', function () {
  return angles.chart('horizontalBar');
});
angles.directive('radarchart', function () {
  return angles.chart('radar');
});
angles.directive('polarchart', function () {
  return angles.chart('PolarArea');
});
angles.directive('piechart', function () {
  return angles.chart('pie');
});
angles.directive('doughnutchart', function () {
  return angles.chart('Doughnut');
});
angles.directive('donutchart', function () {
  return angles.chart('Doughnut');
});