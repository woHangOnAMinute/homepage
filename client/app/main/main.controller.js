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
      $scope.currentVid = $scope.getNextFromPlaylist();
      console.log($scope.currentVid);
      player.playVideo();
    });



    $http.get('http://gdata.youtube.com/feeds/api/videos/8SzFaEqbLRM?v=2').
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


    $scope.playVideo = function(player) {
          console.log('I TRYING');

          $scope.$apply(function () {
            $scope.currentVid = $scope.getNextFromPlaylist();
          });
          console.log($scope.currentVid);
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
        if(  $scope.currentVid == '' )  {
          $scope.playVideo();
        }
    };

    $scope.removeFromPlaylist = function() {

    };

    $scope.getNextFromPlaylist = function() {
        return $scope.playlist.shift().videoId;
    };

    //$scope.addToPlaylist('R4ZHpYTd3hQ');


  });
