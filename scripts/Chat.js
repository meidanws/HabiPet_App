var user = '';
$(document).ready(function () {
  
    user = JSON.parse(localStorage.getItem("loginData")).User[0];
    getAllMesseges(user.UserId)
});

function getAllMesseges(UserId) {
    data = { UserId: UserId };
    ajax.sendWithData("UserAPI.asmx/GetMessages", data, Success, Error);
};

var MEreciver = "";
var Mesender = "";
function Success(data) {
    var res = JSON.parse(data.d).Inbox;
    var str = '<ul>'

    $.each(res, function (i, row) {      
        str += '<li class="unread" style="direction:rtl" onclick="loadchat('+row.User_Id+')">' +
        '<a href="ConversationPage.html" >' +
                            '<div class="message-avatar"><img src="' + row.ImgPath + '" /></div>' +
                            '<div class="message-by">' +
                                '<div class="message-by-headline">' +
                                    '<h5>' + row.FirstName + ' ' + row.LastName + ' </h5> <br />' +                                                               
                             '<span  dir="ltr">' + moment(row.Timestamp).startOf('hour').fromNow(); +'</span>' +
                                    '</div>' +
                                '</div>' +
                            '</a>' +
                        '</li>'           
    });
        str += '</ul>';
    $('#MyInbox').append(str);
};

function Error() {
    var ErrorStr = '<div><p style="text-align:center">תיבת ההודעות ריקה</p></div>';
    $('#MyInbox').append(ErrorStr);
}

function loadchat(partner) {  
    localStorage.setItem('ChatData', partner);
    document.location.href = "./ConversationPage.html";
}