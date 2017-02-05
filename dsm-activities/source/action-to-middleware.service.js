'use strict';

module.exports = new ActionToMiddleware();

function ActionToMiddleware() {
    var _this = this;

    _this.toMiddleware = toMiddleware;

    function toMiddleware(action) {
        let middleware = (req, res, next) => {
            try {
                req.actionResult = action.apply(null, getActionParams(req));
            } catch (e) {
                req.actionError = e;
            } finally{
                next();
            }
        };

        return middleware;
    }

    function getActionParams(req) {
        let params = req.route.path.split('/')
            .filter(pathPart => pathPart[0] == ':')
            .map(paramName => req.params[paramName.substr(1)]);
        
        if (req.body && Object.keys(req.body).length > 0) params.push(req.body);
        if (req.query && Object.keys(req.query).length > 0) params.push(req.query);

        return params;
    }
}