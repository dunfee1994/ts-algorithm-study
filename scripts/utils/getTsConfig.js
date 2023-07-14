const fs = require('fs')

const { getProjectPath } = require('./projectHelper')

const commonTsConfig = getProjectPath('tsconfig.json')

module.exports = function getTsConfig() {
    let my = {}

    if (fs.existsSync(commonTsConfig)) {
        my = require(commonTsConfig)
    }

    return my.compilerOptions || {}
}
