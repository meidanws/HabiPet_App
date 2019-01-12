// Default infoBox Rating Type
var infoBox_ratingType = 'star-rating';

(function ($) {
    "use strict";

    function mainMap() {

        // Locations
        // ----------------------------------------------- //
        var ib = new InfoBox();

        // Infobox Output
        function locationData(locationURL, locationImg, locationTitle, locationAddress, locationRating, locationRatingCounter) {
            return ('' +
              '<a href="' + locationURL + '" class="listing-img-container">' +
                 '<div class="infoBox-close"><i class="fa fa-times"></i></div>' +
                 '<img src="' + locationImg + '" alt="">' +

                 '<div class="listing-item-content">' +
                    '<h3>' + locationTitle + '</h3>' +
                    '<span>' + locationAddress + '</span>' +
                 '</div>' +

              '</a>' +

              '<div class="listing-content">' +
                 '<div class="listing-title">' +
                    '<div class="' + infoBox_ratingType + '" data-rating="' + locationRating + '"><div class="rating-counter">(' + locationRatingCounter + ' reviews)</div></div>' +
                 '</div>' +
              '</div>')
        }

        // Locations
        var locations = [
          [locationData('listings-single-page.html', 'images/listing-item-01.jpg', "Tom's Restaurant", '964 School Street, New York', '3.5', '12'), 32.360042, 34.860854, 1, '<i class="im im-icon-Chef-Hat"></i>'],
          [locationData('listings-single-page.html', 'images/listing-item-02.jpg', 'Sticky Band', 'Bishop Avenue, New York', '5.0', '23'), 40.77055783505125, -74.26002502441406, 2, '<i class="im im-icon-Electric-Guitar"></i>'],
          [locationData('listings-single-page.html', 'images/listing-item-03.jpg', 'Hotel Govendor', '778 Country Street, New York', '2.0', '17'), 40.7427837, -73.11445617675781, 3, '<i class="im im-icon-Home-2"></i>'],
          [locationData('listings-single-page.html', 'images/listing-item-04.jpg', 'Burger House', '2726 Shinn Street, New York', '5.0', '31'), 40.70437865245596, -73.98674011230469, 4, '<i class="im im-icon-Hamburger"></i>'],
          [locationData('listings-single-page.html', 'images/listing-item-05.jpg', 'Airport', '1512 Duncan Avenue, New York', '3.5', '46'), 40.641311, -73.778139, 5, '<i class="im im-icon-Plane"></i>'],
          [locationData('listings-single-page.html', 'images/listing-item-06.jpg', 'Think Coffee', '215 Terry Lane, New York', '4.5', '15'), 41.080938, -73.535957, 6, '<i class="im im-icon-Coffee"></i>'],
          [locationData('listings-single-page.html', 'images/listing-item-04.jpg', 'Burger House', '2726 Shinn Street, New York', '5.0', '31'), 41.079386, -73.519478, 7, '<i class="im im-icon-Hamburger"></i>'],

          [locationData('listings-single-page.html', 'images/listing-item-04.jpg', 'Burger House', '2726 Shinn Street, New York', '5.0', '31'), 52.368630, 4.895782, 7, '<i class="im im-icon-Hamburger"></i>'],
          [locationData('listings-single-page.html', 'images/listing-item-04.jpg', 'Burger House', '2726 Shinn Street, New York', '5.0', '31'), 52.350179, 4.634857, 7, '<i class="im im-icon-Hamburger"></i>'],
        ];

        // Chosen Rating Type
        google.maps.event.addListener(ib, 'domready', function () {
            if (infoBox_ratingType = 'numerical-rating') {
                numericalRating('.infoBox .' + infoBox_ratingType + '');
            }
            if (infoBox_ratingType = 'star-rating') {
                starRating('.infoBox .' + infoBox_ratingType + '');
            }
        });



        // Map Attributes
        // ----------------------------------------------- //

        var mapZoomAttr = $('#map').attr('data-map-zoom');
        var mapScrollAttr = $('#map').attr('data-map-scroll');

        if (typeof mapZoomAttr !== typeof undefined && mapZoomAttr !== false) {
            var zoomLevel = parseInt(mapZoomAttr);
        } else {
            var zoomLevel = 5;
        }

        if (typeof mapScrollAttr !== typeof undefined && mapScrollAttr !== false) {
            var scrollEnabled = parseInt(mapScrollAttr);
        } else {
            var scrollEnabled = false;
        }


        // Main Map
        var map = new google.maps.Map(document.getElementById('map'), {
            zoom: zoomLevel,
            scrollwheel: scrollEnabled,
            center: new google.maps.LatLng(40.80, -73.70),
            //center:getMyPosition(),
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            zoomControl: false,
            mapTypeControl: false,
            scaleControl: false,
            panControl: false,
            navigationControl: false,
            streetViewControl: false,
            gestureHandling: 'cooperative',

            // Google Map Style
            styles: [{ "featureType": "poi", "elementType": "labels.text.fill", "stylers": [{ "color": "#747474" }, { "lightness": "23" }] }, { "featureType": "poi.attraction", "elementType": "geometry.fill", "stylers": [{ "color": "#f38eb0" }] }, { "featureType": "poi.government", "elementType": "geometry.fill", "stylers": [{ "color": "#ced7db" }] }, { "featureType": "poi.medical", "elementType": "geometry.fill", "stylers": [{ "color": "#ffa5a8" }] }, { "featureType": "poi.park", "elementType": "geometry.fill", "stylers": [{ "color": "#c7e5c8" }] }, { "featureType": "poi.place_of_worship", "elementType": "geometry.fill", "stylers": [{ "color": "#d6cbc7" }] }, { "featureType": "poi.school", "elementType": "geometry.fill", "stylers": [{ "color": "#c4c9e8" }] }, { "featureType": "poi.sports_complex", "elementType": "geometry.fill", "stylers": [{ "color": "#b1eaf1" }] }, { "featureType": "road", "elementType": "geometry", "stylers": [{ "lightness": "100" }] }, { "featureType": "road", "elementType": "labels", "stylers": [{ "visibility": "off" }, { "lightness": "100" }] }, { "featureType": "road.highway", "elementType": "geometry.fill", "stylers": [{ "color": "#ffd4a5" }] }, { "featureType": "road.arterial", "elementType": "geometry.fill", "stylers": [{ "color": "#ffe9d2" }] }, { "featureType": "road.local", "elementType": "all", "stylers": [{ "visibility": "simplified" }] }, { "featureType": "road.local", "elementType": "geometry.fill", "stylers": [{ "weight": "3.00" }] }, { "featureType": "road.local", "elementType": "geometry.stroke", "stylers": [{ "weight": "0.30" }] }, { "featureType": "road.local", "elementType": "labels.text", "stylers": [{ "visibility": "on" }] }, { "featureType": "road.local", "elementType": "labels.text.fill", "stylers": [{ "color": "#747474" }, { "lightness": "36" }] }, { "featureType": "road.local", "elementType": "labels.text.stroke", "stylers": [{ "color": "#e9e5dc" }, { "lightness": "30" }] }, { "featureType": "transit.line", "elementType": "geometry", "stylers": [{ "visibility": "on" }, { "lightness": "100" }] }, { "featureType": "water", "elementType": "all", "stylers": [{ "color": "#d2e7f7" }] }]

        });


        // Marker highlighting when hovering listing item
        $('.listing-item-container').on('mouseover', function () {

            var listingAttr = $(this).data('marker-id');

            if (listingAttr !== undefined) {
                var listing_id = $(this).data('marker-id') - 1;
                var marker_div = allMarkers[listing_id].div;

                $(marker_div).addClass('clicked');

                $(this).on('mouseout', function () {
                    if ($(marker_div).is(":not(.infoBox-opened)")) {
                        $(marker_div).removeClass('clicked');
                    }
                });
            }

        });


        // Infobox
        // ----------------------------------------------- //

        var boxText = document.createElement("div");
        boxText.className = 'map-box'

        var currentInfobox;

        var boxOptions = {
            content: boxText,
            disableAutoPan: false,
            alignBottom: true,
            maxWidth: 0,
            pixelOffset: new google.maps.Size(-134, -55),
            zIndex: null,
            boxStyle: {
                width: "270px"
            },
            closeBoxMargin: "0",
            closeBoxURL: "",
            infoBoxClearance: new google.maps.Size(25, 25),
            isHidden: false,
            pane: "floatPane",
            enableEventPropagation: false,
        };


        var markerCluster, overlay, i;
        var allMarkers = [];

        var clusterStyles = [
          {
              textColor: 'white',
              url: '',
              height: 50,
              width: 50
          }
        ];


        var markerIco;
        for (i = 0; i < locations.length; i++) {

            markerIco = locations[i][4];

            var overlaypositions = new google.maps.LatLng(locations[i][1], locations[i][2]),

            overlay = new CustomMarker(
             overlaypositions,
              map,
              {
                  marker_id: i
              },
              markerIco
            );

            allMarkers.push(overlay);

            google.maps.event.addDomListener(overlay, 'click', (function (overlay, i) {

                return function () {
                    ib.setOptions(boxOptions);
                    boxText.innerHTML = locations[i][0];
                    ib.close();
                    ib.open(map, overlay);
                    currentInfobox = locations[i][3];
                    // var latLng = new google.maps.LatLng(locations[i][1], locations[i][2]);
                    // map.panTo(latLng);
                    // map.panBy(0,-90);


                    google.maps.event.addListener(ib, 'domready', function () {
                        $('.infoBox-close').click(function (e) {
                            e.preventDefault();
                            ib.close();
                            $('.map-marker-container').removeClass('clicked infoBox-opened');
                        });

                    });

                }
            })(overlay, i));

        }


        // Marker Clusterer Init
        // ----------------------------------------------- //

        var options = {
            imagePath: 'images/',
            styles: clusterStyles,
            minClusterSize: 2
        };

        markerCluster = new MarkerClusterer(map, allMarkers, options);

        google.maps.event.addDomListener(window, "resize", function () {
            var center = map.getCenter();
            google.maps.event.trigger(map, "resize");
            map.setCenter(center);
        });



        // Custom User Interface Elements
        // ----------------------------------------------- //

        // Custom Zoom-In and Zoom-Out Buttons
        var zoomControlDiv = document.createElement('div');
        var zoomControl = new ZoomControl(zoomControlDiv, map);

        function ZoomControl(controlDiv, map) {

            zoomControlDiv.index = 1;
            map.controls[google.maps.ControlPosition.RIGHT_CENTER].push(zoomControlDiv);
            // Creating divs & styles for custom zoom control
            controlDiv.style.padding = '5px';
            controlDiv.className = "zoomControlWrapper";

            // Set CSS for the control wrapper
            var controlWrapper = document.createElement('div');
            controlDiv.appendChild(controlWrapper);

            // Set CSS for the zoomIn
            var zoomInButton = document.createElement('div');
            zoomInButton.className = "custom-zoom-in";
            controlWrapper.appendChild(zoomInButton);

            // Set CSS for the zoomOut
            var zoomOutButton = document.createElement('div');
            zoomOutButton.className = "custom-zoom-out";
            controlWrapper.appendChild(zoomOutButton);

            // Setup the click event listener - zoomIn
            google.maps.event.addDomListener(zoomInButton, 'click', function () {
                map.setZoom(map.getZoom() + 1);
            });

            // Setup the click event listener - zoomOut
            google.maps.event.addDomListener(zoomOutButton, 'click', function () {
                map.setZoom(map.getZoom() - 1);
            });

        }


        // Scroll enabling button
        var scrollEnabling = $('#scrollEnabling');

        $(scrollEnabling).click(function (e) {
            e.preventDefault();
            $(this).toggleClass("enabled");

            if ($(this).is(".enabled")) {
                map.setOptions({ 'scrollwheel': true });
            } else {
                map.setOptions({ 'scrollwheel': false });
            }
        })


        // Geo Location Button
        $("#geoLocation, .input-with-icon.location a").click(function (e) {
            e.preventDefault();
            geolocate();
        });

        function geolocate() {

            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function (position) {
                    var pos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
                    map.setCenter(pos);
                    map.setZoom(12);
                });
            }
        }

    }


    // Map Init
    var map = document.getElementById('map');
    if (typeof (map) != 'undefined' && map != null) {
        google.maps.event.addDomListener(window, 'load', mainMap);
    }


    // ---------------- Main Map / End ---------------- //

    //$(document).on('pageshow', '#singleListingMap-container', function (e, data) {
    //    getMyPosition();
    //});

    // Single Listing Map
    // ----------------------------------------------- //

    var timeInterval = 5000;
    var flag = false;
    var h;
    var markerFlag = false;
    var marker;
    var RecordFlag = false;
    var poly;

    // Single Listing Map Init
    var single_map = document.getElementById('singleListingMap');
    if (typeof (single_map) != 'undefined' && single_map != null) {
        google.maps.event.addDomListener(window, 'load', singleListingMap);
    }
    //-----------------------------------------------------------------------
    // get the user's position
    //-----------------------------------------------------------------------

    function singleListingMap() {
        getCurrentReport();
        getMyPosition(); //Get my position For The first time
        h = window.setInterval(getMyPosition, timeInterval); //Every 5 sec get my position    
    }

    function getMyPosition() {
        var options = {
            enableHighAccuracy: true,
            timeout: timeInterval,
            maximumAge: 1000
        };
        navigator.geolocation.getCurrentPosition(singleListingMapSuccess,
                                                 getCurrentPosition_Failure,
                                                 options);
    }

    //------------------------------------------------------------
    // Callback function in case of failure in getCurrentPosition
    //------------------------------------------------------------
    function getCurrentPosition_Failure() {
        swal("Your device doesn't support GPS");
    }

    //------------------------------------------------------------
    // Callback function in case of success in getCurrentPosition
    //------------------------------------------------------------
    function singleListingMapSuccess(position) {
        var co = position.coords;

        if (!flag) {

            flag = true;
            //var myLatlng = new google.maps.LatLng({lng: $( '#singleListingMap' ).data('longitude'),lat: $( '#singleListingMap' ).data('latitude'), });
            var myLatlng = new google.maps.LatLng(co.latitude, co.longitude);
            single_map = new google.maps.Map(document.getElementById('singleListingMap'), {
                zoom: 18,
                center: myLatlng,
                scrollwheel: false,
                zoomControl: false,
                mapTypeControl: false,
                scaleControl: false,
                panControl: false,
                navigationControl: false,
                streetViewControl: false,
                styles: [{ "featureType": "poi", "elementType": "labels.text.fill", "stylers": [{ "color": "#747474" }, { "lightness": "23" }] }, { "featureType": "poi.attraction", "elementType": "geometry.fill", "stylers": [{ "color": "#f38eb0" }] }, { "featureType": "poi.government", "elementType": "geometry.fill", "stylers": [{ "color": "#ced7db" }] }, { "featureType": "poi.medical", "elementType": "geometry.fill", "stylers": [{ "color": "#ffa5a8" }] }, { "featureType": "poi.park", "elementType": "geometry.fill", "stylers": [{ "color": "#c7e5c8" }] }, { "featureType": "poi.place_of_worship", "elementType": "geometry.fill", "stylers": [{ "color": "#d6cbc7" }] }, { "featureType": "poi.school", "elementType": "geometry.fill", "stylers": [{ "color": "#c4c9e8" }] }, { "featureType": "poi.sports_complex", "elementType": "geometry.fill", "stylers": [{ "color": "#b1eaf1" }] }, { "featureType": "road", "elementType": "geometry", "stylers": [{ "lightness": "100" }] }, { "featureType": "road", "elementType": "labels", "stylers": [{ "visibility": "off" }, { "lightness": "100" }] }, { "featureType": "road.highway", "elementType": "geometry.fill", "stylers": [{ "color": "#ffd4a5" }] }, { "featureType": "road.arterial", "elementType": "geometry.fill", "stylers": [{ "color": "#ffe9d2" }] }, { "featureType": "road.local", "elementType": "all", "stylers": [{ "visibility": "simplified" }] }, { "featureType": "road.local", "elementType": "geometry.fill", "stylers": [{ "weight": "3.00" }] }, { "featureType": "road.local", "elementType": "geometry.stroke", "stylers": [{ "weight": "0.30" }] }, { "featureType": "road.local", "elementType": "labels.text", "stylers": [{ "visibility": "on" }] }, { "featureType": "road.local", "elementType": "labels.text.fill", "stylers": [{ "color": "#747474" }, { "lightness": "36" }] }, { "featureType": "road.local", "elementType": "labels.text.stroke", "stylers": [{ "color": "#e9e5dc" }, { "lightness": "30" }] }, { "featureType": "transit.line", "elementType": "geometry", "stylers": [{ "visibility": "on" }, { "lightness": "100" }] }, { "featureType": "water", "elementType": "all", "stylers": [{ "color": "#d2e7f7" }] }]
            });
            // Steet View Button
            $('#streetView').click(function (e) {
                e.preventDefault();
                single_map.getStreetView().setOptions({ visible: true, position: myLatlng });
                // $(this).css('display', 'none')
            });

            // Custom zoom buttons
            var zoomControlDiv = document.createElement('div');
            var zoomControl = new ZoomControl(zoomControlDiv, single_map);

            function ZoomControl(controlDiv, single_map) {

                zoomControlDiv.index = 1;
                single_map.controls[google.maps.ControlPosition.RIGHT_CENTER].push(zoomControlDiv);

                controlDiv.style.padding = '5px';

                var controlWrapper = document.createElement('div');
                controlDiv.appendChild(controlWrapper);

                var zoomInButton = document.createElement('div');
                zoomInButton.className = "custom-zoom-in";
                controlWrapper.appendChild(zoomInButton);

                var zoomOutButton = document.createElement('div');
                zoomOutButton.className = "custom-zoom-out";
                controlWrapper.appendChild(zoomOutButton);

                google.maps.event.addDomListener(zoomInButton, 'click', function () {
                    single_map.setZoom(single_map.getZoom() + 1);
                });

                google.maps.event.addDomListener(zoomOutButton, 'click', function () {
                    single_map.setZoom(single_map.getZoom() - 1);
                });

            }
            poly = new google.maps.Polyline({
                strokeColor: '#000000',
                strokeOpacity: 1.0,
                strokeWeight: 3,
                map: single_map,
                path: [{ lat: co.latitude, lng: co.longitude }]
            });
            createMarker(myLatlng);
            if (RecordFlag) {
                RecordPath(myLatlng);
            }
        }

        else {

            var myLatlng = new google.maps.LatLng(co.latitude, co.longitude);
            single_map.center = myLatlng;
            createMarker(myLatlng);
            if (RecordFlag) {

                RecordPath(myLatlng);
            }

        }

    }

    // Create Marker on map
    function createMarker(myLatlng) {
        var Latlng = myLatlng;
        var singleMapIco = "<i class='" + $('#singleListingMap').data('map-icon') + "'></i>";
        if (marker != null) {
            marker.setMap(null);
        }
        marker = new CustomMarker(
             Latlng,
          single_map,
          {
              marker_id: '1'
          },
          singleMapIco);

    }

    function RecordPath(myLatlng) {

        var Currentposition = myLatlng;

        //poly.setMap(single_map); //Set Poly on map
        poly.path = poly.getPath(); //Get the path   
        poly.path.push(Currentposition); // Push the current position to the array

        //var marker = new google.maps.Marker({
        //    position: Currentposition,
        //    title: '#' + path.getLength(),
        //    map: single_map
        //});


    }


    // -------------- Single Listing Map / End -------------- //



    // Custom Map Marker
    // ----------------------------------------------- //

    function CustomMarker(latlng, map, args, markerIco) {
        this.latlng = latlng;
        this.args = args;
        this.markerIco = markerIco;
        this.setMap(map);
    }

    CustomMarker.prototype = new google.maps.OverlayView();

    CustomMarker.prototype.draw = function () {

        var self = this;

        var div = this.div;

        if (!div) {

            div = this.div = document.createElement('div');
            div.className = 'map-marker-container';

            div.innerHTML = '<div class="marker-container">' +
                                '<div class="marker-card">' +
                                   '<div class="front face">' + self.markerIco + '</div>' +
                                   '<div class="back face">' + self.markerIco + '</div>' +
                                   '<div class="marker-arrow"></div>' +
                                '</div>' +
                              '</div>'


            // Clicked marker highlight
            google.maps.event.addDomListener(div, "click", function (event) {
                $('.map-marker-container').removeClass('clicked infoBox-opened');
                google.maps.event.trigger(self, "click");
                $(this).addClass('clicked infoBox-opened');
            });


            if (typeof (self.args.marker_id) !== 'undefined') {
                div.dataset.marker_id = self.args.marker_id;
            }

            var panes = this.getPanes();
            panes.overlayImage.appendChild(div);
        }

        var point = this.getProjection().fromLatLngToDivPixel(this.latlng);

        if (point) {
            div.style.left = (point.x) + 'px';
            div.style.top = (point.y) + 'px';
        }
    };

    CustomMarker.prototype.remove = function () {
        if (this.div) {
            this.div.parentNode.removeChild(this.div);
            this.div = null; $(this).removeClass('clicked');
        }
    };

    CustomMarker.prototype.getPosition = function () { return this.latlng; };

    // -------------- Custom Map Marker / End -------------- //

    // -------------- Record Route -------------- //

    $('#Rec').click(
    function () {
        $('#Rec').css('background-color', "#ff00007d");
        RecordFlag = true;
    });

    $('#stop').click(function () {
        $('#Rec').css('background-color', "#50C5B7");
        RecordFlag = false;
        if (poly.path != null) {
            swal({
                title: 'Save the route?',
                confirmButtonText: 'Yes',
                cancelButtonText: 'No',
                showCancelButton: true,
                showCloseButton: true,
            }).then((result) => {
                if (result.value) {
                    var pathStr = JSON.stringify(poly.path);
                    var data = {
                        path: pathStr,
                        serviceOnAirId: 8  //need to take Service on air ID
                    }
                    ajax.sendWithData("PathAPI.asmx/InsertPath", data, SuccessInsertPath, Error);
                    swal(
               'Success!',
               'Your route has been saved.',
               'success'
             )
                }
            })
        };


        function SuccessInsertPath() {
            alert("YAYYAA");
        }

        function Error() {

        }

    });


    // --------------Take Picture -------------- //

    $('#btnCamera').click(function () { // When click on take picture
        navigator.camera.getPicture(onCameraSuccess, onCameraFail, { // get PhoneGAP Camera feature with options
            quality: 50,
            destinationType: Camera.DestinationType.FILE_URI,
            sourceType: Camera.PictureSourceType.CAMERA //PhotoGallery
        });
    });

    function onCameraSuccess(imageURI) { // On camera success
        var img = document.createElement("img"); // make img elmenent 
        img.src = imageURI; // add the file URL into the img element that we created
        img.id = "myImage"; // add ID to the img element for the CSS
        $('#PlaceOfImage').append(img); //add the img element with the img that the user choose into the HTML
        $("#preview").css("display", "block"); // Show the div of the img in the report page

    };


    function onCameraFail() {
        swal("Can't upload image, Try again!")
    };

    var file = "";
    var fileBinary = "";
    var fileName = "";
    var accept = {
        binari: ["image/png", "image/jpeg"]
    };

    $('#input').click(function () { //When click on Upload camera
        var inputElement = document.getElementById("input");
        inputElement.addEventListener("change", handleFiles, true);
        function handleFiles(files) {
            $('#PlaceOfImage').empty(); //make sure that just only one picture is uploaded.
            file = this.files[0];/* now we can work with the file  */
            fileName = file.name;
            var img = document.createElement("img"); // make img elmenent 
            if (accept.binari.indexOf(file.type) > -1) { // if file is a binary, which we accept
                var reader = new FileReader();
                reader.onload = function () {
                    fileBinary = reader.result;
                };
                reader.readAsDataURL(file); //Convert the file to binari file for saving into the DB
            }
            img.id = "myImage"; // add ID to the img element for the CSS    
            img.src = fileBinary; // add the binari img URL into the img element that we created
            //img.onload = function () {
            //    window.URL.revokeObjectURL(this.src); // Revoke
            //};
            $('#PlaceOfImage').append(img); //add the img element with the img that the user choose into the HTML
            $("#preview").css("display", "block"); // Show the div of the img in the report page
        }
    });

    //__________Update Report_______________________//

    var Activity = [];

    $('#UpdateReport').click(function () {                                                    //take the routh
        Activity[0] = $('#foodQuntity').val();           //take the food quntity
        Activity[1] = $('#drinkQuntity').val();          //take the drinking quntity
        Activity[2] = $('#gameQuntity').val();         //take the games quntity
        Activity[3] = $('#peeQuntity').val();        //take the pee quntity
        Activity[4] = $('#pooQuntity').val();        //take the poo quntity
        //myReport.picture = $('#myImage').src;      //take the picture

        for (var i = 0; i < Activity.length; i++) {
            var data = {
                ActivityID: i + 1,
                serviceOnAirId: 8, /// need to take serviceOnAirId ///!!!!!!
                Amount: Activity[i]
            };
            ajax.sendWithData("PathAPI.asmx/InsertActivity", data, SuccessInsertActivity, ErrorActivity);
        };
        var myDiv = $('#myImage');
        if (myDiv.length) {
            var Imgdata = {
                serviceOnAirId: 8, /// need to take serviceOnAirId ///!!!!!!
                image: fileBinary,
                imageName: fileName
            };
            ajax.sendWithData("PathAPI.asmx/InsertImage", Imgdata, SuccessInsertImage, ErrorImage);
        };

    });

    function SuccessInsertActivity() {

    };

    function ErrorActivity() {
        alert("FailActivity");
    };

    function SuccessInsertImage() {
        alert("IMAGE SUCC!");
    };

    function ErrorImage() {

    };



   

    function getCurrentReport() {
        var data = {
            serviceOnAirId: 8 /// need to take serviceOnAirId ///!!!!!!
        };
        ajax.sendWithData("PathAPI.asmx/GetCurrentReport", data, SuccessGetCurrentReport, ErrorGetCurrentReport);
    }


    function SuccessGetCurrentReport(data) {

        var activityList = JSON.parse(data.d).Report;
        $.each(activityList, function (i, row) {
            $('#activity_' + row.ActivityId + '').val(row.Amount);
        });
    };
    function ErrorGetCurrentReport() {
        alert("failll");
    };
})(this.jQuery);

