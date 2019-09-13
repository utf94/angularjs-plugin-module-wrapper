var biKnob = angular.module('knobChart', []);

biKnob.chart = function (type, $window) {
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
    template: '<div class="ng-binding" style="height:100%;min-height:100%;"></div>',
    link: function ($scope, $elem) {

      $scope.data.width = $scope.data.width || '100%';
      $scope.data.readOnly = $scope.data.readOnly || true;
      $scope.data.angleOffset = $scope.data.angleOffset || 0;
      $scope.data.linecap = $scope.data.linecap || 'round';
      $scope.data.bgColor = $scope.data.bgColor || '#87CEEB66';
      $scope.data.fgColor = $scope.data.fgColor || '#87CEEB66';
      $scope.data.fgColor = $scope.data.fgColor || '#87CEEB66';


      angular.element($elem).find('div')
        .append('<input class="knob" data-width="' +
          $scope.data.width +
          '" data-readOnly="' +
          $scope.data.readOnly +
          '" data-angleOffset=' +
          $scope.data.angleOffset +
          ' data-linecap=' +
          $scope.data.linecap +
          ' value="' + $scope.data.value +
          '" data-bgColor="' +
          $scope.data.bgColor +
          '" data-fgColor="' +
          $scope.data.fgColor +
          '">');


      var knobInstance = angular.element($elem).find('div').find('input.knob');
      $scope.data.instance = knobInstance;
      $(function ($) {
        $(knobInstance).knob({
          draw: function () {
            // "tron" case
            //t
            if (this.$.data('skin') === 'tron') {
              //this.$.data = $scope.data.value;
              this.cursorExt = 0.3;


              // $scope.value = 56;
              var a = this.arc(this.cv) // Arc
                ,
                pa // Previous arc
                , r = 1;

              this.g.lineWidth = this.lineWidth;
              if (this.o.displayPrevious) {
                pa = this.arc(this.v);
                this.g.beginPath();
                this.g.strokeStyle = this.pColor;
                this.g.arc(this.xy, this.xy, this.radius - this.lineWidth, pa.s, pa.e,
                  pa.d);
                this.g.stroke();
              }

              this.g.beginPath();
              this.g.strokeStyle = r ? this.o.fgColor : this.fgColor;
              this.g.arc(this.xy, this.xy, this.radius - this.lineWidth, a.s, a.e, a.d);
              this.g.stroke();

              this.g.lineWidth = 2;
              this.g.beginPath();
              this.g.strokeStyle = this.o.fgColor;
              this.g.arc(this.xy, this.xy, this.radius - this.lineWidth + 1 + this.lineWidth *
                2 / 3, 0, 2 * Math.PI, false);
              this.g.stroke();
              return false;
            }
          }
        });
      });

      $scope.$watch('data', function (newVal, oldVal) {
        console.log('Knob updated');
        knobInstance.val($scope.data.value).trigger('change');
      }, false);


    }
  };
};


/* Aliases for various chart types */
biKnob.directive('knob', ['$window', function ($window) {
  return biKnob.chart('knob', $window);
}]);