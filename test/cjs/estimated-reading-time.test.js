const ert = require('../../dist/cjs/index.js');
const { estimatedReadingTime } = ert;
const chai = require('chai');
const { expect } = chai;
const tests = require('../estimatedReadingTimeTests');

describe('CommonJS', function(){
    describe( 'estimatedReadingTime', function(){
        for( let test of tests ){
            it( test.name, (done) =>{
                test.test( expect, estimatedReadingTime );
                done();
            });
        }
    });
});