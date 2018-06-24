'use strict'

const chalk = require('chalk');
const argv = require('../argv');
const fs = require('fs-extra');
const shell = require('shelljs');

const DEFAULT_PORT = 8000;

let loadConfig = () => {
    try {
        return fs.readJsonSync('tyBuild.json');
    } catch (e) {
        console.error(chalk.red('加载构建配置文件tyBuild.json失败.'));
        return;
    }    
}

if (!argv._) return;
let cmd = argv._[0];
if (cmd !== 'dev') return;
let port = argv['p'];
port = port ? port : DEFAULT_PORT;
let config = loadConfig();
if (!config) return;
let buildTool = config.buildTool;
shell.exec(`node node_modules/${buildTool}/build/dev.js -p ${port}`);