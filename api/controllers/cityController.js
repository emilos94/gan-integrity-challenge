'use strict';

var cityService = require('../services/cityService');
var httpStatus = require('http-status-codes');
var config = require('../../config');

// todo: nicer way of authenticating incoming requests, this is polluting all authenticated entry functions atm
// todo: should be in separate file
const authorizeRequest = function(req, res) {
    const bearerToken = req.get('Authorization');

    if (bearerToken === undefined || bearerToken !== 'bearer dGhlc2VjcmV0dG9rZW4=') {
        res.status(httpStatus.UNAUTHORIZED);
        res.send();
        return false;
    }

    return true;
}

exports.citiesByTag = function(req, res) {
    if (authorizeRequest(req, res)) {
        const tag = req.query.tag;
        const isActive = req.query.isActive === 'true';
        const cities = cityService.citiesByTag(tag, isActive);
        sendJson(res, {'cities': cities}, httpStatus.OK);
    }
};

exports.distanceBetween = function(req, res) {
    if (authorizeRequest(req, res)) {
        const from = req.query.from;
        const to = req.query.to;
        const distanceResult = cityService.distanceBetween(from, to);
        sendJson(res, distanceResult, httpStatus.OK);
    }
}

exports.area = (req, res) => {
    if (authorizeRequest(req, res)) {
        const area = req.query.from;
        const distance = req.query.distance;
        const areaResultId = cityService.addressesInArea(area, distance);
        sendJson(res, {'resultsUrl' : config.protocol + '://' + config.domain + ':' + config.port + '/area-result/' + areaResultId}, httpStatus.ACCEPTED);
    }
}

exports.areaResult = (req, res) => {
    if (authorizeRequest(req, res)) {
        const resultId = req.params.resultId;
        const result = cityService.areaResult(resultId);
        if (result === null) {
            res.set(httpStatus.ACCEPTED);
            res.send();
        }
        else {
            sendJson(res, {'cities': result}, httpStatus.OK);
        }
    }
}

exports.allCities = (req, res) => {
    if (authorizeRequest(req, res)) {
        const cities = cityService.allCities();
        res.set(httpStatus.OK);
        res.write(JSON.stringify(cities));
        res.end();
    }
}

const sendJson = (res, body, status) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(status);
    res.send(body);
}