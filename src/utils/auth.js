import jwt from 'jsonwebtoken';
import { jwtSecret } from '../../config';

const getUser = (request) => {
  if (request && request.request.headers.authorization) {
    const header = request.request.headers.authorization;
    const token = header.replace('Bearer ', '');
    const decoded = jwt.verify(token, jwtSecret);
    console.log(`Authenticated user: ${decoded.firstName} ${decoded.lastName}, Type: ${decoded.userType}, userId: ${decoded.userId}`);
    return decoded;
  }
  throw new Error('Authentication token required!');
};

export default getUser;
