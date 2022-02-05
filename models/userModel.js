const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient()

module.exports = {

    /**
     * Get a user detail that match a given email
     * 
     * @param {object} parent 
     * @param {object} data user login detail from client
     * @returns userDetail of user object
     */
    getUserLoginDetail: async (parent, { data }) => {
        try {
            const userLoginDetail = await prisma.user.findUnique({
                where: {
                    email: data.email,
                },
                select: {
                    id: true,
                    role: true,
                    password: true,
                    email: true
                },
    
            });
    
            return userLoginDetail;

        } catch (error) {
            console.warn(error);
        }finally{
            async () => {
                await prisma.$disconnect();
            } 
        }

        return;
    },
       

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
            async () => {
                await prisma.$disconnect();
            }
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
            async () => {
                await prisma.$disconnect();
            }
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
            async () => {
                await prisma.$disconnect();
            }
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
           console.warn(error);

        } finally {
            async () => {
                await prisma.$disconnect();
            }

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
            async () => {
                await prisma.$disconnect();
            }

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
            async () => {
                await prisma.$disconnect();
            }
        }

        return;
    },


    populateServices2: async (data) => {
        await prisma.user.create({
            data: {
                services:{
                    create:{
                        title:"Mr",
                    }
                }
                
            },
        })

    },

}