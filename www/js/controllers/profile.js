app.controller('ProfileCtrl', ['$scope', '$ionicPopover', function($scope, $ionicPopover){
  
  // .fromTemplateUrl() method
  $ionicPopover.fromTemplateUrl('templates/popovers/profile.html', {
    scope: $scope
  }).then(function(popover) {
    $scope.popover = popover;
  });

  $scope.OpenPopover = function($event) {
    $scope.popover.show($event);
  };
  $scope.ClosePopover = function() {
    $scope.popover.hide();
  };
  //Cleanup the popover when we're done with it!
  $scope.$on('$destroy', function() {
    $scope.popover.remove();
  });
  // Execute action on hide popover
  $scope.$on('popover.hidden', function() {
    // Execute action
  });
  // Execute action on remove popover
  $scope.$on('popover.removed', function() {
    // Execute action
  });
  
}])