const jwt = require("jsonwebtoken");

/**
 * This function generates valid JSON Web Token (JWT)
 * 
 * @param   {string} user      User Object
 * @param   {string} secret    Secret word
 * @param   {string} expiresIn Time for expiration example: "2h", "24h" and so on.
 * @returns {string} Generated Token
 */
 const generateToken = (user, secret, expiresIn = "2h") => {

  const { id, email, first_name, last_name } = user;

  return jwt.sign( { id, email, first_name, last_name }, secret, { expiresIn });
};

module.exports = generateToken;