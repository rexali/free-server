const { PrismaClient } = require('@prisma/client');
const client = new PrismaClient();

module.exports = {

    /**
     * Read transactions from the database table transaction
     * 
     * @returns result of array object of transactions
     */
    readTransaction: async () => {
        const result = await client.transaction.findMany();

        return result;
    },

    /**
     * Delete transaction from database table transaction
     * 
     * @param {Int} id id of the transaction
     * @returns transaction
     */
    deleteTransaction: async (id) => {
        const result = await client.transaction.delete({
            where: {
                id: id
            }
        })

        return result;
    },

    /**
     * Update a given transaction in the table
     * 
     * @param {object} obj represent the object transaction
     * @returns transaction object
     */
    updateTransaction: async (obj) => {
        const result = await client.transaction.update({
            where: {
                id: obj.id
            },
            data: obj,
        });

        return result
    },

    /**
     * Enter transaction to the database transaction table
     * 
     * @param {object} transaction transaction object
     * @returns result
     */
    createTransaction: async (transaction) => {
        const result = await client.transaction.create({
            data: transaction
        })

        return result
    }
}