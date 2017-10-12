/**
 * CityController
 *
 * @description :: Server-side logic for managing cities
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	createCity: createCityAction,
	getAllCities: getAllCitiesAction,
	deleteCity: deleteCityAction
};

function createCityAction(req, res) {
	var cityDetails = req.params.all();
	// console.log("commentDetails:: " + JSON.stringify(commentDetails));
	City
		.createCity(cityDetails)
		.then(function(cityDetailsResponse) {
			console.log("cityDetailsResponse::Controller " + JSON.stringify(cityDetailsResponse));
			return res.json(cityDetailsResponse);
		})
		.catch(function(err) {
			return res.json(err);
		});
}

function getAllCitiesAction(req, res) {
	City
		.getAllCities()
		.then(function(allCitiesResponse) {
			console.log("allCitiesResponse::Controller " + JSON.stringify(allCitiesResponse[1]));
			return res.json(allCitiesResponse);
		})
		.catch(function(err) {
			return res.json(err);
		});
}

function deleteCityAction(req, res) {
	var cityId = req.param("cityId");
	City
		.deleteCity(cityId)
		.then(function () {
				var response = {
					message: "City deleted successfully"
				};
				return res.json(response);
		})
		.catch(function (err) {
			console.log("Contact::errors " + err);
			return res.json(err);
		});
}
