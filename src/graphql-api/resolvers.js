const GraphQLJSON = require('graphql-type-json')
const shortid = require('shortid')


module.exports = {
  JSON: GraphQLJSON,

  Counter: {
    countStr: counter => `Current count: ${counter.count}`,
  },


  Query: {
    hello: (root, { name }) => `Hello ${name || 'World'}!`,
    messages: (root, args, { db }) => db.get('messages').value(),
    uploads: (root, args, { db }) => db.get('uploads').value(),

    tags: (root, args, { db }) => db.get('tags').value(),
    tag: (root, { id }, { db }) => db.get('tags').find({ id: id }).value(),
  },

  Mutation: {
    myMutation: (root, args, context) => {
      const message = 'My mutation completed!'
      context.pubsub.publish('hey', { mySub: message })
      return message
    },
    messageAdd: (root, { input }, { pubsub, db }) => {
      const message = {
        id: shortid.generate(),
        text: input.text,
      }

      db
        .get('messages')
        .push(message)
        .last()
        .write()

      pubsub.publish('messages', { messageAdded: message })

      return message
    },

    singleUpload: (root, { file }, { processUpload }) => processUpload(file),
    multipleUpload: (root, { files }, { processUpload }) => Promise.all(files.map(processUpload)),


    tagAdd: (root, { input }, { pubsub, db }) => {
      const tag = {
        id: shortid.generate(),
        name: input.name,
      }

      db
        .get('tags')
        .push(tag)
        .last()
        .write()

      pubsub.publish('tags', { tagAdded: tag })

      return tag
    },
  },

  Subscription: {
    mySub: {
      subscribe: (parent, args, { pubsub }) => pubsub.asyncIterator('hey'),
    },
    counter: {
      subscribe: (parent, args, { pubsub }) => {
        const channel = Math.random().toString(36).substring(2, 15) // random channel name
        let count = 0
        setInterval(() => pubsub.publish(
          channel,
          {
            // eslint-disable-next-line no-plusplus
            counter: { count: count++ },
          }
        ), 2000)
        return pubsub.asyncIterator(channel)
      },
    },

    messageAdded: {
      subscribe: (parent, args, { pubsub }) => pubsub.asyncIterator('messages'),
    },


    tagAdded: {
      subscribe: (parent, args, { pubsub }) => pubsub.asyncIterator('tags'),
    },
  },
}
