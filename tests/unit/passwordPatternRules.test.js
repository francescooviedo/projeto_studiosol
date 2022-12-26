const chai = require('chai');
const { passwordDictionaryRules } = require('../../src/services/passwordService');

const { expect } = chai;

describe('2 - object passwordDictionaryRules', function () {
    it('minimum password size', function () {
        const resultTrue = passwordDictionaryRules.minSize('aa', 2);
        const resultFalse = passwordDictionaryRules.minSize('a', 2);

        expect(resultTrue).to.be.equal(true);
        expect(resultFalse).to.be.equal(false);
    });
    it('minimum Uppercase characters', function () {
        const resultTrue = passwordDictionaryRules.minUppercase('UU', 2);
        const resultFalse = passwordDictionaryRules.minUppercase('U', 2);

        expect(resultTrue).to.be.equal(true);
        expect(resultFalse).to.be.equal(false);
    });
    it('minimum lowercase characters', function () {
        const resultTrue = passwordDictionaryRules.minLowercase('aa', 2);
        const resultFalse = passwordDictionaryRules.minLowercase('A', 2);

        expect(resultTrue).to.be.equal(true);
        expect(resultFalse).to.be.equal(false);
    });
    it('minimum Digits', function () {
        const resultTrue = passwordDictionaryRules.minDigit('12', 2);
        const resultFalse = passwordDictionaryRules.minDigit('1', 2);

        expect(resultTrue).to.be.equal(true);
        expect(resultFalse).to.be.equal(false);
    });
    it('minimum Special characters', function () {
        const resultTrue = passwordDictionaryRules.minSpecialChars('@@', 2);
        const resultFalse = passwordDictionaryRules.minSpecialChars('@', 2);

        expect(resultTrue).to.be.equal(true);
        expect(resultFalse).to.be.equal(false);
    });
    it('minimum character repetition', function () {
        const resultTrue = passwordDictionaryRules.noRepeted('abc', 0);
        const resultFalse = passwordDictionaryRules.noRepeted('aaa', 0);

        expect(resultTrue).to.be.equal(true);
        expect(resultFalse).to.be.equal(false);
    });
});
