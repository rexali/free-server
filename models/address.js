const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient()

module.exports = {

    /**
     * read a address datail from the address table
     * 
     * @param {Int} id 
     * @returns  object of type address
     */
    getOneAddress: async (id) => {
        const result = await prisma.address.findUnique({
            where: {
                id: id,
            }
        })

        return result;
    },


    /**
     * read all addresss from the address table 
     * 
     * @returns array object of type address
     */
    getManyAddresss: async () => {
        const result = await prisma.address.findMany();

        return result;
    },


    /**
     * insert a address into the address table
     * 
     * @param {object} addressData object of type address
     * @returns address
     */
    createOneAddress: async (addressData) => {
        const result = await prisma.address.create({
            data: addressData
        })

        return result;
    },

    /**
     * insert many addresss to address table
     * 
     * @param {object[]} addresss array of object of type address
     * @returns a number of type Int
     */
    createManyAddresss: async (addressData) => {
        const result = await prisma.address.createMany({
            data: addressData,
        })

        return result.count;
    },

    /**
     * update a address in the address table
     * 
     * @param {object} address object of type address
     * @returns object of type address
     */
    updateOneAddress: async (address) => {
        const result = await prisma.address.update({
            where:{
                id:address.id,
            },
            data: address,
        });

        return result
    },

    /**
     * delete a address from address table 
     * 
     * @param {Int} id id of type Int
     * @returns object of type address
     */
    deleteOneAddress: async (id) => {
        const result = await prisma.address.delete({
            where: {
                id: id
            }
        })

        return result;
    },

}
