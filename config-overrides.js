const webpack = require('webpack');

module.exports = function override(config, env) {
  config.resolve.alias = {
    ...config.resolve.alias,
    'react/jsx-dev-runtime': 'react/jsx-dev-runtime.js',
    'react/jsx-runtime': 'react/jsx-runtime.js',
  };

  config.resolve.fallback = {
    ...config.resolve.fallback,
    buffer: require.resolve('buffer/'),
  };

  config.plugins.push(
    new webpack.ProvidePlugin({
      Buffer: ['buffer', 'Buffer'],
    }),
  );

  return config;
};
