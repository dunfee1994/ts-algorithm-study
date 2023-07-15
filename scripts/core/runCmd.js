const isWindows = require('is-windows')
const { spawn } = require('child_process')

const getRunCmdEnv = require('../utils/getRunCmdEnv')

module.exports = function runCmd(cmd, _args, options = {}) {
    const args = _args || []
    const onClose = options.onClose
    const stdio = options.stdio || 'inherit'

    if (isWindows()) {
        args.unshift(cmd)
        args.unshift('/c')
        cmd = process.env.ComSpec
    }

    const runner = spawn(cmd, args, {
        stdio,
        env: getRunCmdEnv()
    })

    let result = null
    if (stdio === 'pipe') {
        result = result || ''

        runner.stdout.on('data', data => {
            result += data.toString()
        })
    }

    runner.on('close', code => onClose && onClose(code, result))
}
