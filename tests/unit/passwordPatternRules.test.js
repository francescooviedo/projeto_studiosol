const chai = require('chai');
const { passwordPatternRules } = require('../../src/services/passwordService');

const { expect } = chai;

describe('2 - object passwordPatternRules', function () {
    it('minimum password size', function () {
        const resultTrue = passwordPatternRules.minSize('aa', 2);
        const resultFalse = passwordPatternRules.minSize('a', 2);

        expect(resultTrue).to.be.equal(true);
        expect(resultFalse).to.be.equal(false);
    });
    it('minimum Uppercase characters', function () {
        const resultTrue = passwordPatternRules.minUppercase('UU', 2);
        const resultFalse = passwordPatternRules.minUppercase('U', 2);

        expect(resultTrue).to.be.equal(true);
        expect(resultFalse).to.be.equal(false);
    });
    it('minimum lowercase characters', function () {
        const resultTrue = passwordPatternRules.minLowercase('aa', 2);
        const resultFalse = passwordPatternRules.minLowercase('A', 2);

        expect(resultTrue).to.be.equal(true);
        expect(resultFalse).to.be.equal(false);
    });
    it('minimum Digits', function () {
        const resultTrue = passwordPatternRules.minDigit('12', 2);
        const resultFalse = passwordPatternRules.minDigit('1', 2);

        expect(resultTrue).to.be.equal(true);
        expect(resultFalse).to.be.equal(false);
    });
    it('minimum Special characters', function () {
        const resultTrue = passwordPatternRules.minSpecialChars('@@', 2);
        const resultFalse = passwordPatternRules.minSpecialChars('@', 2);

        expect(resultTrue).to.be.equal(true);
        expect(resultFalse).to.be.equal(false);
    });
    it('minimum character repetition', function () {
        const resultTrue = passwordPatternRules.noRepeted('abc', 0);
        const resultFalse = passwordPatternRules.noRepeted('aaa', 0);

        expect(resultTrue).to.be.equal(true);
        expect(resultFalse).to.be.equal(false);
    });
});
