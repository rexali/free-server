const sum = require('./sum');

describe("", () => {
    it('Given 1 and 2, then the sum() should return or to equal 3', (done) => {
        expect(sum(1, 2)).toBe(3);
        done();

    });

    it('should return 6 if sum() is given 3 and 3',(done)=>{
        expect(sum(3,3)).toBe(6);
        done();
    });

});


