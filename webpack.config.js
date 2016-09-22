    const escapeStringRegExp = require('escape-string-regexp');
    const project = require('./package.json');

    module.exports = {
        entry: './src/index.js',
        resolve: {
            extensions: ['.js']
        },
        target: 'node',
        output: {
            filename: 'bundle.js',
            path: './dist',
            libraryTarget: 'commonjs'
        },
        externals: (
            Object.keys(project.dependencies).map((mod) => {
                new RegExp(`^${escapeStringRegExp(mod)}(?:\/.*)?$`)
            })
        ),
        devtool: 'eval',
        module: {
            rules: [
                {
                    enforce: 'pre',
                    test: /\.js?$/,
                    loaders: ['eslint-loader'],
                    include: 'src'
                },
                {
                    test: /\.js$/,
                    loaders: ['babel-loader'],
                    include: 'src'
                }
            ]
        }
    };
