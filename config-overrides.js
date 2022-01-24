const webpack = require('webpack');
const path = require('path');

module.exports = function override(config, env) {

  config.resolve.alias = {
    ...config.resolve.alias,
    'react/jsx-dev-runtime': 'react/jsx-dev-runtime.js',
    'react/jsx-runtime': 'react/jsx-runtime.js',
  };

  config.resolve.fallback = {
    ...config.resolve.fallback,
    buffer: require.resolve('buffer/'),
    crypto: require.resolve('crypto-browserify'),
    stream: require.resolve('stream-browserify'),
  };

  config.plugins.push(
    new webpack.ProvidePlugin({
      Buffer: ['buffer', 'Buffer'],
    }),
  );

  config.experiments = {
    asyncWebAssembly: true,
  };

  config.module.rules.push({ 
    test: /\.wasm$/,
    type: 'webassembly/async'
  });

  return config;
};
