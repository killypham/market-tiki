require('dotenv').config();

module.exports = {
  uri: process.env.NODE_ENV === 'production' ? process.env.cloud_uri : process.env.local_uri
}