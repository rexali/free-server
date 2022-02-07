const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient()

module.exports = {

    /**
     * read a addon datail from the addon table
     * 
     * @param {Int} id 
     * @returns  object of type addon
     */
    getOneAddon: async (id) => {
        const result = await prisma.addon.findUnique({
            where: {
                id: id,
            }
        })

        return result;
    },


    /**
     * read all addons from the addon table 
     * 
     * @returns array object of type addon
     */
    getManyAddons: async () => {
        const result = await prisma.addon.findMany();

        return result;
    },


    /**
     * insert a addon into the addon table
     * 
     * @param {object} addonData object of type addon
     * @returns addon
     */
    createOneAddon: async (addonData) => {
        const result = await prisma.addon.create({
            data: addonData
        })

        return result;
    },

    /**
     * insert many addons to addon table
     * 
     * @param {object[]} addons array of object of type addon
     * @returns a number of type Int
     */
    createManyAddons: async (addonData) => {
        const result = await prisma.addon.createMany({
            data: addonData,
        })

        return result.count;
    },

    /**
     * update a addon in the addon table
     * 
     * @param {object} addon object of type addon
     * @returns object of type addon
     */
    updateOneAddon: async (addon) => {
        const result = await prisma.addon.update({
            where:{
                id:addon.id,
            },
            data: addon,
        });

        return result
    },

    /**
     * delete a addon from addon table 
     * 
     * @param {Int} id id of type Int
     * @returns object of type addon
     */
    deleteOneAddon: async (id) => {
        const result = await prisma.addon.delete({
            where: {
                id: id
            }
        })

        return result;
    },

    
    populateAddon: async (data) => {
        const {
            title,
            charge,
            service_id
        } = data;
        const result = await prisma.addon.create({
            data: {
                title: title,
                charge: charge,
                service: {
                    connect: { id: service_id },
                },
            },
            include:{
                service:true,
            }
        });

        return result;
    }

}