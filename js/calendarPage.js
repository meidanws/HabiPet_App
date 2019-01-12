
var eventsList;
var user = "";
$(document).ready(function () {

    user = JSON.parse(localStorage.getItem("loginData")).User[0];
    $('#calendar').fullCalendar({
        header: {
            left: 'next,today,prev',
            center: 'title',
            right: false
        },
        //navLinks: true, // can click day/week names to navigate views
        editable: true,
        eventLimit: true, // allow "more" link when too many events
        isRTL: true,
        selectable: true,
        dayClick: function (date, jsEvent, view) {

            //get all day events
            var D = "" + date.format(); + ""
            var data = {
                loginId: user.UserId,
                dayClicked: D
            };

            ajax.sendWithData("PetsitterAPI.asmx/GetUserEventsByDate", data, SuccessEvenst, ErrorEvenst);
        },

    });



    var D = "" + new Date() + ""
    D = moment(new Date(D.substr(0, 16)));
    D = D.format("YYYY-MM-DD");

    var data = {
        loginId: user.UserId, //user.UserId, //user
        dayClicked: D
    };

    ajax.sendWithData("PetsitterAPI.asmx/GetUserEventsByDate", data, SuccessEvenst, ErrorEvenst);
});



function ErrorEvenst() {

    alert('שגיאה');
}


function SuccessEvenst(data) {
    eventsList = JSON.parse(data.d).Events;

    //convert date
    $('#eventDayList').empty();

    if (eventsList.length == 0) {
        var D = "" + new Date() + ""
        D = moment(new Date(D.substr(0, 16)));
        strDay = D.format("YYYY-MM-DD");
        strDay = strDay.split("-");
        strDay = strDay[2] + "/" + strDay[1] + "/" + strDay[0]

        var str = '<h4>' + strDay + '</h4><ul><li>אין אירועים ליום זה</li>';
    }
    else {

        var day = eventsList[0]["OridainedDate"];
        day = moment(day);
        day = "" + day._d + ""
        day = moment(new Date(day.substr(0, 16)));
        day = day.format("YYYY-MM-DD");

        strDay = day.split("-");
        strDay = strDay[2] + "/" + strDay[1] + "/" + strDay[0]

        var str = '<h4>' + strDay + '</h4><ul>';

        counter = 0;
        $.each(eventsList, function (i, row) {
            //convert date
            D = moment(row.OridainedDate)
            D = "" + D._d + ""
            var date = moment(new Date(D.substr(0, 16)));
            date = date.format("YYYY-MM-DD");
            if (date == day) {
                if(row.ImgPath == null) {
                    row.ImgPath = 'images/default-profile.png';
                }
                counter++;
                str += '<li class="pending-booking">'
                           + '<div class="list-box-listing bookings">'
                               + '<div class="list-box-listing-img"><img src="' + row.ImgPath + '" alt=""></div>'
                               + '<div class="list-box-listing-content">'
                                   + ' <div class="inner">'
                                     + '<h3>' + row.FirstName + ' ' + row.LastName + '</h3>'
                                        + '<div class="inner-booking-list">'
                                           + '<h5>כתובת:</h5>'
                                            + '<ul class="booking-list">'
                                                + '<li class="highlighted">' + row.CityName + '</li>'
                                            + '</ul>'
                                        + '</div>'

                                        + '<div class="inner-booking-list">'
                                            + '<h5>סוג שירות:</h5>'
                                            + '<ul class="booking-list">'
                                                + '<li class="highlighted">' + row.ServiceName + '</li>'
                                            + '</ul>'
                                        + '</div>'

                                        + '<div class="inner-booking-list">'
                                            + '<h5>שעות:</h5>'
                                            + '<ul class="booking-list">'

                                    if (row.StartTime == null)
                                        str += '<li>יום מלא</li>'
                                    else
                                        str += '<li> ' + row.StartTime.Hours + ':' + row.StartTime.Minutes + '-' + row.EndTime.Hours + ':' + row.EndTime.Minutes + '</li>'
                                    str += '</ul>'
                                      + '</div>'
                                    if (row.UserId != user.UserId) {
                                        str += + '<a href="reportPage.html" class="rate-review popup-with-zoom-anim"><i class="sl sl-icon-envelope-open"></i> הפק דוח</a>'
                                    }
                                     
                                    + '</div>'
                                + '</div>'
                            + '</div>'
                        + '</li>'
            }
        });
    }

    str += "</ul>"
    $('#eventDayList').append(str);

};

