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

  //ACCOUNTS

  .state('app.account', {
    url: '/account',
    views: {
      'menuContent': {
        templateUrl: 'templates/account.html'
      }
    }
  })

  ;

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/about');

});