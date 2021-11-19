const Subscription = {

  notification: {
    async subscribe(parent, args, { pubsub }) {
      return pubsub.asyncIterator('notification');
    }
  }
};

export default Subscription;
