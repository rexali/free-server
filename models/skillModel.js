const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient()

module.exports = {

    /**
     * read a skill datail from the skill table
     * 
     * @param {Int} id 
     * @returns  object of type skill
     */
    getOneSkill: async (id) => {
        const result = await prisma.skill.findUnique({
            where: {
                id: id,
            }
        })

        return result;
    },


    /**
     * read all skills from the skill table 
     * 
     * @returns array object of type skill
     */
    getManySkills: async () => {
        const result = await prisma.skill.findMany();

        return result;
    },


    /**
     * insert a skill into the skill table
     * 
     * @param {object} skillData object of type skill
     * @returns skill
     */
    createOneskill: async (skillData) => {
        const result = await prisma.skill.create({
            data: skillData
        })

        return result;
    },

    /**
     * insert many skills to skill table
     * 
     * @param {object[]} skills array of object of type skill
     * @returns a number of type Int
     */
    createManySkills: async (skillData) => {
        const result = await prisma.skill.createMany({
            data: skillData,
        })

        return result.count;
    },

    /**
     * update a skill in the skill table
     * 
     * @param {object} skill object of type skill
     * @returns object of type skill
     */
    updateOneSkill: async (skill) => {
        const result = await prisma.skill.update({
            where:{
                id:skill.id,
            },
            data: skill,
        });

        return result
    },

    /**
     * delete a skill from skill table 
     * 
     * @param {Int} id id of type Int
     * @returns object of type skill
     */
    deleteOneSkill: async (id) => {
        const result = await prisma.skill.delete({
            where: {
                id: id
            }
        })

        return result;
    },

    
    populateSkill: async (data) => {
        const {
            name,
            year_exp, 
            user_id,
        } = data
        const result = await prisma.skill.create({
            data: {
                name: name,
                year_exp: year_exp,
                user: {
                    connect: [{ id: user_id }]
                },
            },
            include:{
                user:true,
            }
        });

        return result
    }

}