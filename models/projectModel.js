const {PrismaClient} = require('@prisma/client');
const client = new PrismaClient();

module.exports={
    
    /**
     * read Projects from the database table project
     * 
     * @returns result of object array of Projects
     */
    readProjects: async()=>{
        const result = await client.project.findMany();

        return result;
    },

    /**
     * delete project from database table project
     * 
     * @param {Int} id id of the project
     * @returns project
     */
    deleteProject:async(id)=>{
        const result = await client.project.delete({
            where:{
                id:id
            }
        })

        return result;
    },

    /**
     * Update a given project in the table
     * 
     * @param {object} obj represent the object project
     * @returns project object
     */
    updateProject:async(obj)=>{
        const result = await client.project.update({
            where:{
               id:obj.id
            },
            data: obj,
        });

        return result
    },
    
   /**
    * Enter project to the database project table
    * 
    * @param {object} project project object
    * @returns result
    */
    createProject:async(project)=>{
        const result = await client.project.create({
            data:project
        }) 

        return result
    }
}