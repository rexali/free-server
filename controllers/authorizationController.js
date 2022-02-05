module.exports = {

    authorizeUser: async (req) => {
        // get the token token from the headers
        const token = req.headers.authorization || '';
        // we could also check token roles/permissions here
        if (!token) throw new Error('you must be logged in');
        // add the token to the context
        return token;
    },
    
}

