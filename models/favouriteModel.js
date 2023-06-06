const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient()

module.exports = {

    /**
     * read a favourite datail from the favourite table
     * 
     * @param {Int} id 
     * @returns  object of type favourite
     */
    getOneFavourite: async (id) => {
        const result = await prisma.favourite.findUnique({
            where: {
                id: id,
            }
        })

        return result;
    },


    /**
     * read all favourites from the favourite table 
     * 
     * @returns array object of type favourite
     */
    getManyFavourites: async () => {
        const result = await prisma.favourite.findMany();

        return result;
    },


    /**
     * insert a favourite into the favourite table
     * 
     * @param {object} favourite object of type favourite
     * @returns favourite
     */
    createOneFavourite: async (favourite) => {
        const result = await prisma.favourite.create({
            data: favourite
        })

        return result;
    },

    /**
     * insert many favourites to favourite table
     * 
     * @param {object[]} favourites array of object of type favourite
     * @returns number of type Int
     */
    createManyFavourites: async (favouriteData) => {
        const result = await prisma.favourite.createMany({
            data: favouriteData,
        })

        return result.count;
    },

    /**
     * update a favourite in the favourite table
     * 
     * @param {object} favourite object of type favourite
     * @returns object of type favourite
     */
    updateOneFavourite: async (favourite) => {
        const result = await prisma.favourite.update({
            data: favourite,
        });

        return result
    },

    /**
     * delete a favourite from favourite table 
     * 
     * @param {Int} id id of type Int
     * @returns object of type favourite
     */
    deleteOneFavourite: async (id) => {
        const result = await prisma.favourite.delete({
            where: {
                id: id
            }
        })

        return result;
    }

}