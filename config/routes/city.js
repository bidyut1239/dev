module.exports.routes = {

    'post /city/createCity': {
      controller: 'CityController',
      action: 'createCity'
    },
    'get /city/getAllCities': {
      controller: 'CityController',
      action: 'getAllCities'
    },
    'post /city/:cityId/deleteCity': {
      controller: 'CityController',
      action: 'deleteCity'
    }
};
