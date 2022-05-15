const config = require("config");
const jwt = require("jsonwebtoken");
const { getLogger } = require("./logging");
const ServiceError = require("./serviceError");

const JWT_AUDIENCE = config.get("auth.jwt.audience");
const JWT_ISSUER = config.get("auth.jwt.issuer");
const JWT_SECRET = config.get("auth.jwt.secret");
const JWT_EXPIRATION_INTERVAL = config.get("auth.jwt.expirationInterval");

module.exports.generateJWT = (user) => {
  const tokenData = {
    userId: user.USERID,
    roles: user.ROLES,
  };

  const signOptions = {
    audience: JWT_AUDIENCE,
    issuer: JWT_ISSUER,
    subject: "auth",
    expiresIn: Math.floor(JWT_EXPIRATION_INTERVAL / 1000),
  };

  return new Promise((resolve, reject) => {
    jwt.sign(tokenData, JWT_SECRET, signOptions, (err, token) => {
      if (err) {
        getLogger().error("Error while signing new token", err.message);
        return reject(err);
      }
      return resolve(token);
    });
  });
};

module.exports.verifyJWT = (authToken) => {
  const verifyOptions = {
    audience: JWT_AUDIENCE,
    issuer: JWT_ISSUER,
    subject: "auth",
  };

  return new Promise((resolve, reject) => {
    jwt.verify(authToken, JWT_SECRET, verifyOptions, (err, decodeToken) => {
      if (err || !decodeToken) {
        getLogger().error("Error while verifying token", err.message);
        return reject(
          err || ServiceError.unauthorized("Token could not be parsed")
        );
      }

      return resolve(decodeToken);
    });
  });
};

//modules voor inloggen via e-id
module.exports.generateJWT_eid = (user_eid) => {
  const tokenData = {
    userId: user_eid.USERID,
    id_nummer: user_eid.IDNUMBER,
    roles: user_eid.ROLES,
  };

  const signOptions = {
    audience: JWT_AUDIENCE,
    issuer: JWT_ISSUER,
    subject: "auth",
    expiresIn: Math.floor(JWT_EXPIRATION_INTERVAL / 1000),
  };

  return new Promise((resolve, reject) => {
    jwt.sign(tokenData, JWT_SECRET, signOptions, (err, token) => {
      if (err) {
        getLogger().error("Error while signing new token", err.message);
        return reject(err);
      }
      return resolve(token);
    });
  });
};

module.exports.verifyJWT_eid = (authToken) => {
  const verifyOptions = {
    audience: JWT_AUDIENCE,
    issuer: JWT_ISSUER,
    subject: "auth",
  };

  return new Promise((resolve, reject) => {
    jwt.verify(authToken, JWT_SECRET, verifyOptions, (err, decodeToken) => {
      if (err || !decodeToken) {
        getLogger().error("Error while verifying token", err.message);
        return reject(
          err || ServiceError.unauthorized("Token could not be parsed")
        );
      }

      return resolve(decodeToken);
    });
  });
};
