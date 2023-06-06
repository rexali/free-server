const jsonwebtoken = require('jsonwebtoken');
const userModel = require('../models/userModel');
const { htmlEscape } = require('../utils/escapeHelper');
const { checkpass } = require('../utils/securityHelpers');
const { authorizeUser } = require('./authorizationController');

module.exports = {

    /**
     * authenticate user before authorization
     * 
     * @param {String} email 
     * @param {String} password 
     * @param {String} role 
     * @returns boolean
     */
    authenticateUser: async (email, password, role, req, res) => {

        const escEmail = htmlEscape(email);
        const escPassword = htmlEscape(password);
        const escRole = htmlEscape(role);

        const result = await userModel.getUserLoginDetail(escEmail);
        const token= authorizeUser(req,escEmail);
        if (token) {

            let decoded = jsonwebtoken.verify(token, process.env.SECRET_KEY);

            if (decoded.user_id && decoded.email == escEmail) {

                return token;

            }

        }

        if (checkpass(result.password, escPassword) && result.role === escRole) {
            const jwtSecret = process.env.SECRET_KEY; // 'asdfghijkl'
            const token = jsonwebtoken.sign({ user_id: result.id, role: result.role }, jwtSecret, { noTimestamp: true, expiresIn: '1h' });
            res.cookie('token', token, { httpOnly: true });
            // res.json({ token: token });
            return token;
        }

        return;
    },

}