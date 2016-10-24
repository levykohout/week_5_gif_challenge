angular.module('giphyApp')
        .controller('MainController', MainController);

angular.module('giphyApp')
        .controller('FavoriteController', FavoriteController);



function MainController (giphy){

    var main = this;

    console.log('MainController loaded!');

    main.random=[];
    main.searchresults=[];
    main.favorites={};
    main.favoritesArray=[];
    main.favoriteCount=0;

    giphy.getGifsData(main.search).then(function(gif){
        console.log(gif);

        main.random = gif.fixed_height_downsampled_url;

    });

    main.getGifsData =function(){
        giphy.getGifsData().then(function(gif){
            console.log(gif);

            main.random = gif.fixed_height_downsampled_url;

        });

    };


    main.getSearchData =function(){
        giphy.getSearchData(main.search).then(function(gifs){
            console.log(gifs.length);

        //randomly display 1 gif from search result
            main.getNumber = function() {
                main.num = (Math.ceil(Math.random() * gifs.length));
            };
            main.getNumber();        
        main.searchresults = gifs;
        main.random = main.searchresults[main.num].images.fixed_height_downsampled.url;
        console.log(main.searchresults.length);
        console.log(main.random);
        });

    };

    main.favoriteGif = function(comment,gif){
        main.favorites ={gif:gif,comment:comment};
        // main.favoritesArray.push(main.favorites);
        main.favoriteCount ++;
        console.log(main.favoriteCount);
        console.log(comment);
        console.log(gif);
        console.log(main.favoritesArray);

        giphy.favoriteGif(main.favorites)
                .then(function(response){
                    console.log(response);
                    main.getFavoriteGifs();
                });

    };

    main.getFavoriteGifs = function(){
        giphy.getFavoriteGifs().then(function(response){
            main.favoritesArray = response.data;
            console.log('array from main controller', main.favoritesArray);
            main.favoriteCount=response.data.length;
            console.log(main.favoriteCount);
        });

    };

    main.getFavoriteGifs();
}


function FavoriteController(giphy){

    console.log('FavoriteController loaded!')

    var liked=this;
    liked.favoritesArray=[];
    liked.favoriteCount=0;


    liked.getFavoriteGifs = function(){
        giphy.getFavoriteGifs().then(function(response){
            liked.favoritesArray = response.data;
            console.log('array from FavoriteController', liked.favoritesArray);
            liked.favoriteCount=response.data.length;
            console.log(liked.favoriteCount);
        });

    };

    liked.updateFavoriteGif=function(id,gif,updateComment){

        console.log(id, gif, updateComment);
        giphy.updateFavoriteGif(id,gif,updateComment)
            .then(function(response){
                liked.getFavoriteGifs();
            });
    };

    liked.deleteFavoriteGif = function(id){
        giphy.deleteFavoriteGif(id)
        .then(function(response){
        liked.getFavoriteGifs();
        });

    };

    liked.getFavoriteGifs();


}
