




$(document).ready(function () {

    user = JSON.parse(localStorage.getItem("loginData")).User[0];

    SearchFilter = {
        UserId: user.UserId,
        AnimalType: "",
        SizeCategory: "null",
        ServiceId: "",
        Price: "",
        LivingArea: "null",
        StartDate: "",
        EndDate:"",
        StartTime: "null",
        EndTime: "null",
    };


    $('#booking-time, #booking-time2').timeDropper({
        setCurrentTime: true,
        meridians: false,
        primaryColor: "#50C5B7",
        borderColor: "#50C5B7",
        format: 'HH:mm',
        minutesInterval: '15'
    });

    $('#booking-date-Start, #booking-date-End').dateDropper();

    setTimeout(getCities,4000);

    $(document).on('blur', '#booking-time', function () {
        var checkIfDoneT1 = setInterval(function () {
            if ($('#td-clock-0').hasClass('td-fadeout')) {
                clearInterval(checkIfDoneT1);
                SearchFilter.StartTime = $('#booking-time').val();
            }
        }, 50);
    });

    $(document).on('blur', '#booking-time2', function () {
        var checkIfDoneT1 = setInterval(function () {
            if ($('#td-clock-0').hasClass('td-fadeout')) {
                clearInterval(checkIfDoneT1);
                SearchFilter.EndDate = $('#booking-time2').val();
            }
        }, 50);
    });
});


$('#SearchButton').click(function() {
    //animal validation
    if (SearchFilter.AnimalType == "") {
        swal("שכחת להגיד לנו איזה סוג בעל חיים יש לך")
        return;
    }

    //dog size validation
    if (SearchFilter.AnimalType == "1" && (SearchFilter.SizeCategory == "-1" || SearchFilter.SizeCategory == "null")) {
        swal("?רגע, איזה גודל הכלב שלך")
        return;
    }

    //service validation
    if (SearchFilter.ServiceId == "") {
        swal("?איזה שירות אתה מחפש")
        return;
    }
    else {
        //if user have not changed date, set current date
        if (SearchFilter.StartDate == "") {
            var endD = $('#booking-date-Start').val();
            endD = endD.split("/");
            endD = endD[2] + "-" + endD[0] + "-" + endD[1];
            SearchFilter.StartDate = endD;
        }

        //if user have not changed date, set current date
        if (SearchFilter.EndDate == "") {
            var endD = $('#booking-date-End').val();
            endD = endD.split("/");
            endD = endD[2] + "-" + endD[0] + "-" + endD[1];
            SearchFilter.EndDate = endD;
        }

        //if user have not changed date, set current time
        if ((SearchFilter.ServiceId == "1" || SearchFilter.ServiceId == "2")) {

            //if ((SearchFilter.StartTime == "null" || SearchFilter.EndTime == "null") || (SearchFilter.StartTime == "null" && SearchFilter.EndTime == "null")) {
                if (SearchFilter.StartTime == "null") {
                    SearchFilter.StartTime = $('#booking-time').val();
                }
                if (SearchFilter.EndTime == "null") {
                    SearchFilter.EndTime = $('#booking-time2').val();
                }
            //}   
           //else if (SearchFilter.StartTime == SearchFilter.EndTime) {
           //     swal("שכחת לבחור שעות רצויות")
           //     return;
           // }
        }
    }

    //price validation. if user have not changed set defult price
    if (SearchFilter.Price == "") {
        SearchFilter.Price = $('#priceval').val();
    }

    //var filter =
    //{
    //    ServiceId: SearchFilter.ServiceId,
    //    StartD: SearchFilter.StartDate,
    //    endD: SearchFilter.EndDate,
    //    StartT: SearchFilter.StartTime,
    //    EndT: SearchFilter.EndTime
    //};

    //localStorage.setItem('FilterData', filter);

    data = SearchFilter;
    ajax.sendWithData("PetSitterAPI.asmx/SearchFilter", data, SuccessSearch, ErrorSearch)
});

function ErrorSearch(a, b, c) {

    console.log(a);
    console.log(b);
    console.log(c);
}

function SuccessSearch(data) {
    localStorage.setItem('searchData', data.d);
    document.location.href = "./listings-list-full-width.html";
}


$('#booking-date-Start').change(function () {

    var endD = $('#booking-date-Start').val();
    endD = endD.split("/");
    endD = endD[2] + "-" + endD[0] + "-" + endD[1];
    SearchFilter.StartDate = endD;
});

$('#booking-date-End').change(function () {

    var startD = $('#booking-date-Start').val();
    var endD = $('#booking-date-End').val();

    //date valitation
    if (endD < startD) {
        swal("שים לב, תאריך הסיום חל לפני תאריך ההתחלה");
        return;
    }
    
    endD = endD.split("/");
    endD = endD[2] + "-" + endD[0] + "-" + endD[1];
    SearchFilter.EndDate = endD;
});

$('#booking-time').change(function () {
    SearchFilter.StartTime = $('#booking-time').val();
});


$('#booking-time2').change(function () {

    var startD = $('#booking-time').val();
    var endD = $('#booking-time2').val();

    //time validation
    if (endD < startD) {
        swal("שים לב, שעת הסיום חלה לפני שעת ההתחלה");
        return;
    }

    if (endD == startD) {
        swal("עליך לבחור טווח שעות");
        return;
    }

    SearchFilter.EndTime = endD
});


$('#priceval').change(function () {
    SearchFilter.Price = $('#priceval').val();
});


function GetAnimalType(value) {

    
    if (SearchFilter.AnimalType != "") { //restart search
        SearchFilter.Price = ""
        SearchFilter.AnimalType = ""
        SearchFilter.SizeCategory = "null"
        ChoosenService("");
        SearchFilter.StartDate = ""
        SearchFilter.EndDate = ""
        SearchFilter.StartTime = "null"
        SearchFilter.EndTime = "null"
    }
     $('#DateAndTimeDiv').css("display", "none");

    var AnimalType = value.split("_");
    AnimalType = AnimalType[1];
    SearchFilter.AnimalType = AnimalType;

    if (AnimalType == "1") {
        $('#SizeOfDogs').css("display", "block")
        $('#service_1Div').css("display", "block")
        $('#service_2Div').css("display", "block")
        $('#type_2').css("background-color", "#50C5B7")
        $('#type_1').css("background-color", "#533A71")
    }
    else {
        $('#SizeOfDogs').css("display", "none")
        $('#service_1Div').css("display", "none")
        $('#service_2Div').css("display", "none")
        $('#type_1').css("background-color", "#50C5B7")
        $('#type_2').css("background-color", "#533A71")
    }
}


$('#selectedSize').change(function (){
    SearchFilter.SizeCategory = $('#selectedSize').val();
});

function ChoosenService(value) {
    var serviceId = value.split("_");
    serviceId = serviceId[1];
    SearchFilter.ServiceId = serviceId;
    $('#DateAndTimeDiv').css("display", "block");

   
    switch (serviceId) {
        case "1":
            $("#service_1").css("background-color", "#533A71")
            $("#service_2").css("background-color", "#50C5B7")
            $("#service_3").css("background-color", "#50C5B7")
            $("#service_4").css("background-color", "#50C5B7")

            $('#TimeDiv').css("display", "block")

            break;

        case "2":
            $("#service_1").css("background-color", "#50C5B7")
            $("#service_2").css("background-color", "#533A71")
            $("#service_3").css("background-color", "#50C5B7")
            $("#service_4").css("background-color", "#50C5B7")

            $('#TimeDiv').css("display", "block")

            break;

        case "3":
            $("#service_1").css("background-color", "#50C5B7")
            $("#service_2").css("background-color", "#50C5B7")
            $("#service_3").css("background-color", "#533A71")
            $("#service_4").css("background-color", "#50C5B7")
            $('#TimeDiv').css("display", "none")
            break;

        case "4":
            $("#service_1").css("background-color", "#50C5B7")
            $("#service_2").css("background-color", "#50C5B7")
            $("#service_3").css("background-color", "#50C5B7")
            $("#service_4").css("background-color", "#533A71")
            $('#TimeDiv').css("display", "none")
            break;

        default:
            $("#service_1").css("background-color", "#50C5B7")
            $("#service_2").css("background-color", "#50C5B7")
            $("#service_3").css("background-color", "#50C5B7")
            $("#service_4").css("background-color", "#50C5B7")
            break;

    }

}
function getCities() {
    ajax.IsraelCities(SuccessCities, ErrorCities);
}

function SuccessCities(data) {
    var str = "<select id='citylist' class='chosen-select mybutton' onchange='LivingArea(this.value)'>";

    $.each(data, function (i, val) {
        str += "<option>" + data[i].name + "</option>"
    });
    str += "</select>"
    $('#Cities').append(str);
}


function LivingArea(value) {
    SearchFilter.LivingArea = value;
}

function ErrorCities() {
    //alert("EROR!");
}


