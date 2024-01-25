require('custom-env').env(`${process.env.NODE_ENV}`)
import Sequelize from 'sequelize'

export const sequelize = new Sequelize(process.env.DATABASE, process.env.USER_DB, process.env.PASSWORD, {
  logging: false,
  host: process.env.HOST,
  dialect: process.env.DIALECT,
  operatorsAliases: false,
  omitNull: true,
  port:  process.env.DB_PORT,
  timezone: '+07:00',
  pool: process.env.DB_POOL,
  define: {
    schema: 'public',
  },
});

export const authSqualize = new Sequelize( process.env.AUTH_DATABASE, process.env.AUTH_USER_DB, process.env.AUTH_PASSWORD, {
  logging: false,
  host: process.env.AUTH_HOST,
  dialect: process.env.AUTH_DIALECT,
  operatorsAliases: false,
  omitNull: true,
  port:  process.env.AUTH_DB_PORT,
  timezone: '+07:00',
  pool: process.env.AUTH_DB_POOL,
  define: {
    schema: 'public',
  }
});