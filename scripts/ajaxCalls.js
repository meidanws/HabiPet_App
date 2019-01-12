
var baseUrl = './Services/';

document.addEventListener("deviceready", setBaseUrl, false);

function setBaseUrl() {
    baseUrl = 'https://proj.ruppin.ac.il/bgroup58/test2/tar2/Services/';
}

var ajax = {
    counter:3,
    startLoading: function () {
        $('<div/>', {
            id: 'loader',
            html: '<img src = "https://proj.ruppin.ac.il/bgroup58/test2/tar2/images/ajax-loader.gif" />'
        }).appendTo('body');
    },
    stopLoading: function () {
        $('#loader').remove();
    },
    sendWithData: function (url, data, success, error) {
        ajax.startLoading();
        setTimeout(function () {
            $.ajax({
                url: baseUrl + url,
                type: 'POST',
                dataType: 'json',
                crossDomain: true,
                cache: false,
                contentType: 'application/json; charset = utf-8',
                async: true,
                timeout: 100000,
                data: JSON.stringify(data),
                success: function (response) {
                    ajax.stopLoading();
                    success(response);
                },
                error: function (response) {
                    ajax.stopLoading();
                    error(response);
                },
            });
        }, 1000 * ajax.counter);
    },

    sendWithoutData: function (url, success, error) {
        ajax.startLoading();
        setTimeout(function () {
            $.ajax({
                url: baseUrl + url,
                type: 'POST',
                dataType: 'json',
                crossDomain: true,
                cache: false,
                contentType: 'application/json; charset = utf-8',
                async: true,
                timeout: 100000,
                data: {},
                success: function (response) {
                    ajax.stopLoading();
                    success(response);
                },
                error: function (response) {
                    ajax.stopLoading();
                    error(response);
                },
            });
        }, 1000 * ajax.counter);
    },

    IsraelCities: function(success, error){
        $.ajax({
            url: './scripts/israel-cities.json',
            data: {},
            dataType: 'json',
            success: success,
            error:error
        });

    },

    NeedToShowError: function (data) {
        res = JSON.parse(data.d);
        if (res.state == 0) {
            alert(res.error);
            return
        }    
    }

}