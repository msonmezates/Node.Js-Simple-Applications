const config = {
  production: {
    SECRET: 'SDFSDSF',
    DATABASE: process.env.MONGODB_URI,
    PORT: process.env.PORT
  },
  default: {
    SECRET: 'GSDFFASDAS',
    DATABASE: 'mongodb://localhost:23456/auth',
    PORT: 5000
  }
};

exports.get = function get(env) {
  return config[env] || config.default;
}