const fs = require('fs')
const path = require('path')

const cwd = process.cwd()

function resolve(moduleName) {
    return require.resolve(moduleName)
}

function getProjectPath(...filePath) {
    return path.join(cwd, ...filePath)
}

function getConfig() {
    const configPath = getProjectPath('.tools.config.js')
    return fs.existsSync(configPath) ? require(configPath) : {}
}

module.exports = {
    resolve,
    getConfig,
    getProjectPath
}
