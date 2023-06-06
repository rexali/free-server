const { verify } = require("jsonwebtoken");
const userModel = require("../models/userModel");

module.exports = {

    authorizeUser:  async(req,escEmail) => {
        // get the token token from the headers
        const token = req.headers.authorization || '';
        // we could also check token roles/permissions here
        if (!token) throw new Error('you must be logged in');

        const result = await userModel.getUserLoginDetail(escEmail);

        let decoded = verify(token, process.env.SECRET_KEY);

        if (decoded.user_id && decoded.role == result.role) {

            return token;

        }
        // add the token to the context
        return;
    },

}

