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
    authenticate: async (email, password, role) => {
        const user = await prisma.user.findUnique({
            where: {
                email: email,
            }
        })

        if (user.password===password && user.role===role) {
            return true
        }

        return false
    },

}