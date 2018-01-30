const request = require('request-promise');
const base64 = require('Base64');
const configuration = require('./configuration');

const GERRIT_URL = require('./constants').GERRIT_URL;
const sum = require('./constants').sum;

const credentials = base64.btoa(configuration.username + ":" + configuration.password);

function removeGerritXSRFProtection(json) {
    if (!json.startsWith(')]}\'')) {
        throw Error(`API call did not return valid JSON: ${json}`);
    }
    return JSON.parse(json.substring(4, json.length));
}

// TODO: Support more intelligent building of search query URL
function buildSearchQuery(status, group, additionalOptions) {
    let queryString = '';
    if (status && group && additionalOptions) {
        queryString += `?q=status:${status}+ownerin:${group}`;
        queryString += additionalOptions ? additionalOptions.map(option => "&o=" + option).reduce(sum) : '';
    }
    return queryString;
}

function performGerritRequest({status, ownerGroup, additionalOptions}, processingFunction, apiCall) {
    let gerritSearchQuery = buildSearchQuery(status, ownerGroup, additionalOptions);

    const options = {
        method: "GET",
        "rejectUnauthorized": false,
        "url": GERRIT_URL + "/a/" + apiCall + gerritSearchQuery,
        "headers": {
            "Accept": "application/json",
            "Authorization": "Basic " + credentials
        }
    };
    return request(options)
        .then(removeGerritXSRFProtection)
        .then(processingFunction);
}

module.exports = performGerritRequest;