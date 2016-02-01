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

  //OTHERS
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

  .state('app.settings', {
    url: '/settings',
    views: {
      'menuContent': {
        templateUrl: 'templates/settings.html'
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
  
  //PROFILE - MESSAGES
  .state('app.messages', {
    url: '/messages',
    views: {
      'menuContent': {
        templateUrl: 'templates/messages.html',
        controller: 'MessagesCtrl'
      }
    }
  })
  
  //PROFILE - DEALS
  .state('app.deals', {
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
  
  //******************ITEMS
  //ITEMS - HISTORY
  .state('app.history', {
    url: '/history',
    views: {
      'menuContent': {
        templateUrl: 'templates/history.html',
        controller: 'HistoryCtrl'
      }
    }
  })
  
  //ITEMS - HOME
  .state('app.home', {
    url: '/home',
    views: {
      'menuContent': {
        templateUrl: 'templates/home.html',
        controller: 'HomeCtrl'
      }
    }
  })
  
  //ITEMS - SEARCH
  .state('app.search', {
    url: '/search',
    views: {
      'menuContent': {
        templateUrl: 'templates/search.html',
        controller: 'SearchCtrl'
      }
    }
  })
  
  //ITEMS - MAIN CAETEGORY
  .state('app.categories', {
    url: '/categories',
    views: {
      'menuContent': {
        templateUrl: 'templates/categories.html',
        controller: 'CategoriesCtrl'
      }
    }
  })
  
  //ITEMS - SUB CATEGORY
  .state('app.categories/sub_categories', {
    url: '/categories/:main',
    views: {
      'menuContent': {
        templateUrl: 'templates/sub_categories.html',
        controller: 'SubCategoriesCtrl'
      }
    }
  })

  //ITEMS - CATEGORY RESULTS
  .state('app.categories/sub_categories/category_results', {
    url: '/categories/:main/:sub',
    views: {
      'menuContent': {
        templateUrl: 'templates/category_results.html',
        controller: 'CategoryResultsCtrl'
      }
    }
  })
  

  ;

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/home');

});