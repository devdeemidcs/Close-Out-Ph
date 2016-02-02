/* global app */
/// <reference path="../../../typings/angularjs/angular.d.ts" />
/// <reference path="../../../typings/ionic/ionic.d.ts" />
/// <reference path="../../../typings/jquery/jquery.d.ts" />
/// <reference path="../../../typings/firebase/firebase.d.ts" />
/// <reference path="../../../typings/custom/CordovaPlugins.d.ts" />
/// <reference path="../../../typings/custom/DataTypes.d.ts" />
/// <reference path="../../../typings/custom/Extensions.d.ts" />
/// <reference path="../../../typings/custom/Interfaces.d.ts" />
/// <reference path="../../../typings/custom/ionic.d.ts" />

app.controller('EditProfileCtrl', ['$scope', '$ionicPopover', '$message', '$ionicLoading', '$rootScope', '$ionicHistory', '$ionicSideMenuDelegate', '$ionicScrollDelegate', function($scope, $ionicPopover, $message, $ionicLoading, $rootScope, $ionicHistory, $ionicSideMenuDelegate, $ionicScrollDelegate) {

  $scope.data = {};
  
  //LOADING
  $scope.ShowLoading = function() {
    $ionicLoading.show({
      template: '<ion-spinner icon="lines" class="spinner-calm"></ion-spinner><br><span>Updating your profile...</br>'
    });
  };
  $scope.HideLoading = function() {
    $ionicLoading.hide();
  };
  
  $('input').blur(function() {

    // check if the input has any value (if we've typed into it)
    if ($(this).val())
      $(this).addClass('used');
    else
      $(this).removeClass('used');
  });
  
  //get value from $rootScope.userInfo
  
  $scope.data.first_name = $rootScope.userInfo.first_name;
  $scope.data.last_name = $rootScope.userInfo.last_name;
  $scope.data.email = $rootScope.userInfo.email;
  $scope.data.contact_number = $rootScope.userInfo.contact_number;
  
  $scope.Save = function(){
    $scope.ShowLoading();
    var id = $rootScope.userInfo.$id;
    delete $rootScope.userInfo['$id'];
      
    $rootScope.userInfo.first_name = $scope.data.first_name || '';
    $rootScope.userInfo.last_name = $scope.data.last_name || '';
    $rootScope.userInfo.email = $scope.data.email || '';
    $rootScope.userInfo.contact_number = $scope.data.contact_number || '';
    var path = 'https://nvchrry.firebaseio.com/users/' + id;
    var ref = new Firebase(path);
    ref.set($rootScope.userInfo).then(function(){
      
      if(!$scope.userInfo.first_name){
        delete $rootScope.userInfo['first_name'];
      }
      
      $rootScope.userInfo.$id = id;
      $scope.HideLoading();
      
      localStorage.setItem('dev_c', JSON.stringify($rootScope.userInfo));
      $ionicHistory.goBack(-1);
    });
    
  }
  
;
}])