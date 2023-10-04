const path = require('path');

module.exports = {
  entry: './src/app/controller/gameController.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  mode: 'development',
};
