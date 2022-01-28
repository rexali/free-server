const {PrismaClient} = require('@prisma/client');
const client = new PrismaClient();

module.exports={
    
    /**
     * read reviews from the database table review
     * 
     * @returns result of object array of Reviews
     */
    readReviews: async()=>{
        const result = await client.review.findMany();

        return result;
    },

    /**
     * delete review from database table review
     * 
     * @param {Int} id id of the review
     * @returns review
     */
    deleteReview:async(id)=>{
        const result = await client.review.delete({
            where:{
                id:id
            }
        })

        return result;
    },

    /**
     * Update a given review in the table
     * 
     * @param {object} obj represent the object review
     * @returns review object
     */
    updateReview:async(obj)=>{
        const result = await client.review.update({
            where:{
               id:obj.id
            },
            data: obj,
        });

        return result
    },
    
   /**
    * Enter review to the database review table
    * 
    * @param {object} review review object
    * @returns result
    */
    createReview:async(review)=>{
        const result = await client.review.create({
            data:review
        }) 

        return result
    }
}