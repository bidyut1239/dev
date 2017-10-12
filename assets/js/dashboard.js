

function deleteEvent() {
    var eventId = $(".crud-edit").attr("id").split("_")[1];
    var deleteEventUrl = "/event/" + eventId + "/deleteEvent";
    $.ajax({
        url: deleteEventUrl,
        method: "POST",
        success: function(response) {
          console.log("Response After Delete:: " + response.message);
          $(".event-details-common").css("display", "none");
          $(".alert-class").css("display", "block");
          $(".alert-class").html(response.message);
        },
        error: function(error) {
            console.log("Error After Delete:: " + error);
            $(".event-details-common").css("display", "none");
            $(".alert-class").css("display", "block");
            $(".alert-class").html(error.message);
        }
    });
}

function displayEditEventView() {
    $(".individualEventUser").css("display", "none");
    $(".inputUser").css("display", "block");
    $(".create-event-bottom-submit").css("display", "none");
    $(".input-user-submit").css("display", "none");
    $(".crud-edit").attr("onclick", "editEvent(event)");
    $(".crud-edit").html("");
    $(".crud-edit").html("UPDATE");

    var eventId = $(".crud-edit").attr("id").split("_")[1];
    var name = $(".namePara").html();
    var venue = $(".venuePara").html();
    var date = $(".datePara").html();
    var eventTime = $(".timePara").html();
    var address = $(".addressPara").html();
    var price = $(".pricePara").html();
    var details = $(".detailsPara").html();

    console.log("DisplayEdit:: " + name);
    $(".name").addClass("name_" + eventId);
    $(".venue").addClass("venue_" + eventId);
    $(".date").addClass("date_" + eventId);
    $(".eventTime").addClass("eventTime_" + eventId);
    $(".address").addClass("address_" + eventId);
    $(".price").addClass("price_" + eventId);
    $(".details").addClass("details_" + eventId);
    $(".name_" + eventId).val(name);
    $(".venue_" + eventId).val(venue);
    $(".date_" + eventId).val(date);
    $(".eventTime_" + eventId).val(eventTime);
    $(".address_" + eventId).val(address);
    $(".price_" + eventId).val(price);
    $(".details_" + eventId).val(details);
    var getAllCitiesUrl = "/city/getAllCities";
    var accessToken = localStorage.accessToken;
    var key = "JWT " + accessToken;
    $(".dropdown-city").html("");
    var cityOptionHtml = "";
    var hiddenInfo = $(".hiddenInfo");
    var hiddenInfoHtml = "";
    var cityClass = "";
    $.ajax({
      url: getAllCitiesUrl,
      method: "GET",
      headers: {authorization: key},
      success: function(responseCities) {
        for(i=0; i<responseCities.length; i++) {
          cityClass = responseCities[i].city;
          cityClass = cityClass.replace(/\s/g, '');
          cityOptionHtml = '<option class="individual-option-city class-city_' + cityClass + '" id="optionId_' + responseCities[i].country + '" onclick="doSomething()">' +
                              responseCities[i].city +
                            '</option>';
          $(".dropdown-city").append(cityOptionHtml);
        }
      },
      error: function(error) {
        console.log("responseCities::Error " + error);
        return error;
      }
    });
}

function editEvent(e) {
    var eventId = $(".crud-edit").attr("id").split("_")[1];
    var name = $(".name").val();
    var venue = $(".venue").val();
    var city = $(".city").val();
    var country = $(".country").val();
    var eventType = $("#dropdown-type").val();
    var date = $("#datepicker").val();
    var eventTime = $("#eventTime").val();
    var address = $(".address").val();
    var price = $(".price").val();
    var details = $(".details").val();
    if(name && venue && city && country && eventType && date && eventTime && address && price && details) {
        var eventData = {
          name: name,
          venue: venue,
          city: city,
          country: country,
          type: eventType,
          date: date,
          time: eventTime,
          address: address,
          price: price,
          details: details
        };
        console.log("editEventCity::ID " + city);
        var editEventUrl = "/event/" + eventId + "/editEvent";
        var accessToken = localStorage.accessToken;
        var key = "JWT " + accessToken;
        $.ajax({
            url: editEventUrl,
            method: "POST",
            data: eventData,
            headers: {authorization: key},
            success: function (eventResponse) {
                console.log("Resulted::Event::Name " + eventResponse);
                $(".mandatory-event").html("");
                $(".individualEventUser").css("display", "block");
                $(".inputUser").css("display", "none");
                $(".create-event-bottom-submit").css("display", "block");
                $(".input-user-submit").css("display", "block");
                $(".crud-edit").attr("onclick", "displayEditEventView()");
                $(".crud-edit").html("");
                $(".crud-edit").html("EDIT");
                $(".namePara").html(eventResponse.name);
                $(".venuePara").html(eventResponse.venue);
                $(".cityPara").html(eventResponse.city);
                $(".countryPara").html(eventResponse.country);
                $(".eventTypePara").html(eventResponse.type);
                $(".datePara").html(eventResponse.date);
                $(".timePara").html(eventResponse.time);
                $(".addressPara").html(eventResponse.address);
                $(".pricePara").html(eventResponse.price);
                $(".detailsPara").html(eventResponse.details);
                $(".create-event-bottom-submit").css("display", "none");
                $(".input-user-submit").css("border-bottom", "none");
            },
            error: function (err) {
                console.dir("Resulted::Error::Name " + err);
            }
        });
    }
        else {
            e.preventDefault();
            console.log("Prevented");
            var mandatoryHtml = "All fields are mandatory";
            $(".mandatory-event").html(mandatoryHtml);
        }
}

// function createEvent() {
//     $(".common-user-main").css("display", "none");
//     $(".user-main-dashboard-create-event-form").css("display", "block");
// }


$(".create-event-bottom").click(function () {
    $(".like-dislike-col").css("display", "none");
    $(".inputUser").val("");
    $(".create-event-bottom-submit").css("display", "block");
    $(".common-user-main").css("display", "none");
    $(".user-main-dashboard-create-event-form").css("display", "block");
    $(".inputUser").css("display", "block");
    $(".individualEventUser").css("display", "none");
    $(".infoHeaderUser").css("display", "none");
    $(".infoHeaderAll").css("display", "none");
    $(".crud-button").css("display", "none");
    var getAllCitiesUrl = "/city/getAllCities";
    var accessToken = localStorage.accessToken;
    var key = "JWT " + accessToken;
    $(".dropdown-city").html("");
    var cityOptionHtml = "";
    var hiddenInfo = $(".hiddenInfo");
    var hiddenInfoHtml = "";
    var cityClass = "";
    $.ajax({
      url: getAllCitiesUrl,
      method: "GET",
      headers: {authorization: key},
      success: function(responseCities) {
        for(i=0; i<responseCities.length; i++) {
          cityClass = responseCities[i].city;
          cityClass = cityClass.replace(/\s/g, '');
          cityOptionHtml = '<option class="individual-option-city class-city_' + cityClass + '" id="optionId_' + responseCities[i].country + '">' +
                              responseCities[i].city +
                            '</option>';
          $(".dropdown-city").append(cityOptionHtml);
        }
      },
      error: function(error) {
        console.log("responseCities::Error " + error);
        return error;
      }
    });
});

function filterEvent() {
  var priceRangeQueryVal = $("#select-price-id").val();
  var cityQuery = $("#select-city-id").val();
  var eventTypeQuery = $("#select-event-type-id").val();
  if(priceRangeQueryVal == "ALL") {
    priceRangeQuery == "ALL"
    var priceRangeQueryupper = "false";
  }
  else {
    var priceRangeQuery = priceRangeQueryVal.split(" ")[1];
    var priceRangeQueryTwo = priceRangeQueryVal.split(" ")[2];
    console.log("priceRangeQuery::check " + priceRangeQuery);
    if(priceRangeQuery == "5000" || priceRangeQueryTwo == "5000") {
      var priceRangeQueryupper = "false";
      var priceRawQuery = { $gte:5000 };
    }
    else {
      var priceRangeQueryupper = priceRangeQueryVal.split(" ")[3];
      var priceRawQuery = { $gte:priceRangeQuery,
                            $lt:priceRangeQueryupper
       };
    }
  }

  var eventQueryUrl = "/event/eventQueryFilter"
  var accessToken = localStorage.accessToken;
  var key = "JWT " + accessToken;
  if(priceRangeQuery !== "ALL" && cityQuery !== "ALL") {
    console.log("Price + City::1 ");
    var queryDetails = {
      price: priceRawQuery,
      city: cityQuery
    }
  }
  else if (priceRangeQuery !== "ALL") {
    console.log("Price + City::2 ");
    var queryDetails = {
      price: priceRawQuery
    }
  }
  else if (cityQuery !== "ALL") {
    console.log("Price + City::3 ");
    var queryDetails = {
      city: cityQuery
    }
  }
  else {
    console.log("Price + City::4 ");
    var queryDetails = {}
  }

  if(eventTypeQuery !== "ALL") {
    queryDetails.type = eventTypeQuery;
  }

  var fullDetails = {
    queryDetails: queryDetails,
    priceRangeQueryupper: priceRangeQueryupper
  }
  console.log("Price + City::5 " + queryDetails.price + " + " + queryDetails.city);

  $.ajax({
    url: eventQueryUrl,
    method: "POST",
    headers: {authorization: key},
    data: queryDetails,
    success: function (responseQuery) {
        console.log("SUCCESS:: " + responseQuery);
        var listQueryEventSelector = $(".list-all-event-specific");
        listQueryEventSelector.html("");
        var eventListForAllHtml = "";
        if(responseQuery) {
        for(i=0; i<responseQuery.length; i++) {
          eventListForAllHtml = '<div class="row user-list">' +
                                    '<div class="col-md-8 event-name-in-list-all">' +
                                       responseQuery[i].name +
                                    '</div>' +
                                    '<div onclick="showEventDetails(\'' + responseQuery[i].id + '\')" class="col-md-2 show-deleteOrJoin-common show-common">' +
                                       'Show' +
                                    '</div>' +
                                    '<div onclick="commentOnEvent(\'' + responseQuery[i].id + '\')" class="col-md-2 show-deleteOrJoin-common deleteOrJoin-common">' +
                                       'Comment' +
                                    '</div>' +
                                '</div>';
          listQueryEventSelector.append(eventListForAllHtml);
        }
      }
    },
    error: function (err) {
        console.log("ERROR:: " + err);
    }
  });
}

function fillCountry() {
  var cityValue = $("#city-option-id").val();
  var classValue = ".class-city_" + cityValue;
  classValue = classValue.replace(/\s/g, '');
  var id = $(classValue).attr("id");
  console.log("cityValue:: " + classValue);
  var country = id.split("_")[1];
  $("#dropdown-country").val(country);
}

$(".create-event-bottom-submit").click(function (e) {
    var name = $(".name").val();
    var venue = $(".venue").val();
    var city = $(".city").val();
    var country = $(".country").val();
    var eventType = $("#dropdown-type").val();
    var date = $("#datepicker").val();
    var eventTime = $("#eventTime").val();
    var address = $(".address").val();
    var price = $(".price").val();
    var details = $(".details").val();
    if(name && venue && city && country && eventType && date && eventTime && address && price && details) {
        var eventData = {
          name: name,
          venue: venue,
          city: city,
          country: country,
          type: eventType,
          date: date,
          time: eventTime,
          address: address,
          price: price,
          details: details
        };
        var accessToken = localStorage.accessToken;
        var key = "JWT " + accessToken;
        var createEventUrl = "/user/createEvent";
        console.log(name + "  " + venue + "  " + date+ "  " + eventTime+ "  " + address+ "  " + price+ "  " + details);
        $.ajax({
          url: createEventUrl,
          method: "POST",
          headers: {authorization: key},
          data: eventData,
          success: function (event) {
            console.log("Event:: " + event);
            var nameResponse = event.name;
            var venueResponse = event.venue;
            var cityResponse = event.city;
            var countryResponse = event.country;
            var eventTypeResponse = event.type;
            var dateResponse = event.date;
            var eventTimeResponse = event.time;
            var addressResponse = event.address;
            var priceResponse = event.price;
            var detailsResponse = event.details;

            var nameSelector = $("#nameUser");
            var venueSelector = $("#venueUser");
            var citySelector = $("#cityUser");
            var countrySelector = $("#countryUser");
            var eventTypeSelector = $("#eventTypeUser");
            var dateSelector = $("#dateUser");
            var eventSelector = $("#eventUser");
            var addressSelector = $("#addressUser");
            var priceSelector = $("#priceUser");
            var detailsSelector = $("#detailsUser");
            $(".inputUser").css("display", "none");
            $(".individualEventUser").css("display", "block");
            $(".mandatory-event").html(mandatoryHtml);
            nameSelector.html("");
            venueSelector.html("");
            citySelector.html("");
            countrySelector.html("");
            eventTypeSelector.html("");
            dateSelector.html("");
            eventSelector.html("");
            addressSelector.html("");
            priceSelector.html("");
            detailsSelector.html("");

            nameSelector.html(nameResponse);
            venueSelector.html(venueResponse);
            citySelector.html(cityResponse);
            countrySelector.html(countryResponse);
            eventTypeSelector.html(eventTypeResponse);
            dateSelector.html(dateResponse);
            eventSelector.html(eventTimeResponse);
            addressSelector.html(addressResponse);
            priceSelector.html(priceResponse);
            detailsSelector.html(detailsResponse);
          },
          error: function (error) {
            console.dir("Error:: " + error);
            }
          });
        }
        else {
          e.preventDefault();
          // console.log("Here Clicked preventDefault");
          var mandatoryHtml = "All fields are mandatory";
          $(".mandatory-event").html(mandatoryHtml);
        }

});

function getEventsForUser(userId) {
    console.log("UserId:: " + userId);
    var getEventsForIdUrl = "/event/" + userId + "/getEventsForId";
    var accessToken = "{{ accessToken }}";
    var key = "JWT " + accessToken;
    $.ajax({
        url: getEventsForIdUrl,
        method: "GET",
        headers: {authorization: key},
        success: function(eventsForId) {
            $(".user-sidemenu-individual").css("background-color", "#e8ebef");
            $(".get-user-event-class").css("background-color", "white");
            console.log("EventsForId:: " + eventsForId.length);
            $(".infoHeaderAll").css("display", "none");
            $(".infoHeaderUser").css("display", "block");
            $(".user-event-list-particular").html("");
            var eventListForParticularUserHtml = "";
            for(i=0; i<eventsForId.length; i++) {
              eventListForParticularUserHtml = '<div class="row user-list">' +
                                                    '<div class="col-md-8 event-name-in-list-user list-name-common">' +
                                                       eventsForId[i].name +
                                                    '</div>' +
                                                    '<div onclick="showEventDetails(\'' + eventsForId[i].id + '\')" class="col-md-2 show-deleteOrJoin-common show-common">' +
                                                       'Show' +
                                                    '</div>' +
                                                    '<div onclick="commentOnEvent(\'' + eventsForId[i].id + '\')" class="col-md-2 show-deleteOrJoin-common deleteOrJoin-common">' +
                                                       'Comment' +
                                                    '</div>' +
                                                '</div>';
              $(".user-event-list-particular").append(eventListForParticularUserHtml);
            }
            $(".common-user-main").css("display", "none");
            $(".user-event-list-particular").css("display", "block");
        },
        error: function(err) {
            console.log("Error:: " + err.message);
        }
    });
}


function showEventDetails(id) {
    console.log("Event Id:: " + id);
    var accessToken = localStorage.accessToken;
    var url = "/event/" + id + "/showEventDetails";
    var key = "JWT " + accessToken;
    $.ajax({
        url: url,
        method: "GET",
        headers: {authorization: key},
        success: function(event) {
            $(".like-dislike-col").css("display", "block");
            $(".alert-class").html("");
            $(".event-details-common").css("display", "block");
            $(".crud-button").css("display", "block");
            console.log("Event::User::Role " + event.allCities);
            var user = allFunctions.getUser();
            console.log("getUserRole::" + user.role);
            if(user.role == "user") {
              $(".infoHeaderUser").css("display", "none");
              $(".infoHeaderAll").css("display", "none");
            }
            if(user.role == "admin") {
              console.log("Now Checked in it");
              $(".common-admin-main").css("display", "none");
            }
            $(".crud-edit").attr("id", "crudEdit_" + id);
            $(".crud-delete").attr("id", "crudDelete_" + id);
            var userId = user.id;
            console.log("User::Id " + userId);
            var nameResponse = event.name;
            var venueResponse = event.venue;
            var cityResponse = event.city;
            var countryResponse = event.country;
            var eventTypeResponse = event.type;
            var dateResponse = event.date;
            var eventTimeResponse = event.time;
            var addressResponse = event.address;
            var priceResponse = event.price;
            var detailsResponse = event.details;
            var nameSelector = $("#nameUser");
            var venueSelector = $("#venueUser");
            var citySelector = $("#cityUser");
            var countrySelector = $("#countryUser");
            var eventTypeSelector = $("#eventTypeUser");
            var dateSelector = $("#dateUser");
            var eventSelector = $("#eventUser");
            var addressSelector = $("#addressUser");
            var priceSelector = $("#priceUser");
            var detailsSelector = $("#detailsUser");
            $(".common-user-main").css("display", "none");
            $(".user-main-dashboard-create-event-form").css("display", "block");
            $(".inputUser").css("display", "none");
            $(".individualEventUser").css("display", "block");
            console.log("Check User Id:: " + event.user.id + " == " + userId);
            if(userId == event.user.id) {
              $(".crud-button").css("display", "block");
            }
            else {
              $(".crud-button").css("display", "none");
            }

            if(user.role == "admin") {
              $(".crud-button").css("display", "block");
            }
            nameSelector.html("");
            venueSelector.html("");
            citySelector.html("");
            countrySelector.html("");
            eventTypeSelector.html("");
            dateSelector.html("");
            eventSelector.html("");
            addressSelector.html("");
            priceSelector.html("");
            detailsSelector.html("");

            nameSelector.html(nameResponse);
            venueSelector.html(venueResponse);
            citySelector.html(cityResponse);
            countrySelector.html(countryResponse);
            eventTypeSelector.html(eventTypeResponse);
            dateSelector.html(dateResponse);
            eventSelector.html(eventTimeResponse);
            addressSelector.html(addressResponse);
            priceSelector.html(priceResponse);
            detailsSelector.html(detailsResponse);
            $(".like-count").html(event.likes.length);
            $(".dislike-count").html(event.dislikes.length);
            console.log("likeDislikeUserSpecific::Length " + event.likeDislikeUserSpecific.length);
            if(event.likeDislikeUserSpecific.length > 0) {
              $("#like").attr("onclick", "undoLikeDislikeEvent('like')");
              $("#dislike").attr("onclick", "undoLikeDislikeEvent('dislike')");
              $("#like").hover(function(){
                $(".liked").css("display", "block");
              },function(){
                $(".liked").css("display", "none");
              });
            }
            else {
              $("#like").attr("onclick", "likeDislikeEvent('like')");
              $("#dislike").attr("onclick", "likeDislikeEvent('dislike')");
              $("#like").hover(function(){
                $(".i-like").css("display", "block");
              },function(){
                  $(".i-like").css("display", "none");
              });
            }
            }


      });
}
