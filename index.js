var auth = require("basic-auth");
var compare = require("tsscmp");
/**
 * @description Middleware to authenticate users
 * @param {IOptions} options - options object with the following properties: users and challenge
 * @returns {function} - middleware function
 */
function nubAuth(options) {
    return function (req, res, next) {
        var credentials = auth(req);
        if (!credentials || !checkit(options.users, credentials.name, credentials.pass)) {
            if (options.challenge) {
                res.statusCode = 401;
                res.setHeader("WWW-Authenticate", 'Basic realm="example"');
                res.end("Access denied");
            }
            else {
                res.statusCode = 401;
                res.end("Access denied");
            }
        }
        else {
            next();
        }
    };
}
;
/**
 * @description function to check if user credentials are valid
 * @param {string} users - user objects that contain the username and password
 * @param {string} name - username gotten from basic-auth
 * @param {string} pass - password gotten from basic-auth
 * @returns {boolean} - true if credentials are valid, false otherwise
 */
function checkit(users, name, pass) {
    var valid = true;
    var username;
    var password;
    if (users[name]) {
        username = name;
        password = users[name];
        // Simple method to prevent short-circut and use timing-safe compare
        valid = compare(name, username) && valid;
        valid = compare(pass, password) && valid;
        return valid;
    }
    return false;
}
module.exports = nubAuth;
