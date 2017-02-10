fdescribe('ActionResultMiddleware', () => {
    var _actionResultMiddleware = require('../../../source/services/action-result.middleware');
    var _reqMock;
    var _resMock;
    var _nextMock;

    beforeEach(() => {
        _reqMock = {};
        _nextMock = jasmine.createSpy('next');

        _resMock = {
            json: jasmine.createSpy('json'),
            status: jasmine.createSpy('status')
        };
    });

    describe('resolve', () => {
        testCases([
            [req => req.actionResult = 'result', 'value'],
            [req => req.actionResult = Promise.resolve('result'), 'promise']
        ], (configReq, extraDescription) => {
            it('should put the action\'s result on the request when action returns a ' + extraDescription, done => {
                _nextMock.and.callFake(() => {
                    expect(_reqMock.actionResult).toEqual('result');
                    done();
                });

                configReq(_reqMock);

                callResolve();
            });
        });

        it('should put the action\'s error on the request when the action rejects', done => {
            _nextMock.and.callFake(() => {
                expect(_reqMock.actionError).toEqual('error');
                done();
            });

            _reqMock.actionResult = Promise.reject('error');

            callResolve();
        });

        testCases([
            [req => req.actionError = 'error', 'action throws an error'],
            [req => req.actionResult = 'result', 'action returns a value'],
            [req => req.actionResult = Promise.resolve(), 'action returns a resolved promise'],
            [req => req.actionResult = Promise.reject(), 'action returns a rejected promise']
        ], (configReq, extraDescription) => {
            it('should call next when ' + extraDescription, done => {
                _nextMock.and.callFake(done);

                configReq(_reqMock);

                callResolve();
            });
        })

        function callResolve() {
            _actionResultMiddleware.resolve(_reqMock, _resMock, _nextMock);
        }
    });

    describe('handle', () => {
        it('should send the result to the user', () => {
            _reqMock.actionResult = 'action result';

            callHandle();

            expect(_resMock.json).toHaveBeenCalledWith(_reqMock.actionResult);
        });

        it('should send the error to the user', () => {
            _reqMock.actionError = 'error';

            callHandle();

            expect(_resMock.json).toHaveBeenCalledWith(_reqMock.actionError);
        });

        it('should set the status to 500 if no status is provided by the error', () => {
            _reqMock.actionError = 'error';

            callHandle();

            expect(_resMock.status).toHaveBeenCalledWith(500);
        });

        it('should set the status to the error\'s status when provided', () => {
            _reqMock.actionError = {
                status: 'status'
            };

            callHandle();

            expect(_resMock.status).toHaveBeenCalledWith(_reqMock.actionError.status);
        });

        function callHandle() {
            _actionResultMiddleware.handle(_reqMock, _resMock);
        }
    });
});