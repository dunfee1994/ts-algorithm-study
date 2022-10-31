const gulp = require('gulp')
const stripCode = require('gulp-strip-code')

const babelify = require('./babelify')
const { removeFolder, getFolderDir } = require('./folder')

module.exports = function compile(modules) {
    removeFolder(modules)

    let sourceStream = gulp.src(['packages/**/*.js', 'packages/**/*.ts', '!packages/*/__tests__/*'])
    if (modules === false) {
        sourceStream = sourceStream.pipe(
            stripCode({
                start_comment: '@remove-on-es-build-begin',
                end_comment: '@remove-on-es-build-end',
            })
        )
    }

    return babelify(sourceStream, modules).pipe(gulp.dest(getFolderDir(modules)))
}
