const authModel = require("../models/auth.model");
const jwt = require("jsonwebtoken");

async function authMiddleware(req, res, next) {
  try {
    let token;

    if (req.cookies && req.cookies.token) {
      token = req.cookies.token;
    }

    if (!token && req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
      token = req.headers.authorization.split(" ")[1];
    }


    if (!token) {
      return res.status(401).json({
        message: "UnAuthorized",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_TOKEN);

    const user = await authModel.findById(decoded.id);

    req.user = user;
    req.userId = user._id;

    next();
  } catch (error) {
    console.log(error.message);
  }
}
async function authMiddlewareUser(req, res, next) {
  try {
    let token;

    if (req.cookies && req.cookies.token) {
      token = req.cookies.token;
    }

    if (!token && req.headers.authorization && req.headers.authorization.startsWith("Bearer")) 
    {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return res.status(401).json({ message: "Unauthorized - No Token Found" });
    }

    const decoded = jwt.verify(token, process.env.JWT_TOKEN);

    const user = await authModel.findById(decoded.id);

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
}

module.exports = { authMiddleware, authMiddlewareUser };
