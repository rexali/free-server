const { DataStore } = require('notarealdb');

const knex = require("knex");

const mysql = require("./mysql/dbHelpers")

const store = new DataStore('./data');

const client = knex({
    client: "mysql",
    connection: {
        host: "127.0.0.1",
        port: 3306,
        user: "root",
        password: "a1l9i7y8u",
        database: "mydb"
    }
});

module.exports = {
    store,
    client,
    students: store.collection('students'),
    colleges: store.collection('colleges'),
    exchanges: store.collection('exchanges'),
    offers: store.collection('offers'),
    users: store.collection('users'),
    mysql
};
