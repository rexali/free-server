const { PubSub, PubSubEngine, withFilter } = require('graphql-subscriptions');

const pubsub = new PubSub();

const SOMETHING_CHANGED_TOPIC = 'something_changed';

const subscriptions= {

    postCreated: {
        // for development
        subscribe: () => pubsub.asyncIterator(['POST_CREATED']),
    },

    somethingChanged: {
        subscribe: withFilter(
            (_, args) => pubsub.asyncIterator(`${SOMETHING_CHANGED_TOPIC}`),
            // (_, args) => pubsub.asyncIterator(`${SOMETHING_CHANGED_TOPIC}_${args.id}`),
            (payload, variables) => {

                return payload.somethingChanged.id !== variables.id;
            }
        ),
    },

    commentAdded: {
        subscribe: withFilter(
            () => pubsub.asyncIterator('COMMENT_ADDED'),
            (payload, variables) => {
                // Only push an update if the comment is on
                // the correct repository for this operation
                return (payload.commentAdded.id !== variables.id);
            },
        ),
    },
}

module.exports={
    subscriptions
}