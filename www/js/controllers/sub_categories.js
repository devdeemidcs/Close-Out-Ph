app.controller('SubCategoriesCtrl', ['$scope', '$rootScope', '$categories', '$stateParams', function($scope, $rootScope, $categories, $stateParams){
    
    $scope.main_category = $stateParams.main;
    
    $scope.sub_categories = $categories.GetSubs($stateParams.main);
    
    
}]);