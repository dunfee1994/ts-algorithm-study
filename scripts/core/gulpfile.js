const gulp = require('gulp')
const runCmd = require('./runCmd')
const compile = require('./compile')
const complieTs = require('./complieTs')
const argv = require('minimist')(process.argv.slice(2))

const { getConfig } = require('../utils/projectHelper')

const startTime = new Date()
const getDurationTimes = (startTime, endTime) => (endTime - startTime) / 1e3

/** 向 gitee 远程仓库指定分支推送代码 */
gulp.task('git-push-to-gitee', done => {
    const branch = argv['branch'] || 'master'

    console.log('start at', startTime)
    console.log('[Parallel] git push to gitee', branch)

    runCmd('git', ['push', 'gitee', branch], {
        onClose(code) {
            console.log('[Parallel] git push to gitee', branch)
            console.log(code === 0 ? 'success' : 'failure', 'at', new Date())
            done()
        }
    })
})

/** 向 github 远程仓库指定分支推送代码 */
gulp.task('git-push-to-github', done => {
    const branch = argv['branch'] || 'master'

    console.log('start at', startTime)
    console.log('[Parallel] git push to origin', branch)

    runCmd('git', ['push', 'origin', branch], {
        onClose(code) {
            console.log('[Parallel] git push to origin', branch)
            console.log(code === 0 ? 'success' : 'failure', 'at', new Date())
            done()
        }
    })
})

/** 向远程仓库指定分支推送代码 */
gulp.task('git-push', gulp.series(
    gulp.parallel(
        'git-push-to-gitee',
        'git-push-to-github'
    ),
    done => {
        const endTime = new Date()
        console.log('end git-push at', endTime)
        console.log('git-push time', getDurationTimes(startTime, endTime), 's')
        done()
    }
))

/** 检查 typescript 文件 */
gulp.task('check-ts', done => complieTs().on('finish', done))

/** 编译输出 es 目录 */
gulp.task('compile-with-es', done => {
    console.log('start compile at', startTime)
    console.log('[Parallel] Compile to es...')
    compile(false).on('finish', done)
})

/** 编译输出 lib 目录 */
gulp.task('compile-with-lib', done => {
    console.log('start compile at', startTime)
    console.log('[Parallel] Compile to lib...')
    compile().on('finish', done)
})

/** 编译完成后的最终处理 */
gulp.task('compile-finalize', done => {
    const { compile } = getConfig()
    if (compile && compile.finalize) {
        console.log('[Compile] Finalization...')
        compile.finalize()
    }
    done()
})

/** 编译输出 es 和 lib 目录 */
gulp.task('compile', gulp.series(
    gulp.parallel(
        'compile-with-es',
        'compile-with-lib'
    ),
    'compile-finalize', done => {
        const endTime = new Date()
        console.log('end compile at', endTime)
        console.log('compile time', getDurationTimes(startTime, endTime), 's')
        done()
    }
))
