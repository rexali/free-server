const { GraphQLUpload, } = require('graphql-upload');
const { PrismaClient } = require('@prisma/client');

const authentication = require('./model/authentication');
const users = require('./model/user');
const services = require("./model/service");
const files = require("./model/file");

const db = require('./db');

const prisma = new PrismaClient()

const resolvers = {

    Upload: GraphQLUpload,

    Query: {
         // test server
         test: () => 'Test Success, GraphQL server is up & running !!',

        /**
         * Handle authentication of a user 
         *
         * @param {object} _ represent arguement
         * @param {object} data object
         * @returns a boolean value
         */
        handleLogin: async (_, { data: { email, password, role } }) => {

            return await authentication.authenticate(email, password, role)
        },

        /**
         * Read a user datail from the user table
         * 
         * @param {Int} id 
         * @returns  an object of user
         */
        getOneUser: async (_, { id }) => {
            try {

                return await users.getOneUser(id);
            } catch (error) {
                console.log(error)
            }
        },

        /**
         * Read all users from the user table 
         * 
         * @returns array of user objects
         */
        getManyUsers: async () => {

            return users.getManyUsers();
        },

        /**
         * Get many services fro the table
         * 
         * @returns array of service objects
         */
        getManyServices: async () => {

            return await services.getManyServices();
        },

        /**
         * Get a service of a given id
         * 
         * @param {object} parent 
         * @param {Int} id id of a service 
         * @returns a service object 
         */
        getOneService: async (parent, { id }) => {

            return await services.getOneService(id);
        },

        /**
         * Get a service plus its associated added services or add-ons
         * 
         * @param {object} _ 
         * @param {Int} id an id of a given service 
         * @returns an object of service
         */
        getOneServicePlusAddon: async (_, { id }) => {

            return services.getOneServiceAndAddons(id);
        },

        /**
         * Get all services with respected add-on services
         * 
         * @returns array of object of service
         */
        getManyServicesPlusAddon: async () => {

            return await services.getAllServicesAndAddons();
        },
 
    },

    Mutation: {

        /**
         * Register a user
         * 
         * @param {obect} _ 
         * @param {object} data an object of user
         * @returns an boolean value of success or failure
         */
        handleRegisteration: async (_, { data }) => {

            const newUser = await prisma.user.create({
                data: data
            })

            if (newUser) {

                return true;
            }

            return false;

        },

        /**
         * Insert a user detail into the user table
         * 
         * @param {object} user 
         * @returns an object of user
         */
        createOneUser: async (parent, { user }) => {

            return await users.createOneUser(user);
        },

        /**
         * Insert many users to user table (populate user table)
         * 
         * @returns  an integer number of entries
         */
        createManyUsers: async () => {
            const result = await prisma.user.createMany({
                data: (await import('./data/mock-data')).MOCK_DATA,
                // data:require('./data/mock-data').MOCK_DATA
            })

            return result.count;
        },

        /**
         * Update a user in the user table
         * 
         * @param {object} user 
         * @returns an object of updated user
         */
        updateOneUser: async (parent, { user }) => {

            return await users.updateOneUser(user)
        },

        /**
         * Delete a user from user table 
         * 
         * @param {Int} id a given id of user 
         * @returns an object of a deleted user
         */
        deleteOneUser: async (parent, { id }) => {

            return await users.deleteOneUser(id);
        },

        /**
         * Delete a service or offer from user table 
         * 
         * @param {Int} id 
         * @returns an object of a service
         */
        deleteService: async (_, { id }) => {

            return await services.deleteOneService(id);
        },

        /**
         * Insert a serviceinto the user table
         * 
         * @param {object} service an object of a service
         * @returns an object of a service
         */
        addService: async (_, { service }) => {

            return await services.createOneService(service);
        },

        /**
        * update a service in the service table
        * 
        * @param {object} user 
        * @returns result
        */
        updateService: async (_, { service }) => {

            return await services.updateOneService(service)
        },

        /**
         * upload a single file 
         *
         * @param {object} parent 
         * @param {object} file 
         * @returns an object of file
         */
        singleUpload: async (parent, { file }) => {

            return await files.uploadOneFile(file)
        },


    },

    // Subscription: {

    // }

}

module.exports = resolvers