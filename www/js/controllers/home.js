app.controller('HomeCtrl', ['$scope', '$rootScope', '$ionicSideMenuDelegate', '$firebaseArray', function($scope, $rootScope, $ionicSideMenuDelegate, $firebaseArray) {

  $ionicSideMenuDelegate.canDragContent(false);

  $scope.image_height = screen.height / 5;

  var baseRef = new Firebase('https://nvchrry.firebaseio.com/posts');
  // create a scrollable reference
  var scrollRef = new Firebase.util.Scroll(baseRef, 'name');

  $scope.items = [];

  // create a synchronized array on scope
  $scope.items = $firebaseArray(scrollRef);
  // load the first three contacts
  scrollRef.scroll.next(8);

  // This function is called whenever the user reaches the bottom
  $scope.loadMore = function() {
    // load the next contact
    scrollRef.scroll.next(1);
    $scope.$broadcast('scroll.infiniteScrollComplete');
    
  };

}]);