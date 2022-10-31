const rimraf = require('rimraf')

const { getProjectPath } = require('../utils/projectHelper')

const esDir = getProjectPath('es')
const libDir = getProjectPath('lib')

function getFolderDir(modules) {
    return modules === false ? esDir : libDir
}

function removeFolder(modules) {
    rimraf.sync(getFolderDir(modules))
}

module.exports = {
    removeFolder,
    getFolderDir
}
