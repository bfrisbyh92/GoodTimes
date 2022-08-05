import dotenv from "dotenv";
dotenv.config();
import jwt, { decode } from "jsonwebtoken";
const secret = process.env.SECRET;
// console.log(secret);

// This middleware feature is getting called to verify the
// JsonWebToken. If everything checks out during verification
// it will call the next function and the users token will be verified.

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const isCustomAuth = token.length < 500;

    let decodedData;

    if (token && isCustomAuth) {
      decodedData = jwt.verify(token, secret);
      req.userId = decodedData?.id;
      // req.userId is getting sent to controllers and read
    }

    next();

    // else {
    //     decodedData = jwt.decode(token);
    // req.userId = decodedData?.sub;
    // }
    // This else statement does nothing right now.
    // I will uncomment it later and use it to implement Google login
  } catch (err) {
    console.error(err);
  }
};

export default auth;
