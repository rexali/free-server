const { gql } = require('apollo-server');

const subscriptionSchema = gql`

type Subscription {
    postCreated: Post
    somethingChanged(id:Int):Result
    commentAdded:Comment
  }

`;

module.exports={
subscriptionSchema
}