var loginUser = "";
var userDList = "";

$(document).ready(function () {
 
    if (localStorage.getItem("searchData") == null)
        showPopup();
    else {
        userDList = JSON.parse(localStorage.getItem("searchData")).SearchPetsitter;
        if (userDList.length == 0)
            showPopup();
        else printResults(userDList);
    }
    loginUser = JSON.parse(localStorage.getItem('loginData')).User[0].UserId;
});

function showPopup() {
    swal('לא נמצאו תוצאות המתאימות לנתוני החיפוש');
    document.location.href = './SearchPage.html';
}

function showPetsitterProfile(petsitter) {
    alert(petsitter);
    localStorage.setItem('selectedPetsitter', petsitter);
    document.location.href = "./listings-single-page.html";
}

function printResults(userDList) {
    $('#petssiterList').empty();
    var petSitterItem = '';
    for (var i = 0; i < userDList.length; i++) {
        if (userDList[i].ImgPath == null)
            userDList[i].ImgPath = './images/default-profile.png';


        petSitterItem += '<div id="selectedPetsitter_' + userDList[i].UserId + '" class="col-lg-12 col-md-12" >' +
            '<div class="listing-item-container list-layout">' +
            '<div id="userItem_' + userDList[i].FirstName + '" class="listing-item")>' +

            //Image
            '<div class="listing-item-image" onclick="showPetsitterProfile(' + userDList[i].UserId + ')">' +
            '<img src="' + userDList[i].ImgPath + '" alt="petsitterImage">' +
            '</div>' +

            //Content
            '<div class="listing-item-content">' +
            '<div class="listing-item-inner">' +
            '<h3>' + userDList[i].FirstName + " " + userDList[i].LastName + '</h3>';
        //petSitterItem += '<span>' + (petsitter.CityName == null) ? "" : petsitter.CityName + ', ' + (petsitter.StreetName == null) ? "" : petsitter.StreetName + '</span>';

        petSitterItem += '<div class="star-rating" data-rating="' + userDList[i].Rate + '">' +
    '<div class="rating-counter">(' + userDList[i].ReviewCount + ' ביקורות)</div>' +
    '</div>' +
    '</div>' +

    '<span id="' + userDList[i].UserId + '" class="like-icon" onclick="likeClicked(this)"></span >' +
    '</div>' +
    '</div>' +
    '</div>' +
    '</div>'
    }
    $('#petssiterList').append(petSitterItem);

    numericalRating('.numerical-rating');

    starRating('.star-rating');
}

function numericalRating(ratingElem) {

    $(ratingElem).each(function () {
        var dataRating = $(this).attr('data-rating');

        // Rules
        if (dataRating >= 4.0) {
            $(this).addClass('high');
        } else if (dataRating >= 3.0) {
            $(this).addClass('mid');
        } else if (dataRating < 3.0) {
            $(this).addClass('low');
        }

    });

}

function likeClicked(item) {   
        t = {
            userId: loginUser,
            petsitterId: item.id
        }
        ajax.sendWithData("PetSitterAPI.asmx/Favorite", t, SuccessFavorite, ErrorFavorite);
};

function SuccessFavorite() {
    
}

function ErrorFavorite() {

}


$('#sort').change(function () {

    sortBy = $('#sort').val();

    switch (sortBy) {

        case "-1":
            printResults(userDList);
            break;
        case "1":
            var temp = userDList;
            temp.sort(function (a, b) {
                return parseFloat(b.Rate) - parseFloat(a.Rate);
            });
            printResults(temp);
            break;
        case "2":
            var temp = userDList;
                temp.sort(function (a, b) {
                return parseFloat(a.Rate) - parseFloat(b.Rate);
            });
            printResults(temp);
            break;

    }

});

///*  Star Rating
///*--------------------------*/
function starRating(ratingElem) {

    $(ratingElem).each(function () {

        var dataRating = $(this).attr('data-rating');

        // Rating Stars Output
        function starsOutput(firstStar, secondStar, thirdStar, fourthStar, fifthStar) {
            return ('' +
                '<span class="' + firstStar + '"></span>' +
                '<span class="' + secondStar + '"></span>' +
                '<span class="' + thirdStar + '"></span>' +
                '<span class="' + fourthStar + '"></span>' +
                '<span class="' + fifthStar + '"></span>');
        }

        var fiveStars = starsOutput('star', 'star', 'star', 'star', 'star');

        var fourHalfStars = starsOutput('star', 'star', 'star', 'star', 'star half');
        var fourStars = starsOutput('star', 'star', 'star', 'star', 'star empty');

        var threeHalfStars = starsOutput('star', 'star', 'star', 'star half', 'star empty');
        var threeStars = starsOutput('star', 'star', 'star', 'star empty', 'star empty');

        var twoHalfStars = starsOutput('star', 'star', 'star half', 'star empty', 'star empty');
        var twoStars = starsOutput('star', 'star', 'star empty', 'star empty', 'star empty');

        var oneHalfStar = starsOutput('star', 'star half', 'star empty', 'star empty', 'star empty');
        var oneStar = starsOutput('star', 'star empty', 'star empty', 'star empty', 'star empty');

        var HalfStar = starsOutput('star half', 'star empty', 'star empty', 'star empty', 'star empty');
        var zeroStar = starsOutput('star empty', 'star empty', 'star empty', 'star empty', 'star empty');

        // Rules
        if (dataRating >= 4.75) {
            $(this).append(fiveStars);
        } else if (dataRating >= 4.25) {
            $(this).append(fourHalfStars);
        } else if (dataRating >= 3.75) {
            $(this).append(fourStars);
        } else if (dataRating >= 3.25) {
            $(this).append(threeHalfStars);
        } else if (dataRating >= 2.75) {
            $(this).append(threeStars);
        } else if (dataRating >= 2.25) {
            $(this).append(twoHalfStars);
        } else if (dataRating >= 1.75) {
            $(this).append(twoStars);
        } else if (dataRating >= 1.25) {
            $(this).append(oneHalfStar);
        } else if (dataRating >= 0.75) {
            $(this).append(oneStar);
        } else if (dataRating >= 0.25) {
            $(this).append(HalfStar);
        } else if (dataRating < 0.25) {
            $(this).append(zeroStar);
        }

    });

}