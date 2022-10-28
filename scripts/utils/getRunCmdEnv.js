const path = require('path')
const isWindows = require('is-windows')

function generateEnvKeyValue(env, key, nodeModulesBinDir) {
    if (!env[key]) return nodeModulesBinDir
    return `${nodeModulesBinDir}${isWindows() ? ';' : ':'}${env[key]}`
}

module.exports = function getRunCmdEnv() {
    const env = {}
    const processEnv = process.env

    const nodeModulesBinDir = path.join(__dirname, '../../node_modules/.bin')

    Object.keys(processEnv).forEach(key => {
        env[env] = processEnv[key]
    })

    const filteredEtries = Object.entries(env).filter(
        v => v.slice(0, 1).pop().toLowerCase() === 'path'
    )

    filteredEtries.forEach(v => {
        const key = v.slice(0, 1).pop()
        env[key] = generateEnvKeyValue(env, key, nodeModulesBinDir)
    })
}
