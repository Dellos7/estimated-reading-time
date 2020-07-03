import { estimatedReadingTime } from '../../dist/esm/index.js';
import tests from '../estimatedReadingTimeTests.js';
import chai from 'chai';
const { expect } = chai;

describe( 'ESM', function(){
    describe( 'estimatedReadingTime', function(){
        for( let test of tests ){
            it( test.name, (done) =>{
                test.test( expect, estimatedReadingTime );
                done();
            });
        }
    });
});