const { DataStore } = require('notarealdb');
const { open } = require('sqlite');
const sqlite3 = require('sqlite3');
const knex = require("knex");

const mysql = require("./dbHelpers");

const localStore = new DataStore('../data');

async function sqliteDb() {
  return open({
    filename: '/tmp/database.db',
    driver: sqlite3.Database
  })
}


const knexClient = knex({
  client: "mysql",
  connection: {
    host: "127.0.0.1",
    port: 3306,
    user: "root",
    password: "a1l9i7y8u",
    database: "prismadb"
  }
});



module.exports = {
  localStore,
  knexClient,
  offers: localStore.collection('offers'),
  users: localStore.collection('users'),
  mysql,
  sqliteDb,
};
