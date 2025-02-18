const Sequelize = require('sequelize')
const pkg = require('../../package.json')

const databaseName = pkg.name + (process.env.NODE_ENV === 'test' ? '-test' : '')

const config = {
  logging: false
};

if(process.env.LOGGING === 'true'){
  delete config.logging
}

//https://stackoverflow.com/questions/61254851/heroku-postgres-sequelize-no-pg-hba-conf-entry-for-host
if(process.env.DATABASE_URL){
  config.dialectOptions = {
    ssl: {
      rejectUnauthorized: false
    }
  };
}

const db = new Sequelize(
  
  
  //  process.env.DATABASE_URL || `postgres://ezstack_user:p9aT3cH05CKYJR8So9u9cbMF7I02Koun@dpg-cfn7peirrk0eqlv3ooc0-a/ezstack`, config)
   process.env.DATABASE_URL || `postgres://localhost:5432/${databaseName}`, config)
  // `postgres://patkilcullen:Bp2DCMjuZnYalTrj4AVFkI2YLsAkgZ19@dpg-cfn9v3irrk0eqlviln0g-a/ezstack_cra7`, config)
  
module.exports = db
