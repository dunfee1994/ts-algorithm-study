const gulp = require('gulp')
const gulpTs = require('gulp-typescript')

const tsConfig = require('../utils/getTsConfig')()

const tsFiles = ['packages/core/**/*.ts']

module.exports = function complieTs() {
    return gulp.src(tsFiles).pipe(gulpTs(tsConfig))
}
