/// <reference path="../../../typings/angularjs/angular.d.ts" />
/// <reference path="../../../typings/ionic/ionic.d.ts" />
/// <reference path="../../../typings/jquery/jquery.d.ts" />
/// <reference path="../../../typings/firebase/firebase.d.ts" />
/// <reference path="../../../typings/custom/CordovaPlugins.d.ts" />
/// <reference path="../../../typings/custom/DataTypes.d.ts" />
/// <reference path="../../../typings/custom/Extensions.d.ts" />
/// <reference path="../../../typings/custom/Interfaces.d.ts" />
/// <reference path="../../../typings/custom/ionic.d.ts" />

app.controller('ProfileCtrl', ['$scope', '$ionicPopover', '$message', '$ionicLoading', '$rootScope', '$ionicHistory', '$ionicSideMenuDelegate', '$ionicScrollDelegate', function($scope, $ionicPopover, $message, $ionicLoading, $rootScope, $ionicHistory, $ionicSideMenuDelegate, $ionicScrollDelegate){
  
  //POPOVER CODES
  // .fromTemplateUrl() method
  $ionicPopover.fromTemplateUrl('templates/popovers/profile.html', {
    scope: $scope
  }).then(function(popover) {
    $scope.popover = popover;
  });

  $scope.OpenPopover = function($event) {
    $scope.popover.show($event);
  };
  $scope.ClosePopover = function() {
    $scope.popover.hide();
  };
  //Cleanup the popover when we're done with it!
  $scope.$on('$destroy', function() {
    $scope.popover.remove();
  });
  // Execute action on hide popover
  $scope.$on('popover.hidden', function() {
    // Execute action
  });
  // Execute action on remove popover
  $scope.$on('popover.removed', function() {
    // Execute action
  });
  //END POPOVER
  
  //LOADING
  $scope.ShowLoading = function() {
    $ionicLoading.show({
      template: '<ion-spinner icon="lines" class="spinner-calm"></ion-spinner><br><span>Updating your profile...</br><progress id="upload_progress" value="0" max="100"></progress>'
    });
  };
  $scope.HideLoading = function() {
    $ionicLoading.hide();
  };
  
  $scope.LogOut = function(){

    $message.ShowConfirm('Close Out Ph', 'Are you sure you want to log out?', function() {

      $ionicScrollDelegate.scrollTop();
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
  } //end logout
  
  
  //TRIGGER THE HIDDEN FILE INPUT
  $scope.OpenFile = function(){
    ionic.trigger('click', { target: document.getElementById('profile_select') });
  }
  
  //load the SELECTED IMAGE TO THE img src
  $('#profile_select').change(function(event){  
    $('#profile_pic').attr('src', URL.createObjectURL(event.target.files[0]));
    $scope.image_loaded = true;
    console.log($('#profile_pic'));
    $scope.Upload();
  });
  
  
  //UPLOAD FUNCTION
  $scope.Upload = function(){
    
    //Access the first file in the files array of the input file element
    var file = document.getElementById('profile_select').files[0];
    console.log('File to upload: ', file);
    
    //RETURN IF THERE IS NO FILE SELECTED
    if(file == undefined){
      $message.Show('Error', 'Please select a file');
      console.log('There is no file selected');
      console.log('Cancelling the Upload() Function');
      return;
    }
    
    //Create a new filename referencing the $ID of the user
    var filesplit = file.name.split('.');
    var filetype = filesplit[filesplit.length - 1];
    var new_filename = $rootScope.userInfo.$id + '-' + Math.floor(Date.now()) + '.' + filetype;
    console.log('Profile Pic renamed: ', new_filename);
    
    //transfer it to scope so it will be accessible to the TEMPLATE
    $scope.file_name = new_filename;
    
    var formdata = new FormData();
    
    //append a new key value pair to the formdata
    formdata.append('file_1', file);
    console.log('Form Data: ', formdata);
    
    //AJAX
    var ajax = new XMLHttpRequest();
    
    //DEFINE THE AJAX EVENT HANDLERS
    ajax.upload.addEventListener('progress', progressHandler, false);
    ajax.addEventListener('load', completeHandler, false);
    ajax.addEventListener('error', errorHandler, false);
    ajax.addEventListener('abort', abortHandler, false);

    ajax.open('POST', 'http://devdeemid.host22.com/file_upload_parser.php?filename=' + new_filename);
    ajax.send(formdata);
    console.log('Starting AJAX');
    
    //AJAX INDICATOR... CLOSE AFTER COMPLETION
    $scope.ShowLoading();
    
  } //END UPLOAD FUNCTION()
  
  function progressHandler(event){
    var percent = (event.loaded / event.total) * 100;
    $('#upload_progress').val(percent);
  }
  
  function completeHandler(event){
    
    $scope.HideLoading();
    console.log('Uploading image completed, Closing Loading...')
    
    $rootScope.userInfo.url = $scope.file_name;
    console.log('Updated $root.userInfo.url: ', $rootScope.userInfo.url);
    
    var id = $rootScope.userInfo.$id;
    delete $rootScope.userInfo['$id'];
      
    var path = 'https://nvchrry.firebaseio.com/users/' + id;
    var ref = new Firebase(path);
    ref.set($rootScope.userInfo).then(function(){
      
      if(!$scope.userInfo.first_name){
        delete $rootScope.userInfo['first_name'];
      }
      
      $rootScope.userInfo.$id = id;
      $scope.HideLoading();
      
      localStorage.setItem('dev_c', JSON.stringify($rootScope.userInfo));
    });
  }

  function errorHandler(event){
    $scope.HideLoading();
    $message.Show('Close Out Ph', 'Upload failed error');
  }

  function abortHandler(event){
    $scope.HideLoading();
    $message.Show('Close Out Ph', 'Upload failed');
  }
  
  
}])