const chai = require('chai');
const { passwordVerifyService } = require('../../src/services/passwordService');

const { expect } = chai;

describe('3 - function passwordVerifyService ', function () {
  const passwordNorRules = { password: 'passwordTest' };
  const password = {
        password: 'TesteSenhaForte!1243&',
        rules: [
        { rule: 'minSize', value: 8 },
        { rule: 'minSpecialChars', value: 2 },
        { rule: 'noRepeted', value: 0 },
        { rule: 'minDigit', value: 4 },
        ],
        };
it('password without rules', function () {
    const result = passwordVerifyService(passwordNorRules);
    expect(result).to.eql({ verify: true, noMatch: [] });
});
it('password with rules', function () {
    const result = passwordVerifyService(password);
    expect(result).to.eql({ verify: true, noMatch: [] });
});
    });