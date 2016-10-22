
angular.module('giphyApp').config(function($routeProvider,$locationProvider){
    $routeProvider.when('/', {  //browser
        templateUrl:'views/home.html',
        controller: 'MainController as main'

    }).when('/home', {  //browser
        templateUrl:'views/home.html',
        controller: 'MainController as main'

    }).when('/favorites', {
        templateUrl:'views/favorites.html',
        controller: 'FavoriteController as liked'
    }).otherwise('/', {
        templateUrl:'views/home.html',
        controller: 'MainController as main'
    });
    //let us use normal looking links.Remember to use base tag in html to use this.
    $locationProvider.html5Mode(true);

});
