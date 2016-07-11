'use strict';

var app = angular.module('myApp');

app.controller('mainCtrl', function($scope, $state, User) {
  console.log('mainCtrl!');

  $scope.logout = () => {
    User.logout()
      .then(()=>{
        $state.go('home');
      })
  };
});


app.controller('loginRegisterCtrl', function($scope, $state, User) {

  $scope.currentState = $state.current.name;

  $scope.submit = () => {
    console.log('$scope.user:', $scope.user);

    if($scope.currentState === 'login') {
      // login stuff
      User.login($scope.user)
        .then(res => {
          $state.go('stock');
          console.log("res: ",res);
        })
        .catch(err => {
          console.log('err:', err);
          alert('Register failed. Error in console.');
        });
    } else {
      // register stuff

      if($scope.user.password !== $scope.user.password2) {
        // passwords don't match
        $scope.user.password = null;
        $scope.user.password2 = null;
        alert('Passwords must match.  Try again.');
      } else {
        // passwords are good
        User.register($scope.user)
          .then(res => {
            $state.go('login');
          })
          .catch(err => {
            console.log('err:', err);
            alert('Register failed. Error in console.');
          });
      }
    }
  };

});



app.controller('loginCtrl', function($scope, $state, User) {
  console.log('loginCtrl!');

  console.log('$state:', $state);

  $scope.login = () => {

  };

});

app.controller('registerCtrl', function() {
  console.log('registerCtrl!');
});


app.controller('stockCtrl', function($scope, Stock, CurrentUser, User){
  console.log('CurrentUser:', CurrentUser);
  $scope.currentUser = CurrentUser.data;
  console.log("stockCtrl");



  $scope.searchStock = () => {
    console.log("$scope.searchObj.symbol: ", $scope.searchObj.symbol);
    Stock.getStock($scope.searchObj.symbol)
      .then(res => {
        console.log("res: ", res.data);
      })
      .catch(err => {
        console.log("err: ", err);
      })
  }

  $scope.addStock = () => {
    console.log("addStock: ", $scope.addObj.symbol);
    console.log("current user: ", $scope.currentUser._id);

    User.addStock($scope.currentUser._id, $scope.addObj.symbol)
      .then(res => {
        console.log("res.data: ", res.data);
      })
      .catch(err => {
        console.log("err: ", err);
      })
  }

})
