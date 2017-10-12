

function showUserDetails(id) {
    console.log("User Id:: " + id);
    var accessToken = localStorage.accessToken;
    console.log("User Name:: " + accessToken);
    var url = "/admin/" + id + "/showUserDetails";
    var key = "JWT " + accessToken;
    $.ajax({
        url: url,
        method: "GET",
        headers: {authorization: key},
        success: function(response) {
            console.log("User::accessToken " + response.user.firstName);
            var firstName = response.user.firstName;
            var lastName = response.user.lastName;
            var email = response.user.email;
            var type = response.user.type;
            $(".common-admin-main").css("display", "none");
            $(".show-user-details").css("display", "block");
            $(".first-name-admin").html(firstName);
            $(".last-name-admin").html(lastName);
            $(".email-admin").html(email);
            $(".type-admin").html(type);
        }
      });
}


function showContactDetails(contactId) {
  var showContactDetailsUrl = "/contact/" + contactId + "/showContactDetails";
  var accessToken = localStorage.accessToken;
  var key = "JWT " + accessToken;
  $.ajax({
    url: showContactDetailsUrl,
    method: "GET",
    headers: {authorization: key},
    success: function (contact) {
      console.log("Single Contact:: " + contact.name);
      $(".common-admin-main").css("display", "none");
      $(".show-contact-details").css("display", "block");
      $(".contact-info").html("");
      $(".contact-name").html(contact.name);
      $(".contact-phone").html(contact.phone);
      $(".contact-email").html(contact.email);
      $(".contact-message").html(contact.message);
    },
    error: function (error) {
      console.log("Single Contact::error " + error);
    }
  });
}

function deleteContact(contactId) {
  var deleteContactUrl = "/contact/" + contactId + "/deleteContact";
  var accessToken = localStorage.accessToken;
  var key = "JWT " + accessToken;
  $.ajax({
    url: deleteContactUrl,
    method: "POST",
    headers: {authorization: key},
    success: function(response) {
      console.log("deleteContact:: " + response.message);
      allFunctions.getAllContactsUi();
    },
    error: function(error) {
      console.log("deleteContact::Error " + error);
    }
  });
}



function displayCityForm() {
  $(".common-admin-main").css("display", "none");
  $(".admin-dashboard-main-create-city-form").css("display", "block");
}

function createCitySubmit() {
  var city = $(".input-city-name").val();
  var country = $(".input-city-country").val();
  var createCitySubmitUrl = "/city/createCity";
  var cityDetails = {
    city: city,
    country: country
  };
  var accessToken = localStorage.accessToken;
  var key = "JWT " + accessToken;
  $.ajax({
    url: createCitySubmitUrl,
    method: "POST",
    headers: {authorization: key},
    data: cityDetails,
    success: function(responseCity) {
      console.log("deleteContact:: " + responseCity.city);
      allFunctions.getAllCities();
    },
    error: function(error) {
      console.log("deleteContact::Error " + error);
    }
  });
}

function deleteCity(cityId) {
  var deleteCityUrl = "/city/" + cityId + "/deleteCity";
  var accessToken = localStorage.accessToken;
  var key = "JWT " + accessToken;
  $.ajax({
    url: deleteCityUrl,
    method: "POST",
    headers: {authorization: key},
    success: function(response) {
      console.log("deleteCity:: " + response.message);
      allFunctions.getAllCities();
    },
    error: function(error) {
      console.log("deleteCity::Error " + error);
    }
  });
}
