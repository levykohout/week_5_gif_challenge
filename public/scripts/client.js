angular.module('giphyApp')
    .controller('MainController', MainController);

angular.module('giphyApp')
    .controller('FavoriteController', FavoriteController);



function MainController(giphy) {

    var main = this;

    console.log('MainController loaded!');

    main.random = [];
    main.searchresults = [];
    main.favorites = {};
    main.favoritesArray = [];
    main.favoriteCount = 0;
    main.url='';

    giphy.getGifsData().then(function(gif) {
        main.random = gif.fixed_height_downsampled_url;
    });

    main.getGifsData = function() {
        giphy.getGifsData().then(function(gif) {
            main.random = gif.fixed_height_downsampled_url;
        });

    };


    main.getSearchData = function() {
        giphy.getSearchData(main.search).then(function(gifs) {
            console.log(gifs.length);

            //randomly display 1 gif from search result
            main.getNumber = function() {
                main.num = (Math.ceil(Math.random() * gifs.length));
            };
            main.getNumber();
            main.searchresults = gifs;
            main.random = main.searchresults[main.num].images.fixed_height_downsampled.url;
        });

    };

    main.favoriteGif = function(comment) {
        main.favorites = {
            gif: main.url,
            comment: comment
        };
        main.favoriteCount++;

        giphy.favoriteGif(main.favorites)
            .then(function(response) {
                main.getFavoriteGifs();
            });
        main.comment = '';
    };

    main.getFavoriteGifs = function() {
        giphy.getFavoriteGifs().then(function(response) {
            main.favoritesArray = response.data;
            main.favoriteCount = response.data.length;
        });
    };

    main.getFavoriteUrl=function(url){
        console.log(url);
        main.url=url;
    };

    main.getFavoriteGifs(); //load data from the database on load
}


function FavoriteController(giphy) {

    console.log('FavoriteController loaded!')

    var liked = this;
    liked.favoritesArray = [];
    liked.favoriteCount = 0;

    liked.getFavoriteGifs = function() {
        giphy.getFavoriteGifs().then(function(response) {
            liked.favoritesArray = response.data;
            liked.favoriteCount = response.data.length;
        });
    };

    liked.updateFavoriteGif = function(id, gif, updateComment) {
        giphy.updateFavoriteGif(id, gif, updateComment)
            .then(function(response) {
                liked.getFavoriteGifs();
            });
    };

    liked.deleteFavoriteGif = function(id) {
        giphy.deleteFavoriteGif(id)
            .then(function(response) {
                liked.getFavoriteGifs();
            });
    };

    liked.getFavoriteGifs(); //load data from the database on load

}
