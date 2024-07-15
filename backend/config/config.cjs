const config = require('config');

module.exports = {
  development: {
    url: config.get('postgresURI'),
    dialect: 'postgres',
  },
  test: {
    url: config.get('postgresURI'),
    dialect: 'postgres',
  },
  production: {
    url: config.get('postgresURI'),
    dialect: 'postgres',
  },
};
