const {PrismaClient} = require('@prisma/client');
const client = new PrismaClient();

module.exports={
    
    /**
     * read notifications from the database notifications table
     * 
     * @returns array of notifications
     */
    readNotifications: async()=>{
        const result = await client.notification.findMany();

        return result;
    },

    /**
     * delete notification from database table notification
     * 
     * @param {Int} id id of the notification
     * @returns notification
     */
    deleteNotification:async(id)=>{
        const result = await client.notification.delete({
            where:{
                id:id
            }
        })

        return result;
    },

    /**
     * Update a given notification in the table
     * 
     * @param {object} obj represent the object notification
     * @returns notification object
     */
    updateNotification:async(obj)=>{
        const result = await client.notification.update({
            where:{
               id:obj.id
            },
            data: obj,
        });

        return result
    },
    
   /**
    * Enter notification to the database notification table
    * 
    * @param {object} notification notification object
    * @returns result
    */
    createNotification:async(notification)=>{
        const result = await client.notification.create({
            data:notification
        }) 

        return result
    }
}