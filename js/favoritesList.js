var user = "";

$(document).ready(function () {
    user = JSON.parse(localStorage.getItem("loginData")).User[0];
    data = { UserId: user.UserId };
    ajax.sendWithData("UserAPI.asmx/GetFavoritesList", data, printResults, Error);
});

var petSitterItem = "";
function printResults(data){
    var userDList = JSON.parse(data.d).Favorites;
    if (userDList.length != 0) {      
        for (var i = 0; i < userDList.length; i++) {
            if (userDList[i].ImgPath == null)
                userDList[i].ImgPath = './images/default-profile.png';

            petSitterItem += '<div class="col-lg-12 col-md-12">' +
            '<div class="listing-item-container list-layout">' +
               ' <a href="#" class="listing-item">' +

                   ' <div class="listing-item-image"  onclick="showPetsitterProfile(' + userDList[i].PetsitterId + ')">' +
                       '<img src="' + userDList[i].ImgPath + '" alt="">' +
                    '</div>' +


                    '<div class="listing-item-content">' +
                        '<div class="listing-badge now-open">Now Open</div>' +

                        '<div class="listing-item-inner">' +
                            '<h3>' + userDList[i].FirstName + " " + userDList[i].LastName + '</h3>' +
                       ' </div>' +

                        '<span class="like-icon liked" onclick="likeClicked(this)"></span>' +
                    '</div>' +
                '</a>'
            '</div>' +
        '</div>'
        }
        $('#favoritesList').append(petSitterItem);
    }
    else {
            str ="<p style='text-align:center; color:#50C5B7'>- עדיין לא בחרת פטסיטרס מועדפים - </p>";
            $('#favoritesList').append(str);
    }
    }

    function Error() {

    };

    function showPetsitterProfile(petsitter) {
        localStorage.setItem('selectedPetsitter', petsitter);
        document.location.href = "./listings-single-page.html";
    }

    function likeClicked(item) {
        if (item.className == "like-icon liked") {
            item.className = "like-icon"
            $(item).css("background-color", "rgba(32,32,32,0.4)");
        }
        else {
            item.className = "like-icon liked"
            $(item).css("background-color", "#f3103c");
        }

    };
