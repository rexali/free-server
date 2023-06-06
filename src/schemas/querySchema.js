const { gql } = require('apollo-server');

const querySchema = gql`

type Query {
    
    readProject():[Project]
    
    getOneUser(id:Int):User
    getManyUsers:[User]
  
    handleLogin(data:LoginInput):String
  
    getOneService(id:Int):Service
    getManyServices:[Service]
    getServiceSection:[Section]
    getOneServicePlusAddon(id:Int):Service
    getManyServicesPlusAddon:Service
  
    testsubscription:String
    
    # This is only here to satisfy the requirement that at least one 
    # field be present within the 'Query' type for uploading file
    otherFields: Boolean!
    
    # test the server
    test:String
  }
`;
module.exports = { querySchema }