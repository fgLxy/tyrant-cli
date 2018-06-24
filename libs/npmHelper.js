'use strict'

const http = require('./httpHelper');
const config = require('../package.json');
const chalk = require('chalk');
const {unpack} = require('tar-pack');
const path = require('path');
const fs = require('fs-extra');

const getNodeModuleURL = async function(moduleName) {
    const data = await http.get(config.npmURL + moduleName);
    let latestVersion = data['dist-tags'] && data['dist-tags']['latest'];
    let latestVersionData = data.versions[latestVersion];
    console.log(chalk.green(`${moduleName} last version is ${latestVersion}.`));
    return latestVersionData.dist && latestVersionData.dist.tarball;
}

const downloadAndUnzip = async function(moduleName) {
    let downloadURL = await getNodeModuleURL(moduleName);
    console.log(chalk.green(`module download url:${downloadURL}`));
    let splitFlag = downloadURL.lastIndexOf('/') + 1;
    let fileName = downloadURL.substring(splitFlag);
    return new Promise((resolve, reject) => {
        console.log(chalk.green(`current dir:${process.cwd()}`));
        let read = http.download(downloadURL);
        read.on('response', function(response) {
            if (response.statusCode !== 200 && response.statusCode !== 304) {
                console.error(chalk.red(`下载${moduleName}失败.返回值:${response.body}`));
                reject(null, response);
            }
        }).on('error', function(error) {
            console.error(chalk.red(`download ${moduleName} fail.${error}`));
            reject(error);
        })
        read.pipe(unpack(path.join(process.cwd(), moduleName), function(error) {
            if (!error) {
                fs.moveSync(path.join(process.cwd(), moduleName), process.cwd());
                console.log(chalk.green(`下载${moduleName}成功!`));
                resolve();
            }
            else {
                console.error(chalk.red(`下载${moduleName}失败.错误:${error}`));
                reject(error);
            }
        }));
    })
}

module.exports = {
    getNodeModuleURL: getNodeModuleURL,
    downloadAndUnzip: downloadAndUnzip
}