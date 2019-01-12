
//$(document).on('submit', '#loginBTN', function (e) {
//    e.preventDefault();

var request = {
    email: "",
    password: ""
}


function activateAjaxLogin() {

    request.email = $('#loginEmail').val();
    request.password = $('#loginPassword').val();
    data = request;
    ajax.sendWithData("UserAPI.asmx/CheckUser", data, SuccessLogin, Error);
};


function SuccessLogin(data) {
    var res = JSON.parse(data.d);
    if (res[0] == 0) {
        alert("שגיאה");
    } 
    res = JSON.parse(data.d).User;
    if (res[0] != null) {
        //check if user details need  to be saved
        if ($('#remember-me').prop("checked")) {
            setCookie("userEmail", request.email, 365);
            setCookie("userPassword", request.password, 365);
        }
        else {
            //delete all cookies
            document.cookie = "userEmail=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
            document.cookie = "userPassword=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        }
        //navigator.notification.alert('Welcome To HabiPet App');
        localStorage.setItem('loginData', data.d);
        document.location.href = "./SearchPage.html";
    }
    else {
        swal("שם משתמש או סיסמא לא נכונים");
    }
}

function Error(a,b,c) {
    alert(JSON.stringify(a))
    alert(JSON.stringify(b))
    alert(JSON.stringify(c))
    alert("FUCK!");
}

//______________Cookies_____________///

//set new cookies
function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toGMTString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

//get cookies values
function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

//check existing cookies
function checkCookie() {
    var userEmail = getCookie("userEmail");
    var userPassword = getCookie("userPassword");
    $('#loginEmail').val(userEmail);
    $('#loginPassword').val(userPassword);

    if (userEmail != "" && userPassword != "") {
        $('#remember-me').prop("checked", true);
    }
    //else {
    //    $('#loginEmail').val(userEmail);
    //    $('#loginPassword').val(userPassword);
    //}
}




//__________FACEBOOK LOGIN______________

//function logIn() {
//    FB.logIn(function (response) {
//        console.log(response)
//    })
//}

//window.fbAsyncInit = function() {
//      FB.init({
//          appId: '219782955462927',
//          autoLogAppEvents : true,
//          xfbml            : true,
//          version          : 'v3.0'
//      });
//  };

//(function(d, s, id){
//    var js, fjs = d.getElementsByTagName(s)[0];
//    if (d.getElementById(id)) {return;}
//    js = d.createElement(s); js.id = id;
//    js.src = "https://connect.facebook.net/en_US/sdk.js";
//    fjs.parentNode.insertBefore(js, fjs);
//}(document, 'script', 'facebook-jssdk'));

//______________Register_____________///

var registerRequest = {
    name: "",
    lastName: "",
    email: "",
    password: ""
}


function activateAjaxRegister() {
    registerRequest.name = document.getElementById('registerName').value;
    registerRequest.lastName = document.getElementById('registerLastname').value;
    registerRequest.email = document.getElementById('registerEmail').value;
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!registerRequest.email.match(mailformat)) {
        swal("מייל לא חוקי, נסה שנית");
        return;
    }

    if (document.getElementById('registerPassword1').value != document.getElementById('registerPassword2').value) {
        swal("סיסמא לא זהה");
        return;
    }
    else {
        registerRequest.password = document.getElementById('registerPassword1').value;
        data = registerRequest;
        ajax.sendWithData("UserAPI.asmx/AddUser", data, SuccessRegister, ErrorRegister);
    }

};



function SuccessRegister(data) {
    swal("נרשמת למערכת בהצלחה", "HabiPet-ברוך הבא ל", "success");
    document.location.href = "#tab1";
};

function ErrorRegister() {
    swal("שגיאה");
}

