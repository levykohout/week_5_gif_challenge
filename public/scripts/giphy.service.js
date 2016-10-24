angular.module('giphyApp').service('giphy', GiphyAPIService);

function GiphyAPIService($http) {

    var API = 'http://api.giphy.com/v1/gifs/';
    var key = 'dc6zaTOxFJmzC';

    this.getGifsData = function() {
        return $http.get(API + 'random', {
            params: {
                api_key: key,
                rating: 'y'
            }
        }).then(function(response) {
            return response.data.data;
        });
    };

    this.getSearchData = function(q) {
        return $http.get(API + 'search', {
            params: {
                api_key: key,
                rating: 'y',
                q: q
            }
        }).then(function(response) {
            return response.data.data;
        });
    };

    this.favoriteGif = function(favorite) {
        return $http.post('/gifs', favorite)
            .then(function(response) {
                return response;
            });
    };

    this.getFavoriteGifs = function() {
        return $http.get('/gifs')
            .then(function(response) {
                return response;
            });
    };

    this.updateFavoriteGif = function(id, gif, comment) {
        return $http.put('/gifs/' + id, {
            id: id,
            gif: gif,
            comment: comment
        }).then(function(response) {
            return response;
        });
    };

    this.deleteFavoriteGif = function(id) {
        console.log(id);
        return $http.delete('/gifs/' + id).then(function(response) {
            return response;
        }, function(err) {
            console.log(err);
        });
    };
}
