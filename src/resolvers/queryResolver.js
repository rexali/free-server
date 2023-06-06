const authentication = require('../../models/authenticationModel');
const userModel = require('../../models/userModel');
const serviceModel = require("../../models/serviceModel");
const authenticationController = require('../../controllers/authenticationController');
const serviceController = require('../../controllers/serviceController');

const queries ={
    // test server
    test: () => 'Test Success, GraphQL server is up & running !!',

    /**
     * Handle authentication of a user 
     *
     * @param {object} parent
     * @param {object} data object of login detail
     * @returns a boolean value
     */
    handleLogin: async (parent, { data: { email, password, role } },{req,res}) => {

        return await authenticationController.authenticateUser(email, password, role,req, res);
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
    getServiceSection: async () => {

        return await serviceController.serviceByCategory();
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

}

module.exports={queries}