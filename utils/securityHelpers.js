var bcrypt = require("bcrypt");

const SALT_FACTOR = 10;

function hashpass(userPassword) {
    let salt = bcrypt.genSaltSync(SALT_FACTOR);
    let hash = bcrypt.hashSync(userPassword, salt);
    return hash; // store return hash in DB
}

function checkpass(DBpassword, userPassword) {
    return bcrypt.compareSync(userPassword, DBpassword); // return boolean
}

module.exports = { 
    hashpass,
    checkpass
};