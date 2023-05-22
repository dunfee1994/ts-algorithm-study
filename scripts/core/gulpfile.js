const gulp = require('gulp')
const runCmd = require('./runCmd')
const compile = require('./compile')
const argv = require('minimist')(process.argv.slice(2))

const { getConfig } = require('../utils/projectHelper')

let startTime = new Date()

gulp.task('git-push-to-gitee', cb => {
    const branch = argv['branch'] || 'master'
    runCmd('git', ['push', 'gitee', branch], (code, result) => result ? cb(result) : cb())
})

gulp.task('git-push-to-github', cb => {
    const branch = argv['branch'] || 'master'
    runCmd('git', ['push', 'origin', branch], (code, result) => result? cb(result) : cb())
})

gulp.task('git-push', gulp.series(
    gulp.parallel(
        'git-push-to-gitee',
        'git-push-to-github'
    )
))

gulp.task('compile-with-es', done => {
    console.log('start compile at ', startTime)
    console.log('[Parallel] Compile to es...')
    compile(false).on('finish', done)
})

gulp.task('compile-with-lib', done => {
    console.log('start compile at ', startTime)
    console.log('[Parallel] Compile to lib...')
    compile().on('finish', done)
})

gulp.task('compile-finalize', done => {
    const { compile } = getConfig()
    if (compile && compile.finalize) {
        console.log('[Compile] Finalization...')
        compile.finalize()
    }
    done()
})

gulp.task('compile', gulp.series(
    gulp.parallel(
        'compile-with-es',
        'compile-with-lib'
    ),
    'compile-finalize', done => {
        console.log('end compile at ', new Date())
        console.log('compile time ', (new Date() - startTime) / 1000, 's')
        done()
    }
))
