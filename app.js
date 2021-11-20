import { GraphQLServer, PubSub } from 'graphql-yoga';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import { databaseConfig, jwtSecret, appUrl } from './config';
import UserModel from './src/database/schema';
import sendEmailToUser from './src/utils/email';
import getUser from './src/utils/auth';

// mongodb connection initiation
mongoose.connect(databaseConfig.dbUri, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true,
  autoIndex: false
}).then(() => {
  console.log('Database has been connected');
}).catch((err) => {
  console.log(`Unable to connect to Database : ${err}`);
});
// mongoose.set('debug', true);

const typeDefs = `
scalar Json
scalar Date

type Query {
  hello: String!
  getMyProfile: Json
}
type Mutation {
  hello: String!
  sendMagicLink(email: String!): Json
  updateProfile(data: updateProfileInput!): Json
}

input updateProfileInput {
  firstName: String
  lastName: String
  phone: String
  avatarUrl: String
}
`;

const resolvers = {
  Query: {
    hello: () => 'Hello GraphQL!',
    async getMyProfile(parent, args, { request }) {
      const { email } = getUser(request);
      const user = await UserModel.findOne({ email });
      if (!user) throw new Error('User not found');
      return user;
    }
  },

  Mutation: {
    hello: () => 'Hello GraphQL!',
    async sendMagicLink(parent, { email }) {
      const emailObj = {
        to: email,
        subject: 'Your magic link',
        html: ''
      };
      const userExists = await UserModel.findOne({ email });
      if (userExists) {
        // TODO: send magic link to user
        const { _id, firstName, lastName } = userExists;
        const activationToken = jwt.sign({ _id, firstName, lastName, email }, jwtSecret, { expiresIn: '1 days' });
        emailObj.html = `<b>Welcome, click on below link to signin</b><br><a href="${appUrl}/user/${activationToken}" style="background:green;text-decoration:none!important;font-weight:500;margin-top:5px;color:#fff;font-size:14px;padding:10px 24px;display:inline-block;border-radius:50px">Sign in</a>`;
        await sendEmailToUser(emailObj);
        return userExists;
      }
      // create user and send magic link
      const user = await UserModel.create({ email });
      const { _id, firstName, lastName, createdAt, updatedAt } = user;
      const activationToken = jwt.sign({ _id, firstName, lastName, email, createdAt, updatedAt }, jwtSecret, { expiresIn: '1 days' });
      emailObj.html = `<b>Welcome, Confirm your signup by clicking on below link</b><br><a href="${appUrl}/user/${activationToken}" style="background:#e8a329;text-decoration:none!important;font-weight:500;margin-top:5px;color:#fff;font-size:14px;padding:10px 24px;display:inline-block;border-radius:50px">Confirm</a>`;
      await sendEmailToUser(emailObj);
      return user;
    },
    async updateProfile(parent, { data }, { request }) {
      const { email } = getUser(request);
      const user = await UserModel.findOne({ email });
      if (!user) throw new Error('User not found!');
      return UserModel.updateOne({ email }, { ...data });
    }
  }
};

const pubsub = new PubSub();
const server = new GraphQLServer({
  typeDefs,
  resolvers,
  context(request) {
    return {
      pubsub,
      request
    };
  }
});

server.start(() => console.log('Server is listening at localhost:4000'));
