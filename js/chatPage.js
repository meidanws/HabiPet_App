var user;
var AllMassage;
var chatUser;
$(document).ready(function () {

    user = JSON.parse(localStorage.getItem("loginData")).User[0];
    chatUser = JSON.parse(localStorage.getItem("ChatData"));

    data = {
        loginId:user.UserId,
        chatUser: chatUser
    }

    ajax.sendWithData("UserAPI.asmx/GetChat", data, SuccessChat, ErrorChat)

});

function CreateSideInbox() {

    var str = '<ul>'

    $.each(AllMassage, function (i, row) {
        str += '<li class="active-message">'
                                  + '<a href="dashboard-messages-conversation.html">'
                                      + '<div class="message-avatar"><img src="' + UserImg + '" alt="" /></div>'
                                      + '<div class="message-by">'
                                          + '<p>' + content + '</p>'
                                      + '</div>'
                                  + '</a>'
                              + '</li>'
    });
    str += '</ul>'
    $('#SideInbox').append(str);
};

function SuccessChat(data) {

    AllMassage = JSON.parse(data.d).Massages;
    chatUser = JSON.parse(data.d).chatUser;

    var str = '<h4>' + chatUser.FirstName + ' ' + chatUser.LastName + ''
                            + '<a href="ChatPage.html" style="font-size:20px; float:right">'
                              + '  <div class="im im-icon-Right-4"> </div>'
                           + ' </a>'
                        + '</h4>'
    $('#messageHead').append(str);

    str = '';

    $.each(AllMassage, function (i, row) {
        if (row.IsMine == 1) {
            str += '<div class="message-bubble me">'
                                + '<div class="message-text"><p>' + row.Text + '</p></div>'
                            + '</div>'
        }
        else {
            str += '<div class="message-bubble">'
                                    + '<div class="message-text"><p>' + row.Text + '</p></div>'
                                + '</div>'
        }
    });
    $('#massContent').append(str);

};

function ErrorChat() {
    alert('שגיאה');
};

$('#massSubmit').click(function () {
    str = '';
    var content = '' + $('#massText').val() + '';
    var timeStamp = new Date($.now());

    massage = {
        ResiverId: chatUser.userId,
        SenderId: user.userId,
        Text: content,
        Timestamp: timeStamp
    }

    str += '<div class="message-bubble me">'
                        + '<div class="message-text"><p>' + content + '</p></div>'
                    + '</div>'

    AllMassage.push(massage);
    $('#massContent').append(str);
});