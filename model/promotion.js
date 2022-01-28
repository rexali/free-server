const {PrismaClient} = require('@prisma/client');
const client = new PrismaClient();

module.exports={
    
    /**
     * read promotions from the database table promotion
     * 
     * @returns result of array object of promotions
     */
    readPromotions: async()=>{
        const result = await client.promotion.findMany();

        return result;
    },

    /**
     * delete promotion from database table promotion
     * 
     * @param {Int} id id of the promotion
     * @returns promotion
     */
    deletePromotion:async(id)=>{
        const result = await client.promotion.delete({
            where:{
                id:id
            }
        })

        return result;
    },

    /**
     * Update a given promotion in the table
     * 
     * @param {object} obj represent the object promotion
     * @returns promotion object
     */
    updatePromotion:async(obj)=>{
        const result = await client.promotion.update({
            where:{
               id:obj.id
            },
            data: obj,
        });

        return result
    },
    
   /**
    * Enter promotion to the database promotion table
    * 
    * @param {object} promotion promotion object
    * @returns result
    */
    createPromotion:async(promotion)=>{
        const result = await client.promotion.create({
            data:promotion
        }) 

        return result
    }
}