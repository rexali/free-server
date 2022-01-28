const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient()

module.exports = {

    /**
     * read a cart datail from the cart table
     * 
     * @param {Int} id 
     * @returns  object of type cart
     */
    getOneCart: async (id) => {
        const cart = await prisma.cart.findUnique({
            where: {
                id: id,
            }
        })

        return cart;
    },


    /**
     * read all carts from the cart table 
     * 
     * @returns array object of type cart
     */
    getManyCarts: async () => {
        const carts = await prisma.cart.findMany();

        return carts;
    },


    /**
     * insert a cart into the cart table
     * 
     * @param {object} cart object of type cart
     * @returns cart
     */
    createOneCart: async (cart) => {
        const newcart = await prisma.cart.create({
            data: cart
        })

        return newcart;
    },

    /**
     * insert many carts to cart table
     * 
     * @param {object[]} carts array of object of type cart
     * @returns number of type Int
     */
    createManyCarts: async (carts) => {
        const mock_data = await prisma.cart.createMany({
            data: carts,
        })

        return mock_data.count;
    },

    /**
     * update a cart in the cart table
     * 
     * @param {object} cart object of type cart
     * @returns object of type cart
     */
    updateOneCart: async (cart) => {
        const result = await prisma.cart.update({
            data: cart,
        });

        return result
    },

    /**
     * delete a cart from cart table 
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