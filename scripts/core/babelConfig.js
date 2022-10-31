const { resolve } = require('../utils/projectHelper')

module.exports = function (modules) {
    return {
        presets: [
            [
                resolve('@babel/preset-env'),
                {
                    modules,
                    targets: {
                        browsers: [
                            'last 2 versions',
                            'Firefox ESR',
                            '> 1%',
                            'not ie 11'
                        ]
                    }
                }
            ]
        ],
        plugins: [
            resolve('@babel/plugin-transform-typescript'),
            resolve('@babel/plugin-transform-object-assign'),
            resolve('@babel/plugin-proposal-export-default-from'),
            [
                resolve('@babel/plugin-proposal-object-rest-spread'),
                {
                    loose: true,
                    useBuiltIns: false
                }
            ],
            [
                resolve('@babel/plugin-transform-runtime'),
                {
                    useESModules: modules === false,
                    version: '^7.10.4'
                }
            ]
        ]
    }
}
