const { createOneUser } = require("../models/userModel");
const { hashpass } = require("../utils/securityHelpers");

function registerUser(data={}) {

    const email = htmlEscape(data.email);
    const hashPassword =hashpass(htmlEscape(data.password));
    const role = htmlEscape(data.role);

    const treatedData = {
        email:email,
        password:hashPassword,
        role:role
    }

    const result = createOneUser(treatedData)

    if (result) {

        return true;
    }

    return false;

}

module.exports= {registerUser}