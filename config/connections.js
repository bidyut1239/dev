module.exports.connections = {

  localDiskDb: {
    adapter: 'sails-disk'
  },

  mongoConnectionDBDev: {
     adapter: 'sails-mongo',
     host: '18.216.62.223',
     port: 27017,
     user: 'password',
     password: 'qwerty123',
     database: 'dev'
   }

};
