const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient()

module.exports = {

    /**
     * Read a certification datail from the certification table
     * 
     * @param {Int} id cerification id
     * @returns  object of type certification
     */
    getOneCertification: async (id) => {
        const result = await prisma.certification.findUnique({
            where: {
                id: id,
            }
        })

        return result;
    },


    /**
     * Read all certifications from the certification table 
     * 
     * @returns array object of type certification
     */
    getManyCertifications: async () => {
        const result = await prisma.certification.findMany();

        return result;
    },


    /**
     * Insert a certification into the certification table
     * 
     * @param {object} certificationData object of type certification
     * @returns certification
     */
    createOneCertification: async (certificationData) => {
        const result = await prisma.certification.create({
            data: certificationData
        })

        return result;
    },

    /**
     * Insert many certifications to certification table
     * 
     * @param {object[]} certifications array of object of type certification
     * @returns a number of type Int
     */
    createManyCertifications: async (certificationData) => {
        const result = await prisma.certification.createMany({
            data: certificationData,
        })

        return result.count;
    },

    /**
     * Update a certification in the certification table
     * 
     * @param {object} certification object of type certification
     * @returns object of type certification
     */
    updateOneCertification: async (certification) => {
        const result = await prisma.certification.update({
            where:{
                id:certification.id,
            },
            data: certification,
        });

        return result
    },

    /**
     * Delete a certification from certification table 
     * 
     * @param {Int} id id of type Int
     * @returns object of type certification
     */
    deleteOneCertification: async (id) => {
        const result = await prisma.certification.delete({
            where: {
                id: id
            }
        })

        return result;
    }

}