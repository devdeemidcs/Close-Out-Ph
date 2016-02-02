/// <reference path="../../typings/angularjs/angular.d.ts" />

// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
var app = angular.module('starter', ['ionic', 'ionic-material', 'tabSlideBox', 'tabSlideBoxScrollExtension', 'firebase']);

app.run(function($ionicPlatform, $rootScope, $ionicHistory) {

  $rootScope.current_view = "home";
  $rootScope.loggedIn = false;
  $rootScope.userInfo = {};

  if (localStorage.getItem('dev_c')) {
    //if user info exists...

    $rootScope.userInfo = JSON.parse(localStorage.getItem('dev_c'));
    $rootScope.loggedIn = true;
    //redirect to my profile

    //remove history
    $ionicHistory.clearHistory();
    $ionicHistory.nextViewOptions({
      disableAnimate: true,
      disableBack: true
    });

    //go to next page
    $rootScope.current_view = 'profile';
    location.href = '#/app/profile';
    $ionicHistory.clearHistory();


  }

  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }

    if(window.plugins){
      
      var notificationOpenedCallback = function(jsonData) {
        console.log('didReceiveRemoteNotificationCallBack: ' + JSON.stringify(jsonData));
        console.log('data');
      };

      window.plugins.OneSignal.init("b16a0eb9-c5fb-4018-ae6d-c5872fe3476f", {
          googleProjectNumber: "15593165519"
        },
        notificationOpenedCallback);

      // Show an alert box if a notification comes in when the user is in your app.
      window.plugins.OneSignal.enableInAppAlertNotification(true);

      window.plugins.OneSignal.getIds(function(ids){
        $rootScope.onesignal_player_id = ids.userId;
        $rootScope.userInfo.onesignal_player_id = $rootScope.onesignal_player_id;
        console.log($rootScope.userInfo);
      });
            
    }

  });
});