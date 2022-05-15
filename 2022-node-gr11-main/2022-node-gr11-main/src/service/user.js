const config = require("config");
const { getChildLogger } = require("../core/logging");
const userRepository = require("../repository/user");
const Role = require("../core/roles");
const ServiceError = require("../core/serviceError");
const { generateJWT, verifyJWT } = require("../core/jwt");

const debugLog = (message, meta = {}) => {
  if (!this.logger) this.logger = getChildLogger("place-service");
  this.logger.debug(message, meta);
};

/**
 * Only return the public information about the given user.
 */
const makeExposedUser = ({ USERID, ISBLOCKED, ROLES, USERNAME }) => ({
  USERID,
  ISBLOCKED,
  ROLES,
  USERNAME,
});

/**
 * Only return the public information about the given user using e-d.
 */
const makeExposedE_idUser = ({ USERID, IDNUMBER, ROLES, USERNAME }) => ({
  USERID,
  IDNUMBER,
  ROLES,
  USERNAME,
});

/**
 * Create the returned information after login.
 */
const makeLoginData = async (user) => {
  const token = await generateJWT(user);

  return {
    user: makeExposedUser(user),
    token,
  };
};

/**
 * Create the returned information after login (e-id).
 */
const makeLoginDataE_id = async (user_eid) => {
  const token = await generateJWT(user_eid);

  return {
    user: makeExposedE_idUser(user_eid),
    token,
  };
};

/**
 * Try to login a user with the given username and password.
 *
 * @param {string} username - The username to try.
 * @param {string} password - The password to try.
 *
 * @returns {Promise<object>} - Promise whichs resolves in an object containing the token and signed in user.
 */
const login = async (username, password) => {
  debugLog(
    `Logging user in with username ${username} and password ${password}`
  );
  const user = await userRepository.findByName(username);

  if (!user) {
    // DO NOT expose we don't know the user
    throw ServiceError.unauthorized(
      "The given username and password do not match"
    );
  }

  const passwordValid = password === user.PASSWORD;

  if (!passwordValid) {
    // DO NOT expose we know the user but an invalid password was given
    throw ServiceError.unauthorized(
      "The given username and password do not match"
    );
  }

  return await makeLoginData(user);
};

/**
 * Try to login a user with the given idnumber and password (login with eid).
 *
 * @param {string} idnumber - The idnumber to try.
 * @param {string} password - The password to try.
 *
 * @returns {Promise<object>} - Promise whichs resolves in an object containing the token and signed in user.
 */
const loginE_id = async (idnummer, password) => {
  debugLog(
    `Logging user in with idnummer ${idnummer} and password ${password} through e-id`
  );
  const user_eid = await userRepository.findByIdNummer(idnummer);

  if (!user_eid) {
    // DO NOT expose we don't know the user
    throw ServiceError.unauthorized(
      "The given idnumber and password do not match"
    );
  }

  const passwordValid = password === user_eid.PASSWORD;

  if (!passwordValid) {
    // DO NOT expose we know the user but an invalid password was given
    throw ServiceError.unauthorized(
      "The given idnumber and password do not match"
    );
  }

  return await makeLoginDataE_id(user_eid);
};

/**
 * Get all users without passwords.
 *
 */
const getAll = async () => {
  debugLog("Fetching all users", {});
  const data = await userRepository.findAll();
  return { data: data.map(makeExposedUser) };
};

/**
 * Get user with the given `username`.
 *
 * @param {string} username - Username of the user to get.
 */
const getByName = async (username) => {
  debugLog(`Fetching user with name ${username}`);
  const user = await userRepository.findByName(username);

  if (!user) {
    throw ServiceError.notFound(`No user with name ${username} exists`, { id });
  }

  return makeExposedUser(user);
};

/**
 * Get user with the given `id`.
 *
 * @param {string} id - Id of the user to get.
 */
const getById = async (id) => {
  debugLog(`Fetching user with id ${id}`);
  const user = await userRepository.findById(id);

  if (!user) {
    throw ServiceError.notFound(`No user with id ${id} exists`, { id });
  }

  return makeExposedUser(user);
};

/**
 * Get user with the given `idnumber`.
 *
 * @param {string} idnumber - Id of the user to get.
 */
const getByIdNumber = async (idnumber) => {
  debugLog(`Fetching user with idnumber ${idnumber}`);
  const user_eid = await userRepository.findByIdNummer(idnumber);

  if (!user_eid) {
    throw ServiceError.notFound(`No user with id ${id} exists`, { id });
  }

  return makeExposedE_idUser(user_eid);
};

/**
 * Check and parse a JWT from the given header into a valid session
 * if possible.
 *
 * @param {string} authHeader - The bare 'Authorization' header to parse
 *
 * @throws {ServiceError} One of:
 * - UNAUTHORIZED: Invalid JWT token provided, possible errors:
 *   - no token provided
 *   - incorrect 'Bearer' prefix
 *   - expired JWT
 *   - other unknown error
 */
const checkAndParseSession = async (authHeader) => {
  if (!authHeader) {
    throw ServiceError.unauthorized("You need to be signed in");
  }

  if (!authHeader.startsWith("Bearer ")) {
    throw ServiceError.unauthorized("Invalid authentication token");
  }

  const authToken = authHeader.substr(7);
  try {
    const { roles, userId } = await verifyJWT(authToken);

    return {
      userId,
      roles,
      authToken,
    };
  } catch (error) {
    const logger = getChildLogger("user-service");
    logger.error(error.message, { error });
    throw ServiceError.unauthorized(error.message);
  }
};

/**
 * Check and parse a JWT from the given header into a valid session
 * if possible.
 *
 * @param {string} authHeader - The bare 'Authorization' header to parse
 *
 * @throws {ServiceError} One of:
 * - UNAUTHORIZED: Invalid JWT token provided, possible errors:
 *   - no token provided
 *   - incorrect 'Bearer' prefix
 *   - expired JWT
 *   - other unknown error
 */
const checkAndParseSessionE_id = async (authHeader) => {
  if (!authHeader) {
    throw ServiceError.unauthorized("You need to be signed in");
  }

  if (!authHeader.startsWith("Bearer ")) {
    throw ServiceError.unauthorized("Invalid authentication token");
  }

  const authToken = authHeader.substr(7);
  try {
    const { userId, id_nummer, roles } = await verifyJWT_eid(authToken);

    return {
      userId,
      id_nummer,
      roles,
      authToken,
    };
  } catch (error) {
    const logger = getChildLogger("user-service");
    logger.error(error.message, { error });
    throw ServiceError.unauthorized(error.message);
  }
};

/**
 * Check if the given roles include the given required role.
 *
 * @param {string} role - Role to require.
 * @param {string[]} roles - Roles of the user.
 *
 * @returns {void} Only throws if role not included.
 *
 * @throws {ServiceError} One of:
 * - UNAUTHORIZED: Role not included in the array.
 */
const checkRole = (role, roles) => {
  const hasPermission = roles.includes(role);

  if (!hasPermission) {
    throw ServiceError.forbidden(
      "You are not allowed to view this part of the application"
    );
  }
};

module.exports = {
  getAll,
  getById,
  getByName,
  getByIdNumber,
  checkAndParseSession,
  checkAndParseSessionE_id,
  checkRole,
  login,
  loginE_id,
};
