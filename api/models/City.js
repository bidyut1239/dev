/**
 * City.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

 'use strict';

 var Q = require('q');

module.exports = {

  attributes: {
    city: {
      type: 'string',
      required: true
    },
    country: {
      type: 'string',
      required: true
    }
  },
  createCity: createCity,
  getAllCities: getAllCities,
  deleteCity: deleteCity,
  removeCity: removeCity
};


function createCity(cityDetails) {
  return Q.promise(function (resolve, reject) {
    City
      .create(cityDetails)
      .then(function (cityDetailsResponse) {
        // create new profile
        // console.log("createdCity::Model " + JSON.stringify(cityDetailsResponse));
        return resolve(cityDetailsResponse);
      })
      .catch(function (err) {
        sails.log.error('cityDetails#Error :: ', err);
        err.message = "Unable to create city";
        return reject(err);
      });
  });
}

function getAllCities() {
  return Q.promise(function (resolve, reject) {
    City
      .find()
      .then(function (citiesDetailsResponse) {
        // create new profile
        // console.log("allCities::Model " + JSON.stringify(citiesDetailsResponse));
        return resolve(citiesDetailsResponse);
      })
      .catch(function (err) {
        sails.log.error('cityDetails#Error :: ', err);
        err.message = "Unable to create city";
        return reject(err);
      });
  });
}

function deleteCity(cityId) {
    return Q.promise(function (resolve, reject) {
      var criteria = {
        id: cityId
      };
      // console.log("::::::::::::::::::::::::::::: " + cityId);
      City
        .findOne(criteria)
        .then(function (city) {
          if (!city) {
            return reject({
              code: 404,
              message: 'City not found'
            });
          } else {
            // console.log("Model::CityFoundNow " + city);

            // convert the user
            return City
                      .removeCity(cityId)
                      .then(resolve)
                      .catch(function(err) {
                        sails.log.error("City#removeCity:: Error :: ", err);
                        return reject({
                          code: 500,
                          message: "Internal Server Error"
                        });
                      });
          }
        })
        .catch(function (err) {
          // caught the error
          sails.log.error('City:: Error in query :: ', err);
          err.message = "Internal server error";

          return reject(err);
        });
    });
}

function removeCity(id) {
  return Q.promise(function(resolve, reject) {
    City
      .destroy(id)
      // success block
      .then(function() {
        // do other tasks with new admin
        return resolve();
      })
      // error block
      .catch(function(err) {
        sails.log.error("City#removeCity:: Error :: ", err);

        return reject({
          code: 500,
          message: "Internal Server Error"
        });
      });
  });

}
