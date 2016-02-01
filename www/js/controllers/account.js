/// <reference path="../../../typings/angularjs/angular.d.ts" />
/// <reference path="../../../typings/ionic/ionic.d.ts" />
/// <reference path="../../../typings/firebase/firebase.d.ts" />
/// <reference path="../../../typings/custom/CordovaPlugins.d.ts" />
/// <reference path="../../../typings/custom/DataTypes.d.ts" />
/// <reference path="../../../typings/custom/Extensions.d.ts" />
/// <reference path="../../../typings/custom/Interfaces.d.ts" />
/// <reference path="../../../typings/custom/ionic.d.ts" />

app.controller('AccountCtrl', ['$scope', '$rootScope', '$ionicModal', '$message', '$ionicLoading', '$ionicHistory', function($scope, $rootScope, $ionicModal, $message, $ionicLoading, $ionicHistory) {

  //LOG IN AND REGISTER CONTROLLER

  //initialize
  $scope.l = {};
  $scope.r = {};

  //LOADING
  $scope.ShowLoading = function() {
    $ionicLoading.show({
      template: '<ion-spinner icon="lines" class="spinner-calm"></ion-spinner><br><span>Loading...</br>'
    });
  };
  $scope.HideLoading = function() {
    $ionicLoading.hide();
  };

  //MODAL
  $ionicModal.fromTemplateUrl('templates/modals/register.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal;
  });

  $scope.OpenModal = function() {
    $scope.modal.show();
    // console.log('Register modal shown.');
  }

  $scope.CloseModal = function() {
    $scope.modal.hide();
    //console.log('Register modal hidden');
  }

  //REGISTER
  $scope.Register = function() {
      $scope.ShowLoading();

      var ref = new Firebase('https://nvchrry.firebaseio.com');

      //check first if username is available
      ref.child('users').orderByChild('username').equalTo($scope.r.username).once('value', function(snapshot) {

        if (snapshot.val() === null) {
          //register

          var fb_timestamp = Firebase.ServerValue.TIMESTAMP;
          var timestamp = +new Date();

          var new_user = ref.child('users').push({
            username: $scope.r.username,
            password: $scope.r.password,
            email: $scope.r.email,
            firebase_timestamp: fb_timestamp,
            timestamp: timestamp,
            premium: false
          }, function() {
            //on success adding
            $scope.HideLoading();
            $message.ShowCallback('Close Out Ph', 'Successfully registered!', function() {

              $rootScope.loggedIn = true;
              //now you have valid username to login with
              $rootScope.userInfo = {
                id: new_user.key(),
                username: $scope.r.username,
                password: $scope.r.password,
                email: $scope.r.email,
                firebase_timestamp: fb_timestamp,
                timestamp: timestamp,
                premium: false
              }

              //save to local storage
              localStorage.setItem('dev_c', angular.toJson($rootScope.userInfo));
              $scope.CloseModal();
              $scope.r = {};

              GoToProfile();

            });

          })

        } else {

          $scope.HideLoading();
          $message.Show('Close Out Ph', 'Username is already registered.');
          $scope.r.username = '';

        }

      })

    } //end Register button Click

  function GoToProfile() {

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

  $scope.Login = function() {

      $scope.ShowLoading();

      var ref = new Firebase('https://nvchrry.firebaseio.com');
      //check first if username is available
      ref.child('users').orderByChild('username').equalTo($scope.l.username).once('value', function(snapshot) {

        if (snapshot.val() !== null) {
          var id = Object.keys(snapshot.val())[0];
          
          if (snapshot.val()[id].password != $scope.l.password) {
            
            $scope.HideLoading();
            $message.Show('Close Out Ph', 'Username / Password does not match.');
            
          } else {
            //login
            $rootScope.userInfo = snapshot.val()[id];
            $rootScope.userInfo.$id = id;
            $rootScope.loggedIn = true;
            //save to local storage
            localStorage.setItem('dev_c', angular.toJson($rootScope.userInfo));
            $scope.l = {};
            $scope.HideLoading();
            GoToProfile();

          }

        } else {
          $scope.HideLoading();
          $message.Show('Close Out Ph', 'Username does not exist.');
        }

      });
    } //end login button



}])