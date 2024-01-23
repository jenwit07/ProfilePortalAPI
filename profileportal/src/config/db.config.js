require('custom-env').env(`${process.env.NODE_ENV}`)
require('custom-env').env(`${process.env.NODE_ENV}`)
import Sequelize from 'sequelize'

export const sequelize = new Sequelize(process.env.DATABASE, process.env.USER_DB, process.env.PASSWORD, {
  logging: false,
  host: process.env.HOST,
  dialect: process.env.DIALECT,
  operatorsAliases: false,
  omitNull: true,
  port:  process.env.DB_AUTH,
  timezone: '+07:00',
  pool: process.env.DB_POOL,
  define: {
    schema: 'public', // replace 'your_schema' with the actual schema name
  },
});
