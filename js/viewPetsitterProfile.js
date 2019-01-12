var petsitter = '';
var petsitterProfile = '';

$(document).ready(function () {

    petsitter = JSON.parse(localStorage.getItem("searchData")).SearchPetsitter;

    selectedPetsitterId = JSON.parse(localStorage.getItem("selectedPetsitter"));

    //filterData = JSON.parse(localStorage.getItem("FilterData"));

    data = { petsitterId: selectedPetsitterId };

    ajax.sendWithData("PetSitterAPI.asmx/GetPetsitter", data, SuccessPetsitter, ErrorPetsitter);

    //var c = setInterval(function () {
    //    if (counter > 0) {
    //        counter--;
    //        $('<img/>', {
    //            id: 'loader',
    //            src: '../images/ajax-loader.gif'
    //        }).appendTo('body');
    //    }
    //    else {
    //        $('#loader').remove();
    //        ajax.sendWithData("PetSitterAPI.asmx/GetPetsitter", data, SuccessPetsitter, ErrorPetsitter);
    //        clearInterval(c);
    //    }
    //}, 1000);
});

function showPopup() {
    alert('לוקל ריק');
}

function ErrorPetsitter(a, b, c) {
    alert('error');
    alert("a:\n" + JSON.stringify(a));
    alert("b:\n" + JSON.stringify(b));
    alert("c:\n" + JSON.stringify(c));
}

function SuccessPetsitter(data) {
    petsitterProfile = JSON.parse(data.d).PetsitterProfile[0];
    petsitterPriceList = JSON.parse(data.d).PetsitterPriceList;
    petsitterPets = JSON.parse(data.d).PetsitterPets;
    PetsitterTitlebar(petsitterProfile);
    PetsitterPricingList(petsitterPriceList);
    if (petsitterPets.length > 0) {
        PetsitterPetsList(petsitterPets);
    }
    //PetsitterPricingList(petsitterProfile.PriceList);
    //if (petsitterProfile.UserPets.length > 0) {
    //    PetsitterPetsList(petsitterProfile.UserPets);
    //}
    data = { petsitterId: selectedPetsitterId };
    ajax.sendWithData("PetSitterAPI.asmx/GetPetsitterReviews", data, SuccessReviews, ErrorPetsitter)


    //create dynamic petsitter profile

    //create petsitter Titlebar
    function PetsitterTitlebar(petsitter) {
        if (petsitter.ImgPath == null) {
            petsitter.ImgPath = 'images/default-profile.png'
        }
        var str = '<div class="avatar"><img src="' + petsitter.ImgPath + '" alt="" /></div>'
            + '<h2>' + petsitter.FirstName + " " + petsitter.LastName + '</h2>'

        if (petsitter.CityName != null) {
            str += '<span>'
                + '<a href="#listing-location" class="listing-address">'
                + '<i class="fa fa-map-marker"></i>'
                + ' ' + petsitter.CityName
            if (petsitter.Street != null) {
                str += ', ' + petsitter.Street + ' ';
                if (petsitter.HouseNumber != null) {
                    str += petsitter.HouseNumber + ''
                }
            }
        }

        str += '<div id="mainRating" class="star-rating" data-rating="' + petsitter.Rate + '">'
            + '<div class="rating-counter" id="profileReview"><a href="#listing-reviews">(' + petsitter.ReviewCount + ' ביקורות )</a></div>'
            + '</div>'
        $('#titlebar').append(str);

        if (petsitter.About != null) {
            str = '<p>' + petsitter.About + '</p>';
            $('#listing-overview').append(str);
        }
        numericalRating('.numerical-rating');
        starRating('.star-rating');
    }

    //create petsitter pricing list
    function PetsitterPricingList(petsitterPriceList) {
        var str = '<div class="pricing-list-container"><h4>מחירון</h4><ul>'
        $.each(petsitterPriceList, function (i, row) {
            str += '<li><h5>' + row.ServiceName + '</h5>'
                + '<p>' + row.Description + '</p>'
                + '<span> ' + row.Price + ' ש"ח</span></li>'
        });
        str += '</ul></div>'
        $('#listing-pricing-list').append(str);
    }

    //create dynamic petsitter pets list
    function PetsitterPetsList(petsitterPets) {
        var str = '<div class="pricing-list-container"> <h4>בעלי החיים שלי</h4>  <ul class="social-icons rounded">'
        $.each(petsitterPets, function (i, row) {
            if (row.ImgPath == null) {
                row.ImgPath = 'images/default-profile.png'
            }
            str += ' <li><div class="avatar"><img src="' + row.ImgPath + '" alt=""></div></li>'
        });
        str += '</ul><div class="clearfix"></div></div>'
        $('#petssiterPetList').append(str);
    }


    //create dynamic reviews list
    function SuccessReviews(data) {
        //e.preventDefault();
        petsitterReviews = JSON.parse(data.d).PetsitterReviews;
        $('#listing-reviews').empty();
        $('#reviewText').val("");
        //run on each element to set property to unchecked
        $("input[type=radio][name=rating]").each(function () {
            $(this).prop('checked', false);
        });

        var str = '<div class="pricing-list-container"><h4>ביקורות (' + petsitterProfile.ReviewCount + ') </h4>'
            + '<div class="clearfix"></div> <section class="comments listing-reviews"> <ul>'
        $.each(petsitterReviews, function (i, row) {
            if (row.ImgPath == null) {
                row.ImgPath = 'images/default-profile.png';
            }
            str += '<li>'
                + ' <div class="avatar"><img src="' + row.ImgPath + '" alt="" /></div>'
                + ' <div class="comment-content"> <div class="arrow-comment"></div> <div class="comment-by" style:"font-size:18px">'
                + row.FirstName + ' ' + row.LastName + '<span class="date" style="font-size:15px">' + new Date(moment(row.Timestamp)).toLocaleDateString() + '</span>'
                + '<div class="star-rating" data-rating="' + row.Rate + '"></div></div>'
                + '<p style="max-width:65%;float:right">' + row.ReviewText + '</p>'
                + ' <div class="review-images mfp-gallery-container">'
                + ' </div></div></li>'
        });

        str += ' </ul> </section></div></div>'
        $('#listing-reviews').append(str);

        numericalRating('.numerical-rating:not(#mainRating)');
        starRating('.star-rating:not(#mainRating)');

    }

    $('#sign-in-dialog').click(function () {
        $('#selectedService').val(filterData.ServiceId);
        $('#selectedStartDate').val(filterData.StartD);
        $('#selectedEndDate').val(filterData.endD);
        $('#.booking-time').val(filterData.StartT);
        $('#.booking-time2').val(filterData.EndT);
    });


    //insesrt new review
    $('#ReviewSubmit').click(function (e) {

        e.preventDefault();

        var rate = $("input[type=radio][name=rating]:checked").val();
        var timeStamp = new Date($.now());
        var user = JSON.parse(localStorage.getItem("loginData")).User[0];
        var text = $('#reviewText').val();

        var data = {
            UserId: user.UserId,
            PetsitterId: petsitterProfile.UserId,
            Rate: rate,
            ReviewText: text,
            Timestamp: timeStamp,
        }
        //ajax.sendWithData("PetSitterAPI.asmx/InsertReview", data, function () { location.reload(); }, ReviewsListError)
        ajax.sendWithData("PetSitterAPI.asmx/InsertReview", data, ReviewsListSuccess, ReviewsListError)
    });

    function ReviewsListSuccess(data) {
        //{ location.reload();}
        var res = JSON.parse(data.d).PetsitterReviews;
        if (res.length > 0 && res != 0) {
            petsitterProfile.ReviewCount++;

            $('#profileReview').html('(' + petsitter.ReviewCount + ' ביקורות )');

            $('#profileReview').html(petsitterProfile.ReviewCount);

            SuccessReviews(data);
        }
        else
            alert('שגיאה');
    }

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

}


