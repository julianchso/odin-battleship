const path = require('path');

module.exports = {
  entry: './src/app/controller/main.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  mode: 'development',
};
