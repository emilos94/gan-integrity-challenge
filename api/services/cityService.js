'use strict'

const earth_radius_km = 6371;
const hardCodedAreaResultId = '2152f96f-50c7-4d76-9e18-f7033bd14428';

// todo: persistent result layer which should be cleared after a period of time 
const areaResultsMap = new Map();

// todo: persistent data layer
const addressData = require('../../res/addresses.json');

exports.citiesByTag = function(tag, isActive) {
    return addressData.filter(address =>
        address.isActive === isActive && address.tags.includes(tag)
    );
}

exports.distanceBetween = function(from, to) {
    const addressFrom = addressByGuid(from);
    const addressTo = addressByGuid(to);
    const distance = distanceBetweenAddresses(addressFrom, addressTo);

    // todo: dto / response data models
    return {
        'from' : addressFrom,
        'to' : addressTo,
        'unit' : 'km',
        'distance' : distance
    }
}

exports.addressesInArea = (from, distance) => {
    // todo: use web workers or other proper background task ?
    setTimeout(() => {
        const addressFrom = addressByGuid(from);
        const addressesInArea = addressData.filter(address => address.guid !== addressFrom.guid && distanceBetweenAddresses(addressFrom, address) <= distance);
        areaResultsMap.set(hardCodedAreaResultId, addressesInArea);
    }, 0);

    return hardCodedAreaResultId;
}

exports.areaResult = resultId => {
    if (areaResultsMap.has(resultId)) return areaResultsMap.get(resultId);

    return null;
}

exports.allCities = () => addressData;

const distanceBetweenAddresses = (address1, address2) => {
    const distance = harvesineDistance(address1.latitude, address1.longitude, address2.latitude, address2.longitude);
    return parseFloat(distance.toFixed(2));
}

const addressByGuid = uuid => addressData.find(city => city.guid === uuid);

const toRadian = function(num) {
    return num * Math.PI / 180;
}

const harvesineDistance = function(lat1, lon1, lat2, lon2) {
    var dLat = toRadian(lat2-lat1);  
    var dLon = toRadian(lon2-lon1);
    var a = Math.sin(dLat/2) * Math.sin(dLat/2) + 
                    Math.cos(toRadian(lat1)) * Math.cos(toRadian(lat2)) * 
                    Math.sin(dLon/2) * Math.sin(dLon/2);  
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    return earth_radius_km * c; 
}