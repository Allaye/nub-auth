var auth = require("basic-auth");
var compare = require("tsscmp");
/**
 * @description Middleware to authenticate users
 * @param {*} options - options object with the following properties: users and challenge
 * @returns
 */
function nubAuth(options) {
    return function (req, res, next) {
        var credentials = auth(req);
        if (!credentials ||
            !checkit(options.users, credentials.name, credentials.pass)) {
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
 * @param {*} users - users credentials object to check the provided credentials against
 * @param {*} name - provided username credential through basic-auth
 * @param {*} pass - provided password credential through basic-auth
 * @returns - true if credentials are valid, false otherwise
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
