const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient()

module.exports = {

    /**
     * authenticate user before authorization
     * 
     * @param {String} email 
     * @param {String} password 
     * @param {String} role 
     * @returns boolean
     */
    authenticateUser: async (email, password, role) => {
        
        if (user.password===password && user.role===role) {
            return true
        }

        return false
    },

}