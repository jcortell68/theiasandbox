//@ts-check

'use strict';

const path = require('path');

//@ts-check
/** @typedef {import('webpack').Configuration} WebpackConfig **/

/** @type WebpackConfig */
const extensionConfig = {
    target: 'node', // VS Code extensions run in a Node.js-context 📖 -> https://webpack.js.org/configuration/node/
    mode: 'none', // this leaves the source code as close as possible to the original (when packaging we set this to 'production')

    entry: './src/extension.ts', // the entry point of this extension, 📖 -> https://webpack.js.org/configuration/entry-context/
    output: {
        // the bundle is stored in the 'lib' folder (check package.json), 📖 -> https://webpack.js.org/configuration/output/
        path: path.resolve(__dirname, 'lib'),
        filename: 'extension.js',
        libraryTarget: 'commonjs2'
    },

    // https://webpack.js.org/configuration/externals/
    externals: [
        // The vscode extension API modules are created on-the-fly
        // by the Theia app. It's not something that can be
        // webpacked.
        function ({ context, request }, callback) {
            if (request === 'vscode') {
                return callback(null, 'vscode', 'commonjs2');
            }
            callback();
        }
        // modules added here also need to be added in the .vscodeignore file
    ],

    resolve: {
        // support reading TypeScript and JavaScript files, 📖 -> https://github.com/TypeStrong/ts-loader
        extensions: ['.ts', '.js']
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'ts-loader'
                    }
                ]
            }
        ]
    },
    devtool: 'nosources-source-map',
    infrastructureLogging: {
        level: 'log' // enables logging required for problem matchers
    }
};

/**
 * @param { WebpackConfig['entry'] } entry
 */
function getWebviewConfig(entry) {
    const basePath = path.join(__dirname, 'webviews');
    return {
        name: 'webviews',
        entry: entry,
        mode: 'development',
        target: 'web',
        devtool: 'eval-source-map',
        output: {
            filename: '[name].js',
            path: path.resolve(__dirname, 'lib')
        },
        module: {
            rules: [
                {
                    exclude: /node_modules/,
                    include: [basePath, path.join(__dirname, 'src')],
                    test: /\.tsx?$/,
                    use: {
                        loader: 'ts-loader',
                        options: {
                            configFile: path.join(__dirname, 'tsconfig.webviews.json'),
                            experimentalWatchApi: true,
                            transpileOnly: true
                        }
                    }
                }
            ]
        },
        resolve: {
            extensions: ['.ts', '.tsx', '.js', '.jsx', '.json', '.svg']
        }
    };
}

module.exports = [
    extensionConfig,
    getWebviewConfig({
        mywebview: './webviews/mywebview.ts'
    })
];