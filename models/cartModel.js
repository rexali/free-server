const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient()

module.exports = {

    /**
     * Read a cart datail from the cart table
     * 
     * @param {Int} id 
     * @returns  object of type cart
     */
    getOneCart: async (id) => {
        const result = await prisma.cart.findUnique({
            where: {
                id: id,
            }
        })

        return result;
    },


    /**
     * Read all carts from the cart table 
     * 
     * @returns array object of type cart
     */
    getManyCarts: async () => {
        const result = await prisma.cart.findMany();

        return result;
    },


    /**
     * Insert a cart into the cart table
     * 
     * @param {object} cartData object of type cart
     * @returns cart
     */
    createOneCart: async (cartData) => {
        const result = await prisma.cart.create({
            data: cartData
        })

        return result;
    },

    /**
     * Insert many carts to cart table
     * 
     * @param {object[]} carts array of object of type cart
     * @returns a number of type Int
     */
    createManyCarts: async (cartData) => {
        const result = await prisma.cart.createMany({
            data: cartData,
        })

        return result.count;
    },

    /**
     * Update a cart in the cart table
     * 
     * @param {object} cart object of type cart
     * @returns object of type cart
     */
    updateOneCart: async (cart) => {
        const result = await prisma.cart.update({
            where:{
                id:cart.id,
            },
            data: cart,
        });

        return result
    },

    /**
     * Delete a cart from cart table 
     * 
     * @param {Int} id id of type Int
     * @returns object of type cart
     */
    deleteOneCart: async (id) => {
        const result = await prisma.cart.delete({
            where: {
                id: id
            }
        })

        return result;
    }

}