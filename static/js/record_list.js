var record_list_audio = document.getElementById('record_list_audio');
var current_audio_mp3= '';
var current_audio_number = -1;
var current_audio_slug = '';
var count_seconds = 0;
var listen_current_record = true;

var app = angular.module('records',[]);
app.controller('recordsController', function($scope, $http) {

});


var HttpClient = function() {
    this.get = function(aUrl, aCallback) {
        var anHttpRequest = new XMLHttpRequest();
        anHttpRequest.onreadystatechange = function() {
            if (anHttpRequest.readyState == 4 && anHttpRequest.status == 200)
                aCallback(anHttpRequest.responseText);
        }
        anHttpRequest.open("GET", aUrl, true );
        anHttpRequest.send( null );
    }
    this.put = function(aUrl, aData, aCallback) {
        var anHttpRequest = new XMLHttpRequest();
        anHttpRequest.onreadystatechange = function() {
            if (anHttpRequest.readyState == 4 && anHttpRequest.status == 200)
                aCallback(anHttpRequest.responseText);
        }
        anHttpRequest.open("PUT", aUrl, true);
        anHttpRequest.setRequestHeader('Content-type', 'application/json; charset=utf-8');
        anHttpRequest.setRequestHeader('X-CSRFToken',  getCookie("csrftoken"));
        anHttpRequest.send(aData);
    }
}


var client = new HttpClient();
client.get('/api/record/all', function(response) {
    response_parse = JSON.parse(response);
    for (i=0; i<response_parse.length; i++) {
        object_like = document.getElementsByClassName('text_record_like')[i];
        object_like.innerText = response_parse[i].like;

        document.getElementsByClassName('div_record_like')[i].onclick = function () {
            like = parseInt(this.getElementsByClassName('text_record_like')[0].innerText);
            like += 1;
            this.getElementsByClassName('text_record_like')[0].innerText = like.toString();
            // data = JSON.stringify({like: like, csrfmiddlewaretoken: this.dataset.csrftoken });
            data = JSON.stringify({like: like});
            client.put('/api/record/'+this.id+'/', data, function (response) {
            });
        };

        object_dislike = document.getElementsByClassName('text_record_dislike')[i];
        object_dislike.innerText = response_parse[i].dislike;

        document.getElementsByClassName('div_record_dislike')[i].onclick = function () {
            dislike = parseInt(this.getElementsByClassName('text_record_dislike')[0].innerText);
            dislike += 1;
            this.getElementsByClassName('text_record_dislike')[0].innerText = dislike.toString();
            data = JSON.stringify({dislike: dislike});
            client.put('/api/record/'+this.id+'/', data, function (response) {
            });
        };

        object_views = document.getElementsByClassName('text_record_view')[i];
        object_views.innerText = response_parse[i].views;

    }
});


var audio = document.getElementById('record_list_audio');
var all_records = document.getElementsByName('record_img');
for(var i=0;i<all_records.length;i++){
    all_records[i].onclick=function(){
        if (this.src == document.location.protocol+'//'+document.location.host + '/media//other/Pause.png') {
            audio.pause();
            this.setAttribute('src', '/media//other/Play.jpg');
        }
        else {
            if (current_audio_mp3 != this.id) {
                audio.src=this.id;
                count_seconds = 0;
                listen_current_record = true;
            }
            audio.play();
            this.setAttribute('src', '/media//other/Pause.png');
            if (current_audio_mp3 != '')
            {
                // заменим картинку у предыдущей записи
                document.getElementById(current_audio_mp3).setAttribute('src', '/media//other/Play.jpg');
            }
            current_audio_mp3 = this.id;
            current_audio_number = this.dataset.num;
            current_audio_slug = this.dataset.slug;
        }
    }
}


record_list_audio.addEventListener('play', function () {
    if (current_audio_mp3 != '') {
        document.getElementById(current_audio_mp3).setAttribute('src', '/media//other/Pause.png');
    }
}, true);


record_list_audio.addEventListener('pause', function () {
    document.getElementById(current_audio_mp3).setAttribute('src', '/media//other/Play.jpg');
    // current_audio_mp3='';
}, true);


record_list_audio.addEventListener('ended', function () {
    var records = document.getElementsByName('record_img');
    for (var i=0; i <= records.length; i++) {
        if (records[i].id == current_audio_mp3) {
            document.getElementById(current_audio_mp3).setAttribute('src', '/media//other/Play.jpg');
            if (i != records.length-1) {
                current_audio_mp3 = records[i+1].id;
                current_audio_number = i+1;
            }
            else {
                current_audio_mp3 = records[0].id;
                current_audio_number = 0;
            }
            current_audio_slug = document.getElementById(current_audio_mp3).slug;
            document.getElementById(current_audio_mp3).setAttribute('src', '/media//other/Pause.png');
            record_list_audio.src = current_audio_mp3;
            record_list_audio.play();
            break;
        }
    }
}, true);


record_list_audio.addEventListener('timeupdate', function () {
    if (listen_current_record) {count_seconds += 1;};
    if (count_seconds > 20) {
        //засчитываем +1 просмотр
        count_seconds = 0;
        listen_current_record=false;
        views = parseInt(document.getElementsByClassName('text_record_view')[current_audio_number].innerText);
        views += 1;
        document.getElementsByClassName('text_record_view')[current_audio_number].innerText = views.toString();
        data = JSON.stringify({views: views});
        client.put('/api/record/'+current_audio_slug+'/', data, function (response) {
        });


    }
}, true);

