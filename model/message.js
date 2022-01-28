const {PrismaClient} = require('@prisma/client');
const client = new PrismaClient();

module.exports={
    
    /**
     * Read messages from the database table message
     * 
     * @returns array of messages
     */
    readMessages: async()=>{
        const result = await client.message.findMany();

        return result;
    },

    /**
     * Delete message from database table message
     * 
     * @param {Int} id id of the message
     * @returns an object of message
     */
    deleteMessage:async(id)=>{
        const result = await client.message.delete({
            where:{
                id:id
            }
        })

        return result;
    },

    /**
     * Update a given message in the table
     * 
     * @param {object} obj represent the object message
     * @returns an object of message
     */
    updateMessage:async(obj)=>{
        const result = await client.message.update({
            where:{
               id:obj.id
            },
            data: obj,
        });

        return result
    },
    
   /**
    * Enter message to the database message table
    * 
    * @param {object} message a message object
    * @returns an object of message
    */
    createMessge:async(message)=>{
        const result = await client.message.create({
            data:message
        }) 

        return result
    }
}