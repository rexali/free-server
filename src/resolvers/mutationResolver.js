const { PubSub, PubSubEngine, withFilter } = require('graphql-subscriptions');

//  for development only
const pubsub = new PubSub();

const fileController = require("../../controllers/fileController");
const mailController = require("../../controllers/mailController");
const addonModel = require('../../models/addonModel');
const registerationController = require('../../controllers/registrationController');
const projectController = require('../../controllers/projectController');

const userModel = require('../../models/userModel');

const SOMETHING_CHANGED_TOPIC = 'something_changed';

const mutations = {

    populateAservice: async (parent, { service }) => {

        return await userModel.populateService(service);
    },

    /**
     * Register a user
     * 
     * @param {obect} _ 
     * @param {object} data an object of user
     * @returns an boolean value of success or failure
     */
    handleRegisteration: async (_, { data }) => {

        return registerationController.registerUser(data)
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
        let { MOCK_DATA } = await import('../models/dbase');
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
     * Insert an addon into the addon table
     * 
     * @param {object} addon an object of a service
     * @returns an object of a service
     */
     addon: async (_, { addon }) => {

        return await addonModel.populateAddon(addon);
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

    /**
     * upload a single file 
     *
     * @param {object} parent 
     * @param {object} file 
     * @returns an object of file
     */
    fileUpload: async (parent, { file }) => {

        return await fileController.uploadManyFiles(file)
    },

    sendMail: async (parent, args) => {

        let {
            email,
            subject,
            format,
            html,
            text,
            name
        } = args.message;


        return await mailController.sendSingleMail(
            email,
            subject,
            format,
            html,
            text,
            name
        )
    },

    createProject: async (parent, {data})=>{
        
        return await projectController.createProject(data);
    },

    readProjects: async ()=>{
        
        return await projectController.readPojects();
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
            SOMETHING_CHANGED_TOPIC, { somethingChanged: { id: args.id } }
        );

        return args;
    }

}

module.exports={
    mutations
}