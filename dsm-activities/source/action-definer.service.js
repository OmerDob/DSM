'use strict';

module.exports = new ActionDefiner();

function ActionDefiner() {
    let _this = this;

    _this.defineAction = defineAction;

    function defineAction(router, config) {
        let actionPath = buildActionPath(config);
        let actionMiddleware = buildActionMiddleware(config);

        router[config.method](actionPath, actionMiddleware);

        return _this;
    }

    function buildActionPath(config) {
        let actionPath = config.name ? `/${config.name}` : '';

        if (config.params) {
            actionPath += `/:${config.params.join('/:')}`;
        }

        return actionPath == '' ? '/' : actionPath;
    }

    function buildActionMiddleware(config) {
        return (req, res) => {
            let actionParams = getActionParams(req, config.params);
            let actionPromise = promisify(config.action, actionParams);

            actionPromise
                .then(data => res.json(data))
                .catch(error => {
                    res.status(error.status || 500);
                    res.json(error);
                });
        };
    }

    function getActionParams(req, paramsNames) {
        let actionParams = paramsNames ?
            paramsNames.map(paramName => req.params[paramName]) :
            [];

        actionParams.push(req.body, req.query);

        return actionParams;
    }

    function promisify(action, params) {
        return new Promise((resolve, reject) => {
            let actionResult;

            try {
                actionResult = action.apply(null, params);
            } catch (error) {
                reject(error);
            }

            resolve(actionResult);
        });
    }
}