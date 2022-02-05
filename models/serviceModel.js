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
        const service = await prisma.service.findUnique({
            where: {
                id: id,
            }
        })

        return service;
    },


    /**
     * read all services from the service table 
     * 
     * @returns array object of type service
     */
    getManyServices: async () => {
        const services = await prisma.service.findMany();

        return services;
    },


    /**
     * insert a service into the service table
     * 
     * @param {object} service object of type service
     * @returns service
     */
    createOneService: async (service) => {
        const newservice = await prisma.service.create({
            data: service
        })

        return newservice;
    },

    /**
     * insert many services to service table
     * 
     * @param {object[]} services array of object of type service
     * @returns number of type Int
     */
    createManyServices: async (services) => {
        const mock_data = await prisma.service.createMany({
            data: services,
        })

        return mock_data.count;
    },


    populateServices:async(service)=>{
       const services_data = await prisma.service.createMany({
           data:service
       })
    },

    /**
     * update a service in the service table
     * 
     * @param {object} service object of type service
     * @returns object of type service
     */
    updateOneService: async (service) => {
        const result = await prisma.service.update({
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
        const service = await prisma.service.findUnique({
            where: {
                id: id,
            },
            include: {
                addons: true
            }
        })

        return service;
    },

    /**
     * Get all services and their added services
     * 
     * @returns an object of service
     */
    getAllServicesAndAddons: async () => {
        const service = await prisma.service.findMany({
            include: {
                addons: true
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
        const serviceCategories = await prisma.service.findMany({
            select: {
                category: true
            },
            distinct: ["category"],
            orderBy: {
                category: 'asc'
            }

        })
        return serviceCategories;
    },

    /**
     * Get all the categories of services
     * 
     * @returns an array of strings containing sub-categories
     */
    getServiceSubcategories: async () => {
        const serviceCategories = await prisma.service.findMany({
            select: {
                subcategory: true,
            },
            distinct: ["subcategory"],
            orderBy: {
                category: 'asc'
            },
        })

        return serviceSubcategories;
    },


    /**
     * Search a term on title field of the service table
     * 
     * @param {String} term 
     * @returns an array of objects of service
     */
    search_a_given_term: async (term) => {
        const searchResult = await prisma.service.findMany({
            where: {
                title: {
                    contains: term
                }
            }
        })
        return searchResult
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

        const filterResult = await prisma.service.findMany(data);

        return filterResult;
    },

    /**
     * Get the first six of the service on the first page
     * 
     * @returns an array of objects of service
     */
    getFirstPageOfServices: async () => {
        const services = await prisma.service.findMany({
            take: 6,
        })

        return services;
    },

    /**
     * Get the next six of the services on the next page
     * 
     * @returns an array of objects of service
     */
    getNextPageOfServices: async (cursorPos) => {
        // const lastServiceInResults = await this.getFirstPageOfServices()[5];
        // const cursorPostion = lastServiceInResults.id;
        const services = await prisma.service.findMany({
            take: 6,
            skip: 1, // skip the cursor
            cursor: {
                id: cursorPos,
            }
        })

        return services;
    },

    getPreviousPageOfServices: async(cursorPos) =>{

        const services = await prisma.service.findMany({
            take: -6,
            skip: 1,
            cursor: {
                id: cursorPos,
            }
        })

        return services;
}

}