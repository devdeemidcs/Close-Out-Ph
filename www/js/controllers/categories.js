app.controller('CategoriesCtrl', ['$scope', '$rootScope', '$categories', function($scope, $rootScope, $categories){
    
  $scope.categories = $categories.GetAll();
    
}]);