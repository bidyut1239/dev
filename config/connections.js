module.exports.connections = {

  localDiskDb: {
    adapter: 'sails-disk'
  },

  mongoConnectionDBDev: {
     adapter: 'sails-mongo',
     host: 'localhost',
     port: 27017,
     user: '',
     password: '',
     database: 'dev'
   }
};
