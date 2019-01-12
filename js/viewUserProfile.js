var user = '';
var petsitterProfile = '';

$(document).ready(function () {

    if (localStorage.getItem("loginData") == null)
        showPopup1();
    else {
        user = JSON.parse(localStorage.getItem("loginData")).User[0];
        if (user == undefined)
            showPopup2();
        else {
            data = { petsitterId: user.UserId };
            ajax.sendWithData("PetSitterAPI.asmx/GetPetsitter", data, SuccessPetsitter, ErrorPetsitter);
        };
    }
    getCities();
});
function showPopup2() {
    alert("user undefined");
}

function showPopup1() {
    alert("loginData null");
}

function ErrorPetsitter(response) {
    alert("error:\n" + JSON.stringify(response));
}

function SuccessPetsitter(data) {
    petsitterProfile = JSON.parse(data.d).PetsitterProfile[0];
    petsitterPriceList = JSON.parse(data.d).PetsitterPriceList;
    petsitterPets = JSON.parse(data.d).PetsitterPets;
    if (petsitterProfile.IsVisable) {
        $('#isAvillable').prop('checked', true);
    }
    PetsitterTitlebar(petsitterProfile);
    PetsitterPricingList(petsitterPriceList);
    PetsitterPetsList(petsitterPets);
    data = { petsitterId: user.UserId };
    ajax.sendWithData("PetSitterAPI.asmx/GetPetsitterReviews", data, SuccessReviews, ErrorPetsitter)
}

//create dynamic petsitter profile

//create petsitter Titlebar

function PetsitterTitlebar(petsitter) {

    if (petsitter.ImgPath == null) {
        petsitter.ImgPath = 'images/default-profile.png'
    }
    var str = '<div class="avatar"><img src="' + petsitter.ImgPath + '" alt="" /> <div class="im im-icon-Pencil" style="width:27px;" onclick="EditProfileImg()"></div> </div>'
                       + '<h2>' + petsitter.FirstName + " " + petsitter.LastName + '</h2>'

    if (petsitter.CityName != null) {
        document.getElementById("CityName").value = petsitter.CityName;
        document.getElementById("StreetName").value = petsitter.Street;
        document.getElementById("HouseNumber").value = petsitter.HouseNumber;

        str += '<span>'
                 + '<a href="#listing-location" class="listing-address">'
                    + '<i class="fa fa-map-marker"></i>'
                    + ' ' + petsitter.CityName 
        if (petsitter.Street != "") {
            str += ', ' + petsitter.Street + ' ';
            if (petsitter.HouseNumber != "") {
                str += petsitter.HouseNumber + ''
            }
        }
       
                + '</a>'
              + '</span>'
    }

    str += '<div class="star-rating" data-rating="' + petsitter.Rate + '">'
                        + '<div class="rating-counter"><a href="#listing-reviews">(' + petsitter.ReviewCount + ' ביקורות )</a></div>'
                      + '</div>'
    $('#titlebar').append(str);

    if (petsitter.About != null) {
        str = '<p>' + petsitter.About + '</p>';
        $('#listing-overview').append(str);
    }
    numericalRating('.numerical-rating');
    starRating('.star-rating');
}

var petsitterPriceListEdit = "";
//create petsitter pricing list
function PetsitterPricingList(petsitterPriceList) {
    petsitterPriceListEdit = petsitterPriceList;
    var str = '<div class="pricing-list-container"><h4 onclick="EditPriceList()">מחירון<div class="im im-icon-Pencil" style="width:27px;float:left" > </div></h4>   <ul>'
    $.each(petsitterPriceList, function (i, row) {
        str += '<li><h5>' + row.ServiceName + '</h5>'
                                   + '<p>' + row.Description + '</p>'
                                    + '<span> ' + row.Price + ' ש"ח</span></li>'
    });
    str += '</ul> </div>'
    $('#listing-pricing-list').append(str);
}

//create dynamic petsitter pets list
function PetsitterPetsList(petsitterPets) {
    temppetsitterPets = petsitterPets;
    var str = '<div class="pricing-list-container"> <h4 onclick="openPopup()">בעלי החיים שלי <i class="im im-icon-Pencil" style="width:27px;float:left" > </i></h4><ul id="MyPets" class="social-icons rounded">'
    $.each(petsitterPets, function (i, row) {
        if (row.ImgPath == null) {
            str += ' <li><div class="avatar"><img src="images/default-profile.png" alt=""></div></li>'
        }
        else {
            str += ' <li><div class="avatar"><img src="' + row.ImgPath + '" alt=""></div></li>'
        }
    });
    str += '</ul><div class="clearfix"></div></div>'
    $('#petssiterPetList').append(str);
}

function openPopup() {
    $('[href="#sign-in-dialog"]').click();
}

//create dynamic reviews list
function SuccessReviews(data) {
    petsitterReviews = JSON.parse(data.d).PetsitterReviews;
    if (petsitterReviews.length == 0) {
        var str = '<div class="pricing-list-container"> <h4 >ביקורות</h4> '
               + '<div class="clearfix"></div> <section class="comments listing-reviews"> <ul>  <li>אין כרגע ביקורות</li>'

    }
    else {
        var str = '<h3 class="listing-desc-headline margin-top-20 margin-bottom-20"><span>(' + petsitterReviews.ReviewCount + ') ביקורות</span></h3>'
                       + '<div class="clearfix"></div> <section class="comments listing-reviews"> <ul>'
        $.each(petsitterReviews, function (i, row) {
            str += '<li>'
                + ' <div class="avatar"><img src="' + row.ImgPath + '" alt="" /></div>'
                + ' <div class="comment-content"> <div class="arrow-comment"></div> <div class="comment-by">'
                + row.FirstName + ' ' + row.LastName + '<span class="date">June 2017</span>'
                + '<div class="star-rating" data-rating="' + petsitterReviews.Rate + '"></div></div>'
                + '<p>' + row.ReviewText + '</p>'
                + ' <div class="review-images mfp-gallery-container">'
                + ' </div></div></li>'
        });
    }
    str += ' </ul> </section></div></div>'
    $('#listing-reviews').append(str);

}

//insesrt new review
$('#ReviewSubmit').click(function () {

    var rate = $("input[type=radio][name=rating]:checked").val();
    var timeStamp = new Date($.now());

    var data = {
        UserId: "",
        PetsitterId: petsitterProfile.UserId,
        Rate: rate,
        ReviewText: $('#reviewText').val(),
        Timestamp: timeStamp,
    }
    ajax.sendWithData("PetSitterAPI.asmx/InsertReview", data, PetsitterReviewsList, ReviewsListError)
});


function ReviewsListError() {
    alert('שגיאה');
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

// *When click on edit profile picture
///*--------------------------*/
var fileBinary = "";
var fileName ="";
var accept = {
    binari: ["image/png", "image/jpeg"]
};

function EditProfileImg() {
    $('#inputFile').click();
    var inputElement = document.getElementById("inputFile");
    inputElement.addEventListener("change", handleFiles, true);
    function handleFiles(files) {
        file = this.files[0]; // 
        fileName = file.name;
        if (accept.binari.indexOf(file.type) > -1) {
            var reader = new FileReader();
            reader.onload = function () {
                fileBinary = reader.result;
                saveToDB();
            };
            reader.readAsDataURL(file); //Convert the file to binari file for saving into the DB
            if (fileBinary != "") {

            }

        }
        else { alert("try again") };
    }
};

function saveToDB() {
    var data = {
        UserId: user.UserId,
        Image: fileBinary,
        imageName: fileName
    };
    ajax.sendWithData("PetsitterAPI.asmx/InsertProfilePicture", data, SuccessInsertProfilePicture, ErrorInsertProfilePicture);
}

function SuccessInsertProfilePicture() {
    location.reload(true);
};

function ErrorInsertProfilePicture() {

};

// *When click on edit price list
///*--------------------------*/

var tempServiceName = "";
function EditPriceList() {
    ajax.sendWithoutData("PetsitterAPI.asmx/GiveAllServices", SuccessBla, ErrorBla);
};

var tempValue = "";
function SuccessBla(data) {
    var Service = JSON.parse(data.d).Services;
    var petsitterPriceList = petsitterPriceListEdit; // will be all the services of the petsitter from DB
    $('#listing-pricing-list').empty();
    //create petsitter pricing list
    var str = '<div class="pricing-list-container"><h4 onclick="ExitEdit()">מחירון<div class="fa fa-ban" style="width:27px;float:left" > </div></h4>'
    str += '<ul>'
    $.each(Service, function (i, row) {
        str += '<li><h5>' + row.ServiceName + '</h5>' + '<p>' + row.Description + '</p>';
        $.each(petsitterPriceList, function (i, temp) {
            if (temp.ServiceId == row.ServiceId) {
                tempValue = temp.Price;
                return false;
            }
            else {
                tempValue = 0;
            }
        });
        str += '<span> ' + '<input type="text" id="row.ServiceId" style="width:60px;float:right"  onchange="UpdatePriceList(' + row.ServiceId + ',this.value)" value="' + tempValue + '"></input> &nbsp' + ' ש"ח</span></li>'
    });
    str += '</ul> </div>'
    $('#listing-pricing-list').append(str);
}

function ErrorBla() {

}

function ExitEdit() {
    location.reload(true);
}

function UpdatePriceList(Serviceid, value) {
    var data = {
        PetSitterId: user.UserId,
        ServiceId: Serviceid,
        Price: value
    };
    ajax.sendWithData("PetsitterAPI.asmx/UpdatePriceForService", data, SuccessUpdatePriceForService, ErrorUpdatePriceForService);

};

function SuccessUpdatePriceForService() {
}

function ErrorUpdatePriceForService() {
}

// *When click on edit Pets list
///*--------------------------*/

//if Add Dog
function AddNewPet(pet) {
    switch (pet) {
        case "dog":
            var name = $('#DogName')[0].value;
            var gender = $('#DogGender')[0].value;
            var TypeId = 1;
            if (gender == "נקבה") { gender = 2; }
            else { gender = 1 };
            var sizeid = $('#DogSize').find('option:selected').attr('id');
            if ($('#PetImg')[0] != null) {
                var image = $('#PetImg')[0].src;
            }
            else {
                var image = "null";
                fileName2 - "null";
            }
            var description = $('#DogDescription')[0].value;
            break;
        case "cat":
            var name = $('#CatName')[0].value;
            var gender = $('#CatGender')[0].value;
            var TypeId = 2;
            if (gender == "נקבה") { gender = 2; }
            else { gender = 1 };
            var sizeid = 0;
            if ($('#PetImg')[0] != null) { var image = $('#PetImg')[0].src; }
            else { var image = "null"; }
            var description = $('#CatDescription')[0].value;
            break;
        default:
    };
    var data = {
        PetName: name,
        PetGender: gender,
        UserId: user.UserId,
        TypeId: TypeId,
        SizeId: sizeid,
        ImgPath: image,
        Description: description,
        imageName:fileName2
    };
    ajax.sendWithData("PetsitterAPI.asmx/UpdatePetList", data, SuccessUpdatePetList, ErrorUpdatePetList);
}

//if Add Cat
function AddNewCat() {
    alert("CAT!");
}

$('#DogImg').click(function () {
    OpenFile("dog");

});

$('#CatImg').click(function () {
    OpenFile("cat");
});


var fileBinary2 = "";
var fileName2 ="";
function OpenFile(pet) {

    $('#inputFile2').click();
    var inputElement = document.getElementById("inputFile2");
    inputElement.addEventListener("change", handleFiles2, true);
    function handleFiles2(files) {
        file = this.files[0]; // 
        fileName2 = file.name;
        if (accept.binari.indexOf(file.type) > -1) {
            var reader = new FileReader();
            reader.onload = function () {
                fileBinary2 = reader.result;
                saveToDB2(pet);
            };
            reader.readAsDataURL(file); //Convert the file to binari file for saving into the DB
        }
    }
};

function SuccessUpdatePetList() {
    location.reload(true);
}

function ErrorUpdatePetList() {
    alert("FAIL PET");
}

function saveToDB2(pet) {
    $('#CatImgLabel').empty();
    $('#DogImgLabel').empty();
    var img = document.createElement("img"); // make img elmenent 
    img.id = "PetImg";
    img.src = fileBinary2; // add the binari img URL into the img element that we created
    if (pet == "dog") {
        $("#DogImgLabel").css("display", "block"); // Show the div of the img in the report page
        $('#DogImgLabel').html(img); //add the img element with the img that the user choose into the HTML
    }
    else {
        $("#CatImgLabel").css("display", "block"); // Show the div of the img in the report page
        $('#CatImgLabel').html(img); //add the img element with the img that the user choose into the HTML
    }
}


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

};

function getCities() {
    ajax.IsraelCities(SuccessCities, ErrorCities);
}

function SuccessCities(data) {
    var str = "<select id='CityName' class='AreaText'>";
    $.each(data, function (i, val) {
        str += "<option>" + data[i].name + "</option>"
    });
    str += "</select>"
    $('#getCities').append(str);

}

function ErrorCities() {

};

$('#isAvillable').click(function () {
    if ($(this).prop('checked')) {
        var IsVisable = "true";
    }
    else {
        var IsVisable = "false";
    }
    var data = {
        PetsitterId: user.UserId,
        IsVisable: IsVisable
    };
    ajax.sendWithData("PetsitterAPI.asmx/UpdatePetsitterVisable", data, SuccessUpdatePetsitterVisable, ErrorUpdatePetsitterVisable);
});
function SuccessUpdatePetsitterVisable() {
   
}
function ErrorUpdatePetsitterVisable() {
};

$('#UpdateCity').click(function () {
    var cityName = document.getElementById("CityName").value;
    var streetName = document.getElementById("StreetName").value;
    var houseNumber = document.getElementById("HouseNumber").value;
    if (cityName == "עיר מגורים") {
        swal("נא הזן עיר מגורים");
    }
    else {
        if (streetName == "") {
            streetName = "NULL";
        }
        if (houseNumber == "") {
            houseNumber ="NULL";
        }
        var data = {
            userId: user.UserId,
            cityName: cityName,
            streetName: streetName,
            houseNumber: houseNumber
        };
        ajax.sendWithData("PetsitterAPI.asmx/UpdateCity", data, SuccessUpdateCity, ErrorUpdateCity);
    }

});

function SuccessUpdateCity() {
    location.reload(true);
}

function ErrorUpdateCity() {

}






