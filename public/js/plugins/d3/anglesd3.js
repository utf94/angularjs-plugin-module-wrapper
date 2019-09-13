var anglesd3 = angular.module('anglesd3', []);

anglesd3.chart = function (type) {
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
anglesd3.directive('chart', function () {
  return anglesd3.chart();
});
anglesd3.directive('linechart', function () {
  return anglesd3.chart('line');
});
anglesd3.directive('barchart', function () {
  return anglesd3.chart('bar');
});
anglesd3.directive('horizontalbarchart', function () {
  return anglesd3.chart('horizontalBar');
});
anglesd3.directive('radarchart', function () {
  return anglesd3.chart('radar');
});
anglesd3.directive('polarchart', function () {
  return anglesd3.chart('PolarArea');
});
anglesd3.directive('piechart', function () {
  return anglesd3.chart('pie');
});
anglesd3.directive('doughnutchart', function () {
  return anglesd3.chart('Doughnut');
});
anglesd3.directive('donutchart', function () {
  return anglesd3.chart('Doughnut');
});