var app = angular.module('records',[]);

app.config(['$httpProvider', function($httpProvider) {
    $httpProvider.defaults.xsrfCookieName = 'csrftoken';
    $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';
}]);


app.controller('recordsController', function($scope, $http) {
    $scope.listen_audio_play = true;

    $scope.get_count_like_dislike = function (slug) {
        $scope.slug = slug;
        $scope.full_link = document.location.protocol+'//'+document.location.host + '/records/' + slug;

        $scope.share_record_text = '<audio controls>' +
            '<source type="audio/mpeg" src="' +
            $scope.full_link +
            '">' +
            'Ваш браузер не поддерживает аудио-проиграватель.' +
            '</audio>';

        $http.get('/api/record/'+slug).then(function (response) {
            $scope.like_count = response.data['like'];
            $scope.dislike_count = response.data['dislike'];
            $scope.views = response.data['views'];
        });

        var current_audio = document.getElementById('current_audio');
        current_audio.addEventListener('timeupdate', function () {
            if ((current_audio.currentTime > 5) && ($scope.listen_audio_play)) {
                $scope.listen_audio_play=false;
               //засчитываем +1 просмотр
                $scope.views += 1;
                data = {views: $scope.views};
                $http.put('/api/record/'+$scope.slug+'/', data);
                }
        }, true);
    };


    $scope.increase_like = function () {
        $scope.like_count += 1;
        data = {like: $scope.like_count};
        $http.put('/api/record/'+$scope.slug+'/', data);
    };


    $scope.increase_dislike = function () {
        $scope.dislike_count += 1;
        data = {dislike: $scope.dislike_count};
        $http.put('/api/record/'+$scope.slug+'/', data);
    };


    $scope.copy_link = function () {
        var str_url = document.getElementsByClassName('share_url')[0];
        copy_bufer(str_url);
        $("#elem_share_url").show('slow');
        setTimeout(function() { $("#elem_share_url").hide('slow'); }, 500);
    }


    $scope.copy_share_record_text = function () {
        var str_share_record_text = document.getElementsByClassName('share_record_text')[0];
        copy_bufer(str_share_record_text);
        $("#elem_share_record_text").show('slow');
        setTimeout(function() { $("#elem_share_record_text").hide('slow'); }, 500);
    }
});


function copy_bufer(object) {
    //производим его выделение
    var range = document.createRange();
    range.selectNode(object);
    window.getSelection().addRange(range);
    //пытаемся скопировать текст в буфер обмена
    try {
        document.execCommand('copy');
    } catch(err) {
        console.log('Can`t copy URL');
    }
    //очистим выделение текста, чтобы пользователь "не парился"
    window.getSelection().removeAllRanges();
}
