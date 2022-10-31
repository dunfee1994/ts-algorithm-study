const babel = require('gulp-babel')

const replaceLib = require('./replaceLib')
const getBabelCommonConfig = require('./babelConfig')

module.exports = function babelify(js, modules) {
    const babelConfig = getBabelCommonConfig(modules)

    babelConfig.babelrc = false
    delete babelConfig.cacheDirectory

    if (modules === false) {
        babelConfig.plugins.push(replaceLib)
    }

    return js.pipe(babel(babelConfig))
}
