/// <reference path="../../../typings/angularjs/angular.d.ts" />
/// <reference path="../../../typings/ionic/ionic.d.ts" />
/// <reference path="../../../typings/custom/CordovaPlugins.d.ts" />
/// <reference path="../../../typings/custom/DataTypes.d.ts" />
/// <reference path="../../../typings/custom/Extensions.d.ts" />
/// <reference path="../../../typings/custom/Interfaces.d.ts" />
/// <reference path="../../../typings/custom/ionic.d.ts" />

app.controller('MenuCtrl', ['$scope', '$rootScope', '$ionicHistory', '$message', '$ionicSideMenuDelegate', '$ionicScrollDelegate', function($scope, $rootScope, $ionicHistory, $message, $ionicSideMenuDelegate, $ionicScrollDelegate) {


  $scope.Select = function(current_view) {
    $rootScope.current_view = current_view;
  }

  $scope.Logout = function() {

    $message.ShowConfirm('Close Out Ph', 'Are you sure you want to log out?', function() {

      $ionicSideMenuDelegate.toggleLeft();
      $ionicScrollDelegate.$getByHandle('side_menu_scroll').scrollTop();
      $rootScope.loggedIn = false;
      $rootScope.userInfo = {};
      localStorage.removeItem('dev_c');

      //remove history
      $ionicHistory.clearHistory();
      $ionicHistory.nextViewOptions({
        disableAnimate: true,
        disableBack: true
      });

      //go to next page
      $rootScope.current_view = 'home';
      location.href = '#/app/home';
      $ionicHistory.clearHistory();
    })

  }

}]);