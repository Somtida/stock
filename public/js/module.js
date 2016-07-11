'use strict';

var app = angular.module('myApp', ['ui.router', 'ngCookies']);

app.constant('TOKENNAME', 'authtoken');

app.run(function(User) {
  User.readToken();
});

app.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: '/html/home.html',
      controller: 'homeCtrl'
    })
    .state('home.search', {
      url: 'search',
      templateUrl: '/html/search.html',
      controller: 'homeCtrl'
    })
    .state('home.lookup', {
      url: 'lookup',
      templateUrl: '/html/lookup.html',
      controller: 'homeCtrl'
    })

    .state('login', {
      url: '/login',
      templateUrl: '/html/loginregister.html',
      controller: 'loginRegisterCtrl'
    })
    .state('register', {
      url: '/register',
      templateUrl: '/html/loginregister.html',
      controller: 'loginRegisterCtrl'
    })


    .state('stock', {
      url: '/stock',
      templateUrl: '/html/stock.html',
      controller: 'stockCtrl',
      resolve: {
        CurrentUser: function(User) {
          return User.getProfile();
        }
      }
    })
    // .state('stock.searchStock', {
    //   url: '/searchStock',
    //   templateUrl: '/html/searchStock.html',
    //   controller: 'stockCtrl'
    // })
    // .state('addStock', {
    //   url: '/addStock/:id',
    //   templateUrl: '/html/addStock.html',
    //   controller: 'stockCtrl',
    //   params: {id: null}
    // })



  $urlRouterProvider.otherwise('/');
});
