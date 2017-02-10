'use strict';

global.testCases = testCases;

function testCases(params, test) {
    let activationFunc = test.length > 1 ?
        test.apply.bind(test) :
        test.call.bind(test);

    params.forEach(param => activationFunc(null, param));
}