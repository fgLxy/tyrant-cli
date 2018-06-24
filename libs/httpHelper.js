'use strict'

const request = require('request');
const url = require('url');
const {unpack} = require('tar-pack');
const fs = require('fs');

let doHttp = (params) => {
    return new Promise((resolve, reject) => {
        request(params, function(error, response, body) {
            if (!error && response.statusCode === 200) {
                resolve(body);
            }
            else {
                reject(error, response);
            }
        });
    });
}

const get = async (requestURL, params) => {
    if (params) {
        let urlObj = url.parse(requestURL);
        urlObj.query = params;
        requestURL = url.format(urlObj).toString();
    }
    console.dir(requestURL);
    return await doHttp({
        url: requestURL,
        method: 'GET',
        json: true,
        timeout: 2000
    });
}
const post = async (requestURL, params) => {
    return await doHttp({
        url: requestURL,
        method: 'POST',
        json: true,
        timeout: 2000,
        headers: {
            'content-type': 'application/json'
        },
        body: params ? JSON.stringify(params) : ""
    });
}
const download = (requestURL, params) => {
    if (params) {
        let urlObj = url.parse(requestURL);
        urlObj.query = params;
        requestURL = url.format(urlObj).toString();
    }
    return request.get(requestURL);
}
module.exports = {
    get: get,
    post: post,
    download: download
}