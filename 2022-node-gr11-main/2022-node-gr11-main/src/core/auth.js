const userService = require('../service/user');

/**
 * Middleware to enforce a JWT in every request.
 */
const requireAuthentication = async (ctx, next) => {
  const {
    authorization,
  } = ctx.headers;

  const {
    authToken,
    ...session
  } = await userService.checkAndParseSession(authorization);

  // Save the decoded session data in the current context's state
  ctx.state.session = session;
  // Also save the JWT in case we e.g. need to perform a request in the name of the current user
  ctx.state.authToken = authToken;

  return next();
};

/**
 * Create a Koa middleware whichs enforces the given role.
 *
 * **Requires JWT session data to be decoded before this middleware is called**
 *
 * @param {string} role - The role to have.
 *
 * @returns {Function} - A Koa middleware.
 */
const makeRequireRole = (role) => async (ctx, next) => {
  const {
    roles = [],
  } = ctx.state.session;

  userService.checkRole(role, roles);
  return next();
};

module.exports = {
  requireAuthentication,
  makeRequireRole,
};