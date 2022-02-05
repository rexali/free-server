const { DataStore } = require('notarealdb');
const { open } = require('sqlite');
const sqlite3 = require('sqlite3');
const knex = require("knex");

const mysql = require("./dbHelpers");
const store = new DataStore('../data');

async function openDb() {
  return open({
    filename: '/tmp/database.db',
    driver: sqlite3.Database
  })
}


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

const MOCK_DATA = [
  {
    first_name: 'Aliyu',
    last_name: 'Bello',
    password: '123456',
    phone: '08065899744',
    email: 'alybaba2006@gmail.com',
  },
  {
    first_name: 'Fanimoh',
    last_name: 'Bell',
    password: '123456',
    phone: '08065899444',
    email: 'alybaba2006@gmail.com',
  },
  {
    first_name: 'Jimoh',
    last_name: 'Onipe',
    password: '123456',
    phone: '08065899154',
    email: 'alybaba2007@gmail.com',
  }
]

const MOCK_DATA_SERVICE = [
  {
    title: "Mr",
    category: "Programming",
    subcategory: "Web programming",
    picture: "care.jpg",
    description: "Get your perfect website",
    charge: "1000",
    delivery_period: "4",
    search_tag: "programmming",
    hourly_rate: "40",
    user: "",
    user_id: "",
    addons: "",
    order: "",
    order_id: "",
  },
  {
    title: "Mr",
    category: "Programming",
    subcategory: "Web programming",
    picture: "care.jpg",
    description: "Get your perfect website",
    charge: "1000",
    delivery_period: "4 days",
    search_tag: "programmming",
    hourly_rate: "40",
    user: "",
    user_id: "",
    addons: "",
    order: "",
    order_id: "",
  },
  {
    title: "Mr",
    category: "Programming",
    subcategory: "Web programming",
    picture: "care.jpg",
    description: "Get your perfect website",
    charge: "1000",
    delivery_period: "4",
    search_tag: "programmming",
    hourly_rate: "40",
    user: "",
    user_id: "",
    addons: "",
    order: "",
    order_id: "",
  },
  {
    title: "Mr",
    category: "Programming",
    subcategory: "Web programming",
    picture: "care.jpg",
    description: "Get your perfect website",
    charge: "1000",
    delivery_period: "4 days",
    search_tag: "programmming",
    hourly_rate: "40",
    user: "",
    user_id: "",
    addons: "",
    order: "",
    order_id: "",
  },
  {
    title: "Mr",
    category: "Programming",
    subcategory: "Web programming",
    picture: "care.jpg",
    description: "Get your perfect website",
    charge: "1000",
    delivery_period: "4",
    search_tag: "programmming",
    hourly_rate: "40",
    user: "",
    user_id: "",
    addons: "",
    order: "",
    order_id: "",
  },
  {
    title: "Mr",
    category: "Programming",
    subcategory: "Web programming",
    picture: "care.jpg",
    description: "Get your perfect website",
    charge: "1000",
    delivery_period: "4 days",
    search_tag: "programmming",
    hourly_rate: "40",
    user: "",
    user_id: "",
    addons: "",
    order: "",
    order_id: "",
  },
  {
    title: "Mr",
    category: "Programming",
    subcategory: "Web programming",
    picture: "care.jpg",
    description: "Get your perfect website",
    charge: "1000",
    delivery_period: "4",
    search_tag: "programmming",
    hourly_rate: "40",
    user: "",
    user_id: "",
    addons: "",
    order: "",
    order_id: "",
  },
  {
    title: "Mr",
    category: "Programming",
    subcategory: "Web programming",
    picture: "care.jpg",
    description: "Get your perfect website",
    charge: "1000",
    delivery_period: "4 days",
    search_tag: "programmming",
    hourly_rate: "40",
    user: "",
    user_id: "",
    addons: "",
    order: "",
    order_id: "",
  },
]

module.exports = {
  MOCK_DATA
}


module.exports = {
  store,
  client,
  students: store.collection('students'),
  colleges: store.collection('colleges'),
  exchanges: store.collection('exchanges'),
  offers: store.collection('offers'),
  users: store.collection('users'),
  mysql,
  openDb,
  MOCK_DATA,
  MOCK_DATA_SERVICE,
};
