require('colorful').colorful()

const gulp = require('gulp')
const program = require('commander')

program.option('--branch <type>', 'add --branch=xxx')

program.on('--help', () => {
    console.log('  Usage:'.to.bold.blue.color)
    console.log()
})

program.parse(process.argv)

function runTask(task) {
    const metadata = { task }
    const taskInstance = gulp.task(task)

    if (taskInstance === undefined) {
        gulp.emit('task_not_found', metadata)
        return
    }

    const start = process.hrtime()
    gulp.emit('task_start', metadata)

    try {
        taskInstance.apply(gulp)
        metadata.hrDuration = process.hrtime(start)
        gulp.emit('task_stop', metadata)
        gulp.emit('stop')
    } catch (err) {
        err.hrDuration = process.hrtime(start)
        err.task = metadata.task
        gulp.emit('task_err', err)
    }
}

const task = program.args[0]
if (!task) {
    program.help()
} else {
    console.log('tools run', task)

    require('../core/gulpfile')
    runTask(task)
}
