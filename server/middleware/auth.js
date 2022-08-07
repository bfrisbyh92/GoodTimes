import dotenv from "dotenv";
dotenv.config();
import jwt, { decode } from "jsonwebtoken";
const secret = process.env.SECRET;
// console.log(secret);

// This middleware feature is getting called to verify the
// JsonWebToken and decode the credentials. If everything checks out during verification
// it will call the next function, the users token will be verified.

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    console.log(`token: ${token}`);
    const isCustomAuth = token?.length < 500;

    let decodedData;

    if (token && isCustomAuth) {
      decodedData = jwt.verify(token, secret);
      req.userId = decodedData?.id;
      console.log(
        `req.userId from personally created auth token: ${req?.userId}`
      );
      // req.userId is getting sent to controllers and read
    } else {
      decodedData = jwt.decode(token);
      req.userId = decodedData?.sub;
      console.log(`req.userId is Google sub#: ${req?.userId}`);
    }
    next();
    // ^^^ I'm taking the request headers and isolating the token. Verifying it's authorized
    // and then letting things proceed by calling next if everything checks out.
    // Optional chaining so nothing breaks if someone attemps to do something unauthorized.
  } catch (err) {
    console.error(err);
  }
};

export default auth;
