app.controller('AccountCtrl', ['$scope', '$rootScope', '$ionicModal', function($scope, $rootScope, $ionicModal){
  
  //LOG IN AND REGISTER CONTROLLER
  
  $ionicModal.fromTemplateUrl('templates/modals/register.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal;
  });
  
  $scope.OpenModal = function(){
    $scope.modal.show();
    console.log('Register modal shown.');
  }
  
  $scope.CloseModal = function(){
    $scope.modal.hide();
    console.log('Register modal hidden');
  }
  
}])