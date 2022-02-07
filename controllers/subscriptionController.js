const {GooglePubSub} = require('@axelspringer/graphql-google-pubsub');
const pubsub = new GooglePubSub();


function commonMessageHandler ({attributes = {}, data = ''}) {
    return {
      ...attributes,
      text: data.toString()
    };
  }

  const options = {
    projectId: 'project-abc',
    credentials:{
      client_email: 'client@example-email.iam.gserviceaccount.com',
      private_key: '-BEGIN PRIVATE KEY-\nsample\n-END PRIVATE KEY-\n'
    }
  };

  const topic2subName = topicName => `${topicName}-${serverName}-subscription`;

  const pubSub = new GooglePubSub(options, topic2subName, commonMessageHandler)