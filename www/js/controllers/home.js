app.controller('HomeCtrl', ['$scope', '$rootScope', '$ionicSideMenuDelegate', '$firebaseArray', function($scope, $rootScope, $ionicSideMenuDelegate, $firebaseArray){
  
  $ionicSideMenuDelegate.canDragContent(false);
  
  $scope.image_height = screen.height / 5;
  
  
  var ref = new Firebase('https://nvchrry.firebaseio.com/');
  
  
  
  var userRef = ref.child('users').orderByChild('tag1').startAt('dee').endAt('dee');
  var users = $firebaseArray(userRef);
  console.log(users);
  
  users.$loaded().then(function(){
    console.log(users);
    $scope.users = users;
  })
  
}]);