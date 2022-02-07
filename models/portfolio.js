const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient()

module.exports = {

    /**
     * Read a portfolio datail from the portfolio table
     * 
     * @param {Int} id 
     * @returns  object of type portfolio
     */
    getOnePortfolio: async (id) => {
        const result = await prisma.portfolio.findUnique({
            where: {
                id: id,
            }
        })

        return result;
    },


    /**
     * Read all Portfolios from the portfolio table 
     * 
     * @returns array object of type portfolio
     */
    getManyPortfolios: async () => {
        const result = await prisma.portfolio.findMany();

        return result;
    },


    /**
     * Insert a portfolio into the portfolio table
     * 
     * @param {object} PortfolioData object of type portfolio
     * @returns portfolio
     */
    createOnePortfolio: async (PortfolioData) => {
        const result = await prisma.portfolio.create({
            data: PortfolioData
        })

        return result;
    },

    /**
     * Insert many Portfolios to portfolio table
     * 
     * @param {object[]} Portfolios array of object of type portfolio
     * @returns a number of type Int
     */
    createManyPortfolios: async (PortfolioData) => {
        const result = await prisma.portfolio.createMany({
            data: PortfolioData,
        })

        return result.count;
    },

    /**
     * Update a portfolio in the portfolio table
     * 
     * @param {object} portfolio object of type portfolio
     * @returns object of type portfolio
     */
    updateOnePortfolio: async (portfolio) => {
        const result = await prisma.portfolio.update({
            where:{
                id:portfolio.id,
            },
            data: portfolio,
        });

        return result
    },

    /**
     * Delete a portfolio from portfolio table 
     * 
     * @param {Int} id id of type Int
     * @returns object result of type portfolio
     */
    deleteOnePortfolio: async (id) => {
        const result = await prisma.portfolio.delete({
            where: {
                id: id
            }
        })

        return result;
    }

}