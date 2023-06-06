const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient()

module.exports = {

    /**
     * read a service datail from the service table
     * 
     * @param {Int} id 
     * @returns  object of type service
     */
    getOneService: async (id) => {
        const result = await prisma.service.findUnique({
            where: {
                id: id,
            }
        })

        return result;
    },


    /**
     * read all services from the service table 
     * 
     * @returns array object of type service
     */
    getManyServices: async () => {
        const result = await prisma.service.findMany({
            include:{
                addons:true,
                user: {
                    include:{
                        addresses: true,
                    }
                }
            }
        });
        
        return result;
    },


    /**
     * insert a service into the service table
     * 
     * @param {object} service object of type service
     * @returns service
     */
    createOneService: async (service) => {
        const result = await prisma.service.create({
            data: service
        })

        return result;
    },

    /**
     * insert many services to service table
     * 
     * @param {object[]} services array of object of type service
     * @returns number of type Int
     */
    createManyServices: async (services) => {
        const result = await prisma.service.createMany({
            data: services,
        })

        return result.count;
    },


    /**
     * update a service in the service table
     * 
     * @param {object} service object of type service
     * @returns object of type service
     */
    updateOneService: async (service) => {
        const result = await prisma.service.update({
            where: {
                id: service.id
            },
            data: service,
        });

        return result
    },

    /**
     * delete a service from service table 
     * 
     * @param {Int} id id of type Int
     * @returns object of type service
     */
    deleteOneService: async (id) => {
        const result = await prisma.service.delete({
            where: {
                id: id
            }
        })

        return result;
    },

    /**
     * Get a service plus the added services
     * 
     * @param {Int} id an id of a given service
     * @returns an object of a service 
     */
    getOneServiceAndAddons: async (id) => {
        const result = await prisma.service.findUnique({
            where: {
                id: id,
            },
            include: {
                addons:true
            }
        })

        return result;
    },


    /**
     * Get all services and their added services
     *
     * @returns an object of service
     */
    getAllServicesAndAddons: async () => {
        const service = await prisma.service.findMany({
            include: {
                addons:true,
            }
        })

        return service
    },

    /**
     * Get all the categories of services
     * 
     * @returns an array of strings containing categories
     */
    getServiceCategories: async () => {
        const result = await prisma.service.findMany({
            select: {
                category: true
            },
            distinct: ["category"],
            orderBy: {
                category: 'asc'
            }

        })
        return result;
    },

    /**
     * Get all the categories of services
     * 
     * @returns an array of strings containing sub-categories
     */
    getServiceSubcategories: async () => {
        const result = await prisma.service.findMany({
            select: {
                subcategory: true,
            },
            distinct: ["subcategory"],
            orderBy: {
                category: 'asc'
            },
        })

        return result;
    },


    /**
     * Search a term on title field of the service table
     * 
     * @param {String} term 
     * @returns an array of objects of service
     */
    search_a_given_term: async (term) => {
        const result = await prisma.service.findMany({
            where: {
                title: {
                    contains: term
                }
            }
        })
        return result
    },

    /**
     * Filter the services based on a given terms or object
     * 
     * @param {object} terms an object containing name and price properties 
     * @returns an array of filtered services
     */
    filterServices: async (terms) => {
        let data;
        if (terms.price && terms.name) {

            data = {
                where: {
                    category: {
                        contains: terms.name
                    },
                    charge: {
                        equals: terms.price
                    }
                },
                orderBy: {
                    category: 'asc'
                }
            }

        } else if (terms.price && !terms.name) {

            data = {
                where: {
                    charge: {
                        equals: terms.price
                    }
                },
                orderBy: {
                    category: 'asc'
                }
            }

        } else if (!terms.price && terms.name) {

            data = {
                where: {
                    category: {
                        contains: terms.name
                    }
                },
                orderBy: {
                    category: 'asc'
                }
            }
        }

        const result = await prisma.service.findMany(data);

        return result;
    },

    /**
     * Get the first six of the service on the first page
     * 
     * @returns an array of objects of service
     */
    getFirstPageOfServices: async () => {
        const result = await prisma.service.findMany({
            take: 6,
        })

        return result;
    },

    /**
     * Get the next six of the services on the next page
     * 
     * @returns an array of objects of service
     */
    getNextPageOfServices: async (cursorPos) => {
        // const lastServiceInResults = await this.getFirstPageOfServices()[5];
        // const cursorPostion = lastServiceInResults.id;
        const result = await prisma.service.findMany({
            take: 6,
            skip: 1, // skip the cursor
            cursor: {
                id: cursorPos,
            }
        })

        return result;
    },

    getPreviousPageOfServices: async (cursorPos) => {

        const result = await prisma.service.findMany({
            take: -6,
            skip: 1,
            cursor: {
                id: cursorPos,
            }
        })

        return result;
    }

}