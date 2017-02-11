const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');

const ENV = require('./env');
const PATHS = {
    src: path.join(__dirname, 'src'),
    build: path.join(__dirname, 'dist'),
};

process.env.BABEL_ENV = ENV;

const common = {
    entry: PATHS.src,
    output: {
        path: PATHS.build,
        filename: 'bundle.js',
    },

    module: {
        loaders: [
            {
                test: /\.css$/,
                loader: "style-loader!css-loader",
            },
            {
                test: /\.scss$/,
                loader: "style-loader!css-loader!sass-loader",
            },
            {
                test: /\.jsx?$/,
                loader: 'babel?cacheDirectory',
                include: PATHS.src,
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2)$/,
                loader: 'url'
            }
        ]
    },
    resolve: {
        extensions: ['', '.js', '.css', '.scss'],
        modulesDirectories: ['node_modules', 'src'],
        aliases: {
            'boostrap': path.join(__dirname, 'node_modules/boostrap-sass/assets/stylesheets')
        }

    }
};

if (ENV === 'development') {
    module.exports = merge(common, {
        devServer: {
            contentBase: PATHS.build,

            // Enable history API fallback so HTML5 History API based
            // routing works. This is a good default that will come
            // in handy in more complicated setups.
            historyApiFallback: true,
            hot: true,
            inline: true,
            progress: true,

            // Display only errors to reduce the amount of output.
            stats: 'errors-only',

            // Parse host and port from env so this is easy to customize.
            host: process.env.HOST,
            port: process.env.PORT,
        },
        plugins: [
            new webpack.HotModuleReplacementPlugin(),
        ],
    });
} else {
    // config can be added here for minifying / etc
    module.exports = merge(common, {});
}
