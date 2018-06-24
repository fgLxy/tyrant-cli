'use strict'

const yargs = require('yargs');

yargs.usage('脚手架工具: ty <command> [options]')
     .command('init', '初始化模板项目.指定使用的模板:-t vue.支持的模板[vue]')
     .command('dev', '开发模式启动.-p指定端口号.例如-p 8000')  
     .command('build', '开发环境构建')
     .command('publish', '生产环境构建')

module.exports = yargs.argv;