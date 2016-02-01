app.factory('$message', ['$ionicPopup', function($ionicPopup){

  return {
    Show: function(title, message){
      var popup = $ionicPopup.alert({
        title: title,
        template: '<center>' + message + '</center>'
      });
    },
    ShowCallback: function(title, message, callback){
      var popup = $ionicPopup.alert({
        title: title,
        template: '<center>' + message + '</center>'
      });
      
      popup.then(function(res){
        callback();
      });
    },
    ShowConfirm: function(title, message, callback){
      var confirmPopup = $ionicPopup.confirm({
        title: title,
        template: message
      });
      
      confirmPopup.then(function(res){
        if(res){
          callback();
        }
      });
    }
  }
  
}]);