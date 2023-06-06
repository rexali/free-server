const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient()

module.exports = {

    /**
     * Authenticate user before authorization
     * 
     * @param {String} email 
     * @param {String} password 
     * @param {String} role 
     * @returns boolean
     */
    authenticate: async (email, password, role) => {
        const result = await prisma.user.findUnique({
            where: {
                email: email,
            }
        })

        if (result.password===password && result.role===role) {
            return true
        }

        return false
    },

}