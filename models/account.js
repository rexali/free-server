const { PrismaClient } = require('@prisma/client');
const client = new PrismaClient();

module.exports = {

    /**
     * Read accounts from the database table account
     * 
     * @returns result of array object of accounts
     */
    readAccount: async () => {
        const result = await client.account.findMany();

        return result;
    },

    /**
     * Delete account from database table account
     * 
     * @param {Int} id id of the account
     * @returns account
     */
    deleteAccount: async (id) => {
        const result = await client.account.delete({
            where: {
                id: id
            }
        })

        return result;
    },

    /**
     * Update a given account in the table
     * 
     * @param {object} obj represent the object account
     * @returns account object
     */
    updateAccount: async (obj) => {
        const result = await client.account.update({
            where: {
                id: obj.id
            },
            data: obj,
        });

        return result
    },

    /**
     * Enter account to the database account table
     * 
     * @param {object} account account object
     * @returns result
     */
    createAccount: async (account) => {
        const result = await client.account.create({
            data: account
        })

        return result
    }
}