'use strict';

module.exports = new ActionResultMiddleware();

function ActionResultMiddleware() {
    var _this = this;

    _this.resolve = resolve;
    _this.handle = handle;

    const DEFAULT_ERROR_STATUS = 500;

    function resolve(req, res, next) {
        if (req.actionError) next();

        Promise
            .resolve(req.actionResult)
            .then(result => req.actionResult = result)
            .catch(error => req.actionError = error)
            .then(() => next());
    }

    function handle(req, res) {
        if (!req.actionError) {
            res.json(req.actionResult);
        } else {
            res.status(req.actionError.status || DEFAULT_ERROR_STATUS);
            res.json(req.actionError);
        }
    }
}