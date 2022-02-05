var mysql = require("mysql");
const dotenv = require('dotenv');
dotenv.config();
/**
 * create connection to the database
 * @param con is mysql connection using:
 * @param host hostname
 * @param user username
 * @param password password
 * @param database database name
 * @returns con object
 */
function connectDb() {
  var con = mysql.createConnection({
    host: "localhost",
    port:"3306",
    user: "root",
    password: process.env.PASSWORD,
    database: "mydb"
  });

  // var con = mysql.createConnection({
  //   host: "localhost",
  //   port:"3306",
  //   user: "mujaware_mujaware",
  //   password: "m)B14eKr8c&2Qi1^",
  //   database: "mujaware_kanimart"
  // });

  con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
  });

  return con;
}
// connectedDb();

/**
 * create database by passing the database name
 * @param {String} dbname : database name;
 */
function createDb(dbname) {
  connectDb().query("CREATE DATABASE " + dbname, function (err, result) {
    if (err) throw err;
    console.log("Database created: "+dbname);
  });
}
// createDb();

/**
 * create table by passing query and the table name
 * @param {String} sql : sql query
 * @param {String} name : name of the table to be created
 */
function createTable(sql, name, res) {
  connectDb().query(sql, function (err, result) {
    if (err) throw err;
    console.log(name + " table created");
    res.set('Content-Type', 'application/json');
    res.send('{"result":' + name + ' table created}');
  });
}
// createTable("CREATE TABLE users (name VARCHAR(255), address VARCHAR(255))", "users");

/**
 * create insert or insert data into the database
 * @param {String} data: data to be return
 * @param {String} sql : query string
 * @param {String[]} esc  parameters to be escaped in query string
 * @returns data object
 */
function create(sql, esc, res) {
  connectDb().query(sql, esc, function (err, result, fields) {
    if (err) throw err;
    console.log("Record inserted");
    res.json(result);
  });
}

/**
 * read data from a given table
 * @param {String} data  the query result to be return 
 * @param {String} sql  sql query string
 * @param {String[]} esc  parameters to be escaped in query string
 * @returns data object
 */
function read(sql, esc, res) {
  connectDb().query(sql, esc, function (err, result, fields) {
    if (err) throw err;
    console.log("Record read");
    res.json(result);
  });
}

/**
 * read data from a given table
 * @param {String} data  the query result to be return 
 * @param {String} sql  sql query string
 * @returns data object
 */
 function readAll(sql, res) {
   let promise= new Promise((resolve,reject)=>{
    connectDb().query(sql, function (err, result, fields) {
      if (err) throw err;
      console.log("All record read");
      resolve(result)
    });
   })
   return promise;
}

function readAuthToken(sql, esc, res) {
  connectDb().query(sql, esc, function (err, result, fields) {
    if (err) throw err;
    console.log("Auth record read");
    const jwtSecret = process.env.SECRET_KEY; // 'asdfghijkl'
    const token = '' //jsonwebtoken.sign({result},jwtSecret,{noTimestamp:true, expiresIn:'1h'});
    res.cookie('token',token,{httpOnly:true});
    res.json({token:token});
  });
}

function readPassword(sql, esc, func, pass, res, userId, tableName) {
  connectDb().query(sql, esc, function (err, result, fields) {
    if (err) throw err;
    console.log("Record read");
    func(result[0].password, pass, esc, res,userId, tableName);
  });
}

function checkMail(sql, esc) {
  let promise = new Promise((resolve,reject)=>{
    connectDb().query(sql, esc, function (err, result, fields) {
      if (err) {
      console.log("Record read");
        reject('Error!')
        throw err;
      }
      console.log("Record read");
      if (result.length === 1) {
        console.log(result)
        resolve(true);
      } else{
        resolve(false);
      }
    });       
  });
  return promise;
}

/**
 * remove data from a given table in the query
 * @param {String} data the query result to be return
 * @param {String} sql sql query string
 * @param {String[]} esc  parameters to be escaped in query string
 * @returns data object
 */
function remove(sql, esc, res) {
  connectDb().query(sql, esc, function (err, result) {
    if (err) throw err;
      console.log("Record removed --");
      res.json(result);
  });
}

/**
 * update data of a given table
 * @param {String} data the query result to be return
 * @param {String} sql sql query string 
 * @param {String[]} esc  parameters to be escaped in query string
 * @returns data object
 */
function update(sql, esc, res) {
  connectDb().query(sql, esc, function (err, result) {
    if (err) throw err;
    console.log("Record update");
    res.set('Content-Type', 'application/json');
    res.json(result);
  });
}

/**
 * update data of a given table
 * @param {String} result the query result to be return
 * @param {String} sql sql query string 
 * @param {String[]} esc  parameters to be escaped in query string
 * @returns data object
 */
function updateCode(sql, esc) {
  let promise = new Promise((resolve,reject)=>{
    connectDb().query(sql, esc, function (err, result) {
      if (err) {
        reject('Error!');
        throw err;
      }
      if (result.affectedRows >= 1 && result.warningCount === 0) {
        console.log("Record update");
      resolve(true);
      } else {
      resolve(false);
      }
    });
  });
  return promise
}

let tableSQL = {
  users: function users() {
    return `CREATE TABLE users (
    user_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(225) NOT NULL,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    picture VARCHAR(100),
    phone VARCHAR(50),
    address VARCHAR(50),
    date_of_birth VARCHAR(50),
    loc_govt VARCHAR(50),
    state VARCHAR(50),
    country VARCHAR(50)
    )`
  },
  vendors: function vendors() {
    return `CREATE TABLE vendors(
    vendor_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(225) NOT NULL,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    picture VARCHAR(100),
    date_of_birth VARCHAR(50),
    phone VARCHAR(50),
    nin VARCHAR(50),
    address VARCHAR(50),
    document VARCHAR(100),
    loc_govt VARCHAR(50),
    state VARCHAR(50),
    country VARCHAR(50)
    )`
  },
  shippers: function shippers() {
    return `
  CREATE TABLE shippers(
    shipper_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(225) NOT NULL,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    picture VARCHAR(100),
    date_of_birth VARCHAR(50),
    phone VARCHAR(50),
    nin VARCHAR(50),
    address VARCHAR(50),
    document VARCHAR(100),
    loc_govt VARCHAR(50),
    state VARCHAR(50),
    country VARCHAR(50)
    )`
  },

  admins: function admins() {
    return `
  CREATE TABLE admins (
    admin_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(225) NOT NULL,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    picture VARCHAR(100),
    date_of_birth VARCHAR(50),
    phone VARCHAR(50),
    salary INT,
    role VARCHAR(50),
    department VARCHAR(50),
    document VARCHAR(100),
    nin VARCHAR(20),
    address VARCHAR(200),
    loc_govt VARCHAR(50),
    state VARCHAR(50),
    country VARCHAR(50),
    next_of_kin_name VARCHAR(50),
    next_of_kin_phone VARCHAR(50)
    )`
  },
  products: function products() {
    return `
  CREATE TABLE products(
    product_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    vendor_id INT,
    product_name VARCHAR(100),
    product_picture VARCHAR(225),
    product_video VARCHAR(100),
    product_category VARCHAR(50),
    product_sub_category VARCHAR(50),
    product_feature TEXT,
    product_description TEXT,
    product_package VARCHAR(100),
    product_colour VARCHAR(100),
    product_model VARCHAR(190),
    product_quantity VARCHAR(100),
    product_size VARCHAR(50),
    product_weight VARCHAR(50),
    product_price varchar(50),
    product_shipping VARCHAR(50),
    product_warranty VARCHAR(200),
    product_return TEXT,
    product_seller VARCHAR(50),
    product_phone VARCHAR(50),
    product_email VARCHAR(50),
    product_review VARCHAR(225),
    product_code INT,
    product_approval VARCHAR(10),
    FOREIGN KEY (vendor_id) REFERENCES vendors(vendor_id)
    )`
  },
  orders: function orders() {
    return `CREATE TABLE orders(
  order_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  vendor_id varchar(200),
  product_id varchar(200),
  user_id INT,
  order_no INT,
  price varchar(200),
  quantity varchar(200),
  total INT,
  status varchar(10),
  date TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(user_id)
  )`
  },

  shippings: function shippings() {
    return `CREATE TABLE shippings(
    shipping_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    shipper_id INT,
    shipping_name VARCHAR(50),
    shipping_mean VARCHAR(50),
    shipping_picture VARCHAR(100),
    shipping_description TEXT
    FOREIGN KEY (shipper_id) REFERENCES shippers(shipper_id)
    )`
  },

  shippingfees: function shippingfees() {
    return `CREATE TABLE shippingfees (
    shippingfee_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    shipper_id INT,
    shipping_location VARCHAR(50),
    shipping_destination VARCHAR(50),
    shipping_fee INT,
    FOREIGN KEY (shipper_id) REFERENCES shippers(shipper_id)
    )`
  },
  
  favourites: function favourites() {
    // Attempt create table query execution
    return $sql = `CREATE TABLE favourites(
    favourite_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    vendor_id INT,
    product_id INT,
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (vendor_id) REFERENCES vendors(vendor_id),
    FOREIGN KEY (product_id) REFERENCES products(product_id)
    )`;
  },

  carts: function carts() {

    return $sql = `CREATE TABLE carts(
    cart_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    vendor_id INT,
    product_id INT,
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (vendor_id) REFERENCES vendors(vendor_id),
    FOREIGN KEY (product_id) REFERENCES products(product_id)
    )`
  },


  messages: function messages() {
    return $sql = `CREATE TABLE messages(
    message_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    name varchar(200),
    subject varchar(200),
    email varchar(50),
    message TEXT,
    date TIMESTAMP
    )`;
  },

  notifications: function notifications() {
    return $sql = `CREATE TABLE notifications(
    notification_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    subject varchar(200),
    email varchar(50),
    message TEXT,
    date TIMESTAMP
    )`;
  },

  chats: function chats() {
    return $sql = `CREATE TABLE chats(
    chat_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    vendor_id INT,
    admin_id INT,
    message TEXT,
    date TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (vendor_id) REFERENCES vendors(vendor_id)
    )`
  },

  feedbacks: function feedbacks() {

    return $sql = `CREATE TABLE feedbacks(
    feedback_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    vendor_id INT,
    admin_id INT,
    product_id INT,
    message TEXT,
    date TIMESTAMP,
    rating INT,
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (vendor_id) REFERENCES vendors(vendor_id),
    FOREIGN KEY (product_id) REFERENCES products(product_id)
    )`
  },

  reviews: function reviews() {
    return $sql = `CREATE TABLE reviews(
    review_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    vendor_id INT,
    product_id INT,
    message TEXT,
    rating INT,
    date TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (product_id) REFERENCES products(product_id)
    )`;
  }


};

module.exports = { 
  createDb,
  create, 
  read, 
  remove, 
  update, 
  createTable, 
  readAll, 
  checkMail, 
  updateCode, 
  readPassword,
  readAuthToken, 
  tableSQL 
};