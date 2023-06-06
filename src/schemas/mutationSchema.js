const { gql } = require('apollo-server');

const mutationSchema = gql `

type Mutation {

    handleRegisteration(data:RegisterInput):Boolean 
  
    createOneUser(user:RegisterInput):User
    createManyUsers:Int
    updateOneUser(user:UserInput):User
    deleteOneUser(id:Int):User
  
    addService(service:ServiceInput):Service
    updateService(service:ServiceInput):Service
    deleteService(id:Int):Service
    populateAservice(service:ServiceInput):Service

    createProject(data:ProjectInput):Project
  
    addon(addon:AddonInput):Addon
  
    singleUpload(file:Upload!):File!
    fileUpload(file:[Upload]!):[Files]!
  
    sendMail(message:MailInput):Boolean
  
    createPost(author: String, comment: String): Post
    createSomething(id:Int):Result
    createComment(id:Int,content:String):Comment
  }
`;

module.exports={mutationSchema}