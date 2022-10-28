const isWindows = require('is-windows')

const getRunCmdEnv = require('./getRunCmdEnv')

module.exports = function runCmd(cmd, _args, fn) {
    const args = _args || []

    if (isWindows()) {
        args.unshift(cmd)
        args.unshift('/c')
        cmd = process.env.ComSpec
    }

    const runner = require('child_process').spawn(cmd, args, {
        stdio: 'inherit',
        env: getRunCmdEnv()
    })

    runner.on('close', code => fn && fn(code))
}
