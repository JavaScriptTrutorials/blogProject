const config = require('../config');

module.exports = (req, res, next) => {
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
        res.locals.token = req.headers.authorization.split(' ')[1];
    } else {
        res.locals.token = null;
    }
    next();
}