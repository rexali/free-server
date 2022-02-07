const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient()

module.exports = {

    /**
     * Read a experience datail from the experience table
     * 
     * @param {Int} id 
     * @returns  object of type experience
     */
    getOneExperience: async (id) => {
        const result = await prisma.experience.findUnique({
            where: {
                id: id,
            }
        })

        return result;
    },


    /**
     * Read all Experiences from the experience table 
     * 
     * @returns array object of type experience
     */
    getManyExperiences: async () => {
        const result = await prisma.experience.findMany();

        return result;
    },


    /**
     * insert a experience into the experience table
     * 
     * @param {object} ExperienceData object of type experience
     * @returns experience
     */
    createOneExperience: async (ExperienceData) => {
        const result = await prisma.experience.create({
            data: ExperienceData
        })

        return result;
    },

    /**
     * insert many Experiences to experience table
     * 
     * @param {object[]} Experiences array of object of type experience
     * @returns a number of type Int
     */
    createManyExperiences: async (ExperienceData) => {
        const result = await prisma.experience.createMany({
            data: ExperienceData,
        })

        return result.count;
    },

    /**
     * Update a experience in the experience table
     * 
     * @param {object} experience object of type experience
     * @returns object of type experience
     */
    updateOneExperience: async (experience) => {
        const result = await prisma.experience.update({
            where:{
                id:experience.id,
            },
            data: experience,
        });

        return result
    },

    /**
     * Delete a experience from experience table 
     * 
     * @param {Int} id id of type Int
     * @returns object of type experience
     */
    deleteOneExperience: async (id) => {
        const result = await prisma.experience.delete({
            where: {
                id: id
            }
        })

        return result;
    },

}
