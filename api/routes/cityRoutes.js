'use strict';
const cityService = require('../controllers/cityController');

module.exports = function(app) {
    app.route('/cities-by-tag')
        .get(cityService.citiesByTag)

    app.route('/distance')
        .get(cityService.distanceBetween)

    app.route('/area')
        .get(cityService.area)
    
    app.route('/area-result/:resultId')
        .get(cityService.areaResult)
    
    app.route('/all-cities')
        .get(cityService.allCities)
};