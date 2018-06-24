'use strict'

const chalk = require('chalk');
const argv = require('../argv');
const npmHelper = require('../npmHelper');
const shell = require('shelljs');
let templates = {
    'vue': '@tyrant/tyrant-vue-proj',
    'test': '@tyrant/tyrant-cli'
}

if (!argv._) return;
let cmd = argv._[0];
if (cmd !== 'init') return;
let template = argv['t'];
if (!template) {
    console.error(chalk.red('请指定要初始化的模板.例如ty init -t vue.'));
    return;
}
if (!templates[template]) {
    console.error(chalk.red('不支持该模板.脚手架目前支持的模板列表'));
    for (let key in templates) {
        console.error(chalk.red(key));
    }
    return;
}
console.log(chalk.green('准备初始化项目.使用模板:', template));
npmHelper.downloadAndUnzip(templates[template]).then(function() {
    console.log(chalk.green('安装依赖'));
    shell.exec(`cnpm i`);
    return;
})