var biProgress = angular.module('progressChart', []);

biProgress.chart = function (type, $window) {
  return {
    restrict: 'E',
    scope: {
      data: '=',
      options: '=',
      value: '=',
      steps: '=',
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
    templateUrl: '../../views/partials/progress_bar.html',
    link: function ($scope, $elem) {

      var detailsObjects = angular.element($elem).find('.bi_progress_info');
      console.log($elem);
    }
  };
};


/* Aliases for various chart types */
biProgress.directive('progressBi', ['$window', function ($window) {
  return biProgress.chart('progressBi', $window);
}]);