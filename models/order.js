const {PrismaClient} = require('@prisma/client');
const client = new PrismaClient();

module.exports={
    
    /**
     * read orders from the database table order
     * 
     * @returns array of orders
     */
    readOrders: async()=>{
        const result = await client.order.findMany();

        return result;
    },

    /**
     * delete order from database table order
     * 
     * @param {Int} id id of the order
     * @returns order
     */
    deleteOrder:async(id)=>{
        const result = await client.order.delete({
            where:{
                id:id
            }
        })

        return result;
    },

    /**
     * Update a given order in the table
     * 
     * @param {object} obj represent the object order
     * @returns order object
     */
    updateOrder:async(obj)=>{
        const result = await client.order.update({
            where:{
               id:obj.id
            },
            data: obj,
        });

        return result
    },
    
   /**
    * Enter order to the database order table
    * 
    * @param {object} order order object
    * @returns result
    */
    createOrder:async(order)=>{
        const result = await client.order.create({
            data:order
        }) 

        return result
    }
}