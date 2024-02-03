module.exports = function (req, res, next) {
    let method = req.method;
    let path = req.path;

    console.log(`${method} request on ${path}`);
    next();
}