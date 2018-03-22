import {assert} from 'chai';
import {getToken} from '../src/reflect/utils';

describe('utils', function() {
    describe('#getToken', function() {
        it('should return Symbol value for class', function() {
            assert.typeOf(getToken(Date), 'symbol');
        });
        it('should return Symbol value for class instance', function() {
            assert.typeOf(getToken(new Date()), 'symbol');
        });
        it('should unique Symbol for class and its instance', function() {
            assert.equal(getToken(new Date()), getToken(Date));
        });
        it('should return passed Symbol', function() {
            let symbol = Symbol("test");
            assert.equal(getToken(symbol), symbol);
        });
        it('should return nothing from scalar value', function() {
            assert.throws(() => getToken(false), Error, 'Can\'t retrieve constructor from value "false"');
        });
    });


    describe("#getConstructor", () => {

    });

});
