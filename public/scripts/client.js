angular.module('giphyApp')
        .controller('MainController', MainController);


function MainController (giphy){

    var main = this;



    console.log('MainController loaded!');
    //
    main.random=[];
    main.searchresults=[];
    main.favorites={};
    main.favoritesArray=[];
    main.favoriteCount=0;


    giphy.getGifsData(main.search).then(function(gif){

        main.random = gif.image_original_url;

    });

    main.getGifsData =function(){
        giphy.getGifsData().then(function(gif){

            main.random = gif.image_original_url;

        });

    };


    main.getSearchData =function(){
        giphy.getSearchData(main.search).then(function(gifs){
         main.searchresults = gifs;
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
            main.favoritesArray = response;
            console.log(main.favoritesArray);
            main.favoriteCount=response.data.length;
            console.log(main.favoriteCount);
        });

    };

    main.getFavoriteGifs();
}
