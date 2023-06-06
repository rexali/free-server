const { GraphQLUpload, } = require('graphql-upload');

const subscriptionResolver = require('./subscriptionResolver');
const queryResolver  = require('./queryResolver');
const mutationResover = require('./mutationResolver');

const resolvers = {

    Upload: GraphQLUpload,

    Query: queryResolver.queries,

    Mutation: mutationResover.mutations,

    Subscription: subscriptionResolver.subscriptions, 
    
}

module.exports = resolvers