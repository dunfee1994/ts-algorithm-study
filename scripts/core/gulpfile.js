const gulp = require('gulp')
const runCmd = require('./runCmd')

gulp.task('git-push-to-gitee', cb => {
    runCmd('git', ['push', 'origin'], (code, result) => result ? cb(result) : cb())
})

gulp.task('git-push-to-github', cb => {
    runCmd('git', ['push', 'github'], (code, result) => result? cb(result) : cb())
})

gulp.task('git-push', gulp.series(
    gulp.parallel(
        'git-push-to-gitee',
        'git-push-to-github'
    )
))
