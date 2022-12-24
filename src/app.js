const express = require('express');

const app = express();

app.use(express.json());

const passwordPatternRules = {
  minSize(password, value) {
    return password.length >= value;
  },
  minUppercase(password, value) {
    const passwordUppercaseArray = password.match(/[A-Z]/g) || [];
    return passwordUppercaseArray.length >= value;
  },
  minLowercase(password, value) {
    const passwordLowercaseArray = password.match(/[a-z]/g) || [];
    return passwordLowercaseArray.length >= value; 
  },
  minDigit(password, value) {
    const passwordMinDigit = password.match(/[0-9]/g) || [];
    return passwordMinDigit.length >= value; 
  },
  minSpecialChars(password, value) {  
    const passwordSpecialChar = password.match(/[!@#$%^&*()+\-[\]{}\\/]/g) || [];
    return passwordSpecialChar.length >= value; 
  },
  noRepeted(password, value) {  
    const repetitionCount = value === 0 ? 1 : value - 1;
    const pattern = new RegExp(`(.)\\1{${repetitionCount}}`);
    const passwordRepChar = password.match(pattern);
    return passwordRepChar === null;
  },
};

const passwordTestFunc = (payload) => {
  const verificationObj = {
    verify: true,
    noMatch: [],
  };

if (Array.isArray(payload.rules)) {
payload.rules.forEach((element) => {
 const validate = passwordPatternRules[element.rule](payload.password, element.value);
  if (!validate) {
    verificationObj.verify = false;
    verificationObj.noMatch.push(element.rule);
  }
});
}
 return verificationObj;
};

  app.post('/verify', (req, res) => {
        try {
      const verifiedObj = passwordTestFunc(req.body);
      return res.status(201).json({ verifiedObj });
    } catch (error) {
      console.log(error);
      return res.status(400).json({ message: 'please insert the correct rules' });
    }
  });

app.get('/verify', (req, res) => res.status(200).json({ rules: passwordPatternRules }));

module.exports = app;