const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient()

module.exports = {

    /**
     * read a education datail from the education table
     * 
     * @param {Int} id 
     * @returns  object of type education
     */
    getOneEducation: async (id) => {
        const result = await prisma.education.findUnique({
            where: {
                id: id,
            }
        })

        return result;
    },


    /**
     * read all Educations from the education table 
     * 
     * @returns array object of type education
     */
    getManyEducations: async () => {
        const result = await prisma.education.findMany();

        return result;
    },


    /**
     * insert a education into the education table
     * 
     * @param {object} EducationData object of type education
     * @returns education
     */
    createOneEducation: async (EducationData) => {
        const result = await prisma.education.create({
            data: EducationData
        })

        return result;
    },

    /**
     * insert many Educations to education table
     * 
     * @param {object[]} Educations array of object of type education
     * @returns a number of type Int
     */
    createManyEducations: async (EducationData) => {
        const result = await prisma.education.createMany({
            data: EducationData,
        })

        return result.count;
    },

    /**
     * update a education in the education table
     * 
     * @param {object} education object of type education
     * @returns object of type education
     */
    updateOneEducation: async (education) => {
        const result = await prisma.education.update({
            where: {
                id: education.id,
            },
            data: education,
        });

        return result
    },

    /**
     * delete a education from education table 
     * 
     * @param {Int} id id of type Int
     * @returns object of type education
     */
    deleteOneEducation: async (id) => {
        const result = await prisma.education.delete({
            where: {
                id: id
            }
        })

        return result;
    },

    populateEducation: (data) => {
        const {
            institution,
            course,
            description,
            started_at,
            ended_at
        } = data
    }

}