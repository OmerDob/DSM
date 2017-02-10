describe('ActionToMiddleware', function () {
    var invokeMiddleware;
    var _actionToMiddleware = require('../../source/action-to-middleware.service');
    var _actionMock;
    var _reqMock;
    var _resMock;
    var _nextMock;
    var _actionResultMock;
    var _actionErrorMock;

    beforeEach(() => {
        _resMock = {};
        _actionResultMock = 'action result';
        _nextMock = jasmine.createSpy('next');
        _actionMock = jasmine.createSpy('action');

        _actionErrorMock = {
            error: 'action error'
        };

        _reqMock = {
            route: {
                path: ''
            },
            params: {}
        };
    });

    testCases([
        [{}, '', [], 'no params and no path defined'],
        [{}, '/action', [], 'no params defined with path'],
        [{param1: 'a'}, '', ['a'], 'params defined with no path'],
        [{param1: 'a'}, '/action', ['a'], 'params and path defined']
    ], (params, path, expectedParams, extraDescrition) => {
        it('middleware should call the action with the right params when ' + extraDescrition, () => {
            _reqMock.route.path = path;
            Object.keys(params).forEach(key => addParam(key, params[key]));

            buildMiddleware();
            invokeMiddleware();

            expect(_actionMock.calls.mostRecent().args).toEqual(expectedParams);
        });
    });

    testCases([
        [req => req.body = 'body', ['body'], 'request body'],
        [req => req.query = 'query', ['query'], 'request query'],
        [req => {req.query = 'query';req.body = 'body';}, ['body', 'query'], 'request body and query']
    ], (configReq, expectedParams, extraDescrition) => {
        it('middleware should call the action with the ' + extraDescrition, () => {
            configReq(_reqMock);

            buildMiddleware();
            invokeMiddleware();

            expect(_actionMock.calls.mostRecent().args).toEqual(expectedParams);
        });
    });

    it('middleware should put the action\'s return value on the request', () => {
        configActionResult();
        buildMiddleware();
        invokeMiddleware();

        expect(_reqMock.actionResult).toEqual(_actionResultMock);
    });

    it('middleware should put the action\'s exception on the request', () => {
        configActionError();
        buildMiddleware();
        invokeMiddleware();

        expect(_reqMock.actionError).toEqual(_actionErrorMock);
    });

    function buildMiddleware() {
        var middleware = _actionToMiddleware.toMiddleware(_actionMock);

        invokeMiddleware = () => middleware(_reqMock, _reqMock, _nextMock);
    }

    function addParam(name, value) {
        _reqMock.route.path += `/:${name}`;
        _reqMock.params[name] = value;
    }

    function configActionResult() {
        _actionMock.and.returnValue(_actionResultMock);
    }

    function configActionError() {
        _actionMock.and.throwError(_actionErrorMock);
    }
});