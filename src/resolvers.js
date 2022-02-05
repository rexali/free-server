const { GraphQLUpload, } = require('graphql-upload');
const { PrismaClient } = require('@prisma/client');
const { PubSub, PubSubEngine, withFilter } = require('graphql-subscriptions');

//  for development
const pubsub = new PubSub();
// for production
class MyPubSub extends PubSubEngine { }
const mypubsub = new MyPubSub();

const authentication = require('../models/authentication');
const userModel = require('../models/userModel');
const serviceModel = require("../models/serviceModel");
const fileController = require("../controllers/fileController");

const prisma = new PrismaClient()

const SOMETHING_CHANGED_TOPIC = 'something_changed';

const resolvers = {

    Upload: GraphQLUpload,

    Query: {
        // test server
        test: () => 'Test Success, GraphQL server is up & running !!',

        /**
         * Handle authentication of a user 
         *
         * @param {object} parent
         * @param {object} data object of login detail
         * @returns a boolean value
         */
        handleLogin: async (parent, { data: { email, password, role } }) => {

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

                return await userModel.getOneUser(id);
            } catch (error) {
                console.log(error)
            }
        },

        /**
         * Read all userModel from the user table 
         * 
         * @returns array of user objects
         */
        getManyUsers: async () => {

            return userModel.getManyUsers();
        },

        /**
         * Get many services fro the table
         * 
         * @returns array of service objects
         */
        getManyServices: async () => {

            return await serviceModel.getManyServices();
        },

        /**
         * Get a service of a given id
         * 
         * @param {object} parent 
         * @param {Int} id id of a service 
         * @returns a service object 
         */
        getOneService: async (parent, { id }) => {

            return await serviceModel.getOneService(id);
        },

        /**
         * Get a service plus its associated added services or add-ons
         * 
         * @param {object} _ 
         * @param {Int} id an id of a given service 
         * @returns an object of service
         */
        getOneServicePlusAddon: async (_, { id }) => {

            return serviceModel.getOneServiceAndAddons(id);
        },

        /**
         * Get all serviceModel with respected add-on services
         * 
         * @returns array of object of service
         */
        getManyServicesPlusAddon: async () => {

            return await serviceModel.getAllServicesAndAddons();
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

            return await userModel.createOneUser(user);
        },

        /**
         * Insert many userModel to user table (populate user table)
         * 
         * @returns  an integer number of entries
         */
        createManyUsers: async () => {
            let {MOCK_DATA} = await import('../models/dbase');
            const result = await prisma.user.createMany({
                data: MOCK_DATA
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

            return await userModel.updateOneUser(user)
        },

        /**
         * Delete a user from user table 
         * 
         * @param {Int} id a given id of user 
         * @returns an object of a deleted user
         */
        deleteOneUser: async (parent, { id }) => {

            return await userModel.deleteOneUser(id);
        },

        /**
         * Delete a service or offer from user table 
         * 
         * @param {Int} id 
         * @returns an object of a service
         */
        deleteService: async (_, { id }) => {

            return await serviceModel.deleteOneService(id);
        },

        /**
         * Insert a service into the user table
         * 
         * @param {object} service an object of a service
         * @returns an object of a service
         */
        addService: async (_, { service }) => {

            return await serviceModel.createOneService(service);
        },

        /**
        * update a service in the service table
        * 
        * @param {object} user 
        * @returns result
        */
        updateService: async (_, { service }) => {

            return await serviceModel.updateOneService(service)
        },

        /**
         * upload a single file 
         *
         * @param {object} parent 
         * @param {object} file 
         * @returns an object of file
         */
        singleUpload: async (parent, { file }) => {

            return await fileController.uploadSingleFile(file)
        },

        fileUpload: async (parent, { file }) => {

            return await fileController.uploadManyFiles(file)
        },

        createPost(parent, args, context) {
            pubsub.publish('POST_CREATED', { postCreated: args });

            return args;
            // return postController.createPost(args);
        },
        
        createComment(parent, args, context) {
            pubsub.publish('COMMENT_ADDED', { commentAdded: args });

            return args;
            // return postController.createPost(args);
        },

        createSomething: (_, args) => {
            pubsub.publish(
                SOMETHING_CHANGED_TOPIC, { somethingChanged: { id: 3 } }
            );

            return args;
        }

    },

    Subscription: {

        postCreated: {
            // for development
            subscribe: () => pubsub.asyncIterator(['POST_CREATED']),

            // for production
            // subscribe: () => mypubsub.asyncIterator(['POST_CREATED']),
        },

        somethingChanged: {
            subscribe: withFilter(
                (_, args) => pubsub.asyncIterator(`${SOMETHING_CHANGED_TOPIC}_${args.id}`),
                (payload, variables) => {

                    return payload.somethingChanged.id === variables.id;
                }
            ),
        },

        commentAdded: {
            subscribe: withFilter(
                () => pubsub.asyncIterator('COMMENT_ADDED'),
                (payload, variables) => {
                    // Only push an update if the comment is on
                    // the correct repository for this operation
                    return (payload.commentAdded.id === variables.id);
                },
            ),
        },
    }

}

module.exports = resolvers