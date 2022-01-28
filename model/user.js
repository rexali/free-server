const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient()

module.exports = {

    /**
     * Read a user datail from the user table
     * 
     * @param {Int} id an id of a given user
     * @returns  object of type User
     */
    getOneUser: async (id) => {
        try {
            const result = await prisma.user.findUnique({
                where: {
                    id: id,
                }
            })

            return result;
        } catch (error) {
            console.log(error)
        } finally {
            prisma.$disconnect()
        }
      return;
    },

    /**
     * Read all users from the user table 
     * 
     * @returns array object of type User
     */
    getManyUsers: async () => {

        try {
            const result = await prisma.user.findMany();

            return result;

        } catch (error) {
            console.log(error)
        } finally {
            prisma.$disconnect()
        }
    },

    /**
     * Insert a user into the user table
     * 
     * @param {object} user object of type User
     * @returns User
     */
    createOneUser: async (user) => {
        try {
            const result = await prisma.user.create({
                data: user
            })

            return result;

        } catch (error) {
            console.log(error)
        } finally {
            prisma.$disconnect()
        }

        return;
    },

    /**
     * Insert many users to user table
     * 
     * @param {object[]} users array of object of type User
     * @returns number of type Int
     */
    createManyUsers: async (users) => {
        try {
            const result = await prisma.user.createMany({
                data: users,
            })

            return result;
        } catch (error) {
            prisma.$disconnect()

        } finally {
            prisma.$disconnect()

        }

        return;
    },

    /**
     * Update a user in the user table
     * 
     * @param {object} user object of type User
     * @returns object of type User
     */
    updateOneUser: async (user) => {
        try {
            const result = await prisma.user.update({
                where: {
                    id: user.id
                },
                data: user,
            });

            return result;
        } catch (error) {
            console.log(error);
        } finally {
            prisma.$disconnect()

        }

        return;
    },

    /**
     * Delete a user from user table 
     * 
     * @param {Int} id id of type Int
     * @returns object of type User
     */
    deleteOneUser: async (id) => {
        try {
            const result = await prisma.user.delete({
                where: {
                    id: id
                }
            })

            return result;

        } catch (error) {
            console.log(error);
        } finally {
            prisma.$disconnect();
        }

        return;
    }

}