const Mutation = {

  async hello(parent, args, { pubsub }) {
    pubsub.publish('notification', { notification: 'Hello Graphql Subscription!' });
    return 'Hello GraphQL!';
  }
};

export default Mutation;
