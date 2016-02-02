app.controller('LookCtrl', ['$scope', '$rootScope', '$categories', '$ionicLoading', '$message', function($scope, $rootScope, $categories, $ionicLoading, $message) {

  $scope.l = {};
  
  $scope.categories = $categories.GetAll();

  $scope.GetSubs = function(){
    return $categories.GetSubs($scope.l.main_category);
  }

  $scope.current_page = 1;

  //TRIGGER THE HIDDENT INPUT FILE CONTROL
  $scope.OpenFile = function(){
    ionic.trigger('click', { target: document.getElementById('look_items_select') });
    console.log('Hidden input file control triggered...');
  }
  
  //LOADING
  $scope.ShowLoading = function() {
    $ionicLoading.show({
      template: '<ion-spinner icon="lines" class="spinner-calm"></ion-spinner><br><span><br>Uploading ' + ($scope.uploaded + 1) + ' of ' + $scope.count + ' files</br><progress id="look_progress" max="100" value="0" style="width:100%"></progress><br> Saving...</br>'
    });
  };
  
  $scope.CloseLoading = function(){
    $ionicLoading.hide();
  };  
  
  
  //WHEN THE VALUE OF THE HIDDEN CONTROL IS CHANGED...
  $('#look_items_select').change(function(event){
    
    for(var i = 0; i < 4; i++){
      $("#look_image" + (i+1)).fadeOut("fast").attr('src', '');
    }
    $scope.count = event.target.files.length;
    console.log('Total number of files to be uploaded: ', $scope.count);
    for(var i = 0; i < event.target.files.length; i++){
      $("#look_image" + (i+1)).fadeIn("fast").attr('src',URL.createObjectURL(event.target.files[i]));
    }
    
  });
  
  $scope.SetPage = function(page){
    $scope.current_page = page;
  }

  //UPLOAD VARIABLEs
  $scope.file_to_upload = "";
  $scope.uploaded = 0;              //counter on how many were currently uploaded
  $scope.file_names = []            //array where the new file names are pushed
  
  $scope.Upload = function(){
    
    //get the file to upload
    var file = document.getElementById('look_items_select').files[$scope.uploaded];
    console.log('The file to be uploaded: ', file);
    
    //file validation
    if(file == undefined){
      $message.Show('Error', 'Please select a file');
      console.log('Please select a file... cancelling upload function...');
      return;
    }
  
    var filesplit = file.name.split('.');
    var filetype = filesplit[filesplit.length - 1];
    var new_filename = $rootScope.userInfo.$id + '-' + Math.floor(Date.now()) + '.' + filetype;
    
    $scope.file_name = new_filename;
    $scope.file_names.push(new_filename);
    console.log('New File name: ', new_filename);
    console.log('Names in file_names array: ', $scope.file_names);
    
    var formdata = new FormData();
    //append a new key value pair to the formdata
    formdata.append('file_1', file);
    console.log(formdata);
    
    var ajax = new XMLHttpRequest();
    //ajax event handlers
    ajax.upload.addEventListener('progress', progressHandler, false);
    ajax.addEventListener('load', completeHandler, false);
    ajax.addEventListener('error', errorHandler, false);
    ajax.addEventListener('abort', abortHandler, false);

    ajax.open('POST', 'http://devdeemid.host22.com/file_upload_parser.php?filename=' + new_filename);
    ajax.send(formdata);
    
    //$rootScope.uploading = true;
    //$rootScope.add_video_modal.hide();
    $scope.ShowLoading();
    
  }
  
  //***************** AJAX HANDLERS ********************
  
  
  function progressHandler(event){
    
    var percent = (event.loaded / event.total) * 100;
    console.log('Uploading: ', percent);
    $scope.file_to_upload = $scope.file_name;
    document.getElementById('look_progress').value = percent;
    
  }//end progressHandler()

  function completeHandler(event){
  
    $scope.uploaded++;
    if($scope.uploaded == $scope.count){
      //**********************************
      //save to firebase codes
      
      var urls = $scope.file_names;
      $scope.file_names = [];
      $scope.uploaded == 0;
      
      var postInfo = {
      
        name: $scope.l.name,
        description: $scope.l.description,
        date_added: +new Date(),
        firebase_timestamp: Firebase.ServerValue.TIMESTAMP,
        user_id: $rootScope.userInfo.$id,
        type: 'look',
        sold: false,
        urls: urls,
        price: $scope.l.price,
        // trade: $scope.s.trade,
        // swap_items: $scope.look_data.swap_items,
        main_category: $scope.l.main_category,
        sub_category: $scope.l.sub_category
        //tags: $scope.tags
        
      }
      
      var ref = new Firebase('https://nvchrry.firebaseio.com/posts');
      
      ref.push(postInfo, function(){
        
        for(var i = 0; i < 4; i++){
          $("#look_image" + (i+1)).fadeOut("fast").attr('src', '');
        }
        
        $scope.l = {};
        $scope.SetPage(1);
        $scope.CloseLoading();
        
        $message.Show('Success', 'Uploaded ' + $scope.count + ' files');
        console.log('Successfully added to Firebase: ', postInfo);
      })
      
      // $posts.Add(postInfo, function(){
      
      //   for(var i = 0; i < 4; i++){
      //     $("#look_image" + (i+1)).fadeOut("fast").attr('src', '');
      //   }
        
      //   $scope.tags = [];
      //   $scope.look_data = {};
      //   $scope.CloseLoading();
        
      //   $message.Show('Success', 'Uploaded ' + $scope.count + ' files');
      //   console.log('Successfully added to Firebase: ', postInfo);
      // });
      
      return;
      //**********************************
    } //end completion code
    
    $scope.Upload();
    console.log('Uploading next image...');
    
  }

  function errorHandler(event){
    //$rootScope.uploading = false;
    $scope.CloseLoading();
    $message.Show('Error!', 'Upload failed error');
  }

  function abortHandler(event){
    $scope.CloseLoading();
    $message.Show('Error!', 'Upload failed');
    //$rootScope.uploading = false;
  }

}]);