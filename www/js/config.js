app.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {

  $ionicConfigProvider.backButton.previousTitleText(false);
  $ionicConfigProvider.backButton.text('');

  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'MenuCtrl'
  })

  //****************** ABOUT
  .state('app.about', {
    url: '/about',
    views: {
      'menuContent': {
        templateUrl: 'templates/about.html'
      }
    }
  })

  //children of about page

  .state('app.about/others', {
    url: '/others',
    views: {
      'menuContent': {
        templateUrl: 'templates/about/others.html'
      }
    }
  })

  .state('app.about/built', {
    url: '/built',
    views: {
      'menuContent': {
        templateUrl: 'templates/about/built.html'
      }
    }
  })

  .state('app.about/terms', {
    url: '/terms',
    views: {
      'menuContent': {
        templateUrl: 'templates/about/terms.html'
      }
    }
  })

  .state('app.about/closeout', {
    url: '/closeout',
    views: {
      'menuContent': {
        templateUrl: 'templates/about/closeout.html'
      }
    }
  })

  //********************** ACCOUNTS
  //LOGIN AND REGISTER
  .state('app.login', {
    url: '/login',
    views: {
      'menuContent': {
        templateUrl: 'templates/login.html',
        controller: 'AccountCtrl'
      }
    }
  })
  
  //PROFILE
  .state('app.profile', {
    url: '/profile',
    views: {
      'menuContent': {
        templateUrl: 'templates/profile.html',
        controller: 'ProfileCtrl'
      }
    }
  })
  
  //EDIT PROFILE
  .state('app.profile/edit', {
    url: '/edit',
    views: {
      'menuContent': {
        templateUrl: 'templates/edit_profile.html',
        controller: 'EditProfileCtrl'
      }
    }
  })
  
  //PROFILE - DEALS
  .state('app/deals', {
    url: '/deals',
    views: {
      'menuContent': {
        templateUrl: 'templates/deals.html',
        controller: 'DealsCtrl'
      }
    }
  })
  
  
  //************* POSTS
  //POST - SELL
  .state('app.sell', {
    url: '/sell',
    views: {
      'menuContent': {
        templateUrl: 'templates/sell.html',
        controller: 'SellCtrl'
      }
    }
  })
  
  //POST - SELL
  .state('app.look', {
    url: '/look',
    views: {
      'menuContent': {
        templateUrl: 'templates/look.html',
        controller: 'LookCtrl'
      }
    }
  })

  ;

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/about');

});