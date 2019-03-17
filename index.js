#!/usr/bin/env node

'use strict'

const chalk = require('chalk');
console.log(chalk.green('ty脚手架开始运行'));

require('./libs/init');
require('./libs/dev');
require('./libs/build');
require('./libs/publish');
