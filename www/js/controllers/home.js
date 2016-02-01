app.controller('HomeCtrl', ['$scope', '$rootScope', '$ionicSideMenuDelegate', function($scope, $rootScope, $ionicSideMenuDelegate){
  
  $ionicSideMenuDelegate.canDragContent(false);
  
  $scope.image_height = screen.height / 5;
  console.log(screen.height);
  $scope.items = [
    { 
      name: 'dee mid rak dee mid rak is ',
      age: 23,
      url: 'handout_icon.jpg'
    },
    { 
      name: 'kurei',
      age: 23,
      url: 'bl_icon.png'
    },
    { 
      name: 'kurenai',
      age: 23,
      url: 'algebra_icon.png'
    },
    { 
      name: 'recca',
      age: 23,
      url: 'handout_cover.jpg'
    },
    { 
      name: 'kaoru',
      age: 23,
      url: 'handout_icon.jpg'
    },
    { 
      name: 'kurei',
      age: 23,
      url: 'bl_icon.png'
    },
    { 
      name: 'kurenai',
      age: 23,
      url: 'algebra_icon.png'
    },
    { 
      name: 'recca',
      age: 23,
      url: 'handout_cover.jpg'
    },
    { 
      name: 'kaoru',
      age: 23,
      url: 'handout_icon.jpg'
    },
    { 
      name: 'kurei',
      age: 23,
      url: 'bl_icon.png'
    },
    { 
      name: 'kurenai',
      age: 23,
      url: 'algebra_icon.png'
    },
    { 
      name: 'recca',
      age: 23,
      url: 'handout_cover.jpg'
    },
    { 
      name: 'kaoru',
      age: 23,
      url: 'handout_icon.jpg'
    }
  ]
    
}]);