const config = {
  production: {
    SECRET: process.env.SECRET,
    DATABASE: process.env.MONGODB_URI,
    PORT: process.env.PORT
  },
  default: {
    SECRET: 'SDFDSFS',
    DATABASE: 'mongodb://localhost:23456/game-db',
    PORT: 5000
  }
};

exports.get = function get(env) {
  return config[env] || config.default;
}