'use strict';

angular.module('wohangonaminuteApp')
  .controller('MainCtrl', function ($scope, $http, $sce, $window) {
		var socket = $window.io.connect();
    $scope.currentVid = '';
    $scope.playlist = [];
    var videoObject = {};
    $scope.playerVars = {
        controls: 1,
        autoplay: 1
    };

    $scope.$on('youtube.player.ended', function ($event, player) {
      // play it again
      $scope.playVideo(player);
    });

    $http.get('https://gdata.youtube.com/feeds/api/videos/8SzFaEqbLRM?v=2').
  success(function(data, status, headers, config) {
    console.log('success');
    console.log(data);
    // this callback will be called asynchronously
    // when the response is available
  }).
  error(function(data, status, headers, config) {
    console.log('ERROR');
    console.log(data);
    // called asynchronously if an error occurs
    // or server returns response with an error status.
  });


    $scope.playVideo = function() {
        $scope.$apply(function () {
          $scope.currentVid = $scope.getNextFromPlaylist();
        });
    };

    $scope.addToPlaylist = function(id) {
      socket.emit('updatePlaylist', {
        newId: id
      });
    };

    socket.on('updatePlaylist', function(data){
     $scope.updatePlaylist(data.newId);
    });

    $scope.updatePlaylist = function(id) {
        $scope.$apply(function () {
          $scope.playlist.push({userid:'1',videoId:id});
        });
        console.log(  '$scope.playlist');
        console.log(  $scope.playlist);
        if(  $scope.currentVid == '' )  {
          $scope.playVideo();
        }
    };

    $scope.removeFromPlaylist = function() {

    };

    $scope.getNextFromPlaylist = function() {
      var returnId = $scope.playlist[0].videoId;
      $scope.playlist.splice(0,1);
      return returnId;
    };

    //$scope.addToPlaylist('R4ZHpYTd3hQ');


  });
